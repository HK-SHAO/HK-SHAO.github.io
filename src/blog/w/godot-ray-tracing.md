---
prev: some-godot-tips.md
---

# 从零开始的光线追踪渲染器

::: warning

此文暂未完成，此研究也仍未完成，作者努力学习ing

:::

![](./images/ray-tracing-demo.png)

## 相关知识

光线追踪图像渲染

- 图像图像
  - 环境
  - 光线
  - 模型
  - 材质
  - 摄像机

## 演示视频

::: details

<BiliBili bvid="BV1qe411F768" :time="33"/>

:::

## 相关链接

- GitHub: https://github.com/RayTracing
- Book: [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html)
- ShaderToy: https://www.shadertoy.com/view/XlycWh
- PlotterApp Demo: https://github.com/HK-SHAO/Plotter/releases/tag/v0.0.0.2-pre-demo

## 关键代码

暂未完成

repo: https://github.com/HK-SHAO/Plotter/

### 修正坐标系

左手系

### 赋予每个像素颜色

```glsl
shader_type canvas_item;

void fragment() {
	vec2 uv = FRAGCOORD.xy * SCREEN_PIXEL_SIZE;
	COLOR = vec4(vec3(uv, 0.2), 1.0);
}
```

### 画一片蓝天

```glsl
shader_type canvas_item;

//// 光线
struct ray {
	vec3 origin, direction;
};

vec3 at(ray r, float t) {
	return r.origin + t * r.direction;
}

//// 渲染
vec3 render(ray r) {
	//// 天空的颜色
	float t = (r.direction.y + 1.0) / 2.0;
	vec3 bottom = vec3(1.0, 1.0, 1.0);
	vec3 top = vec3(0.5, 0.7, 1.0);
	return mix(top, bottom, t);
}

//// 片段着色器程序入口
void fragment() {
	vec2 uv = FRAGCOORD.xy * SCREEN_PIXEL_SIZE;
	
	vec3 lower_left_corner = vec3(-2.0, -1.0, -1.0);
	vec3 horizontal = vec3(4.0, 0.0, 0.0);
	vec3 vertical = vec3(0.0, 2.0, 0.0);
	vec3 origin = vec3(0.0, 0.0, 0.0);
	
	ray r = ray(origin, normalize(lower_left_corner + uv.x*horizontal + uv.y*vertical));
	
	COLOR = vec4(render(r), 1.0);
}
```

### 放置一个球

```glsl
shader_type canvas_item;

#define TMIN 0.001
#define TMAX 20.0
#define RAYMARCH_TIME 128
#define PRECISION 0.001

//// 光线
struct ray {
	vec3 origin, direction;
};

vec3 at(ray r, float t) {
	return r.origin + t * r.direction;
}

//// 光线击中的记录
struct hit_record {
	float t;
	vec3 p, normal;
};

//// SDF 球
float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

//// 地图
float map(vec3 p) {
	return sdSphere(p, 0.5);
}

//// 计算地图法线
vec3 calcNormal(in vec3 p)
{
    const float eps = 0.0001;
    const vec2 h = vec2(eps, 0);
    return normalize(vec3(map(p+h.xyy) - map(p-h.xyy),
                          map(p+h.yxy) - map(p-h.yxy),
                          map(p+h.yyx) - map(p-h.yyx)));
}

//// 光线步进
float raycast(ray r) {
	float t = TMIN;
	for(int i = 0; i < RAYMARCH_TIME && t < TMAX; i++) {
		float d = map(at(r, t));
		if(d < PRECISION) return t;
		t += d;
	}
	//// 没有击中物体
	return -1.0;
}

//// 天空
vec3 sky(ray r) {
	float t = (r.direction.y + 1.0) / 2.0;
	vec3 bottom = vec3(1.0, 1.0, 1.0);
	vec3 top = vec3(0.5, 0.7, 1.0);
	return mix(top, bottom, t);
}

//// 渲染
vec3 render(ray r) {
	float t = raycast(r);
	if (t < 0.0) {
		return sky(r);
	}
	vec3 p = at(r, t);
	vec3 n = calcNormal(p);
	vec3 c = (n + 1.0) / 2.0;
	return c;
}

//// 片段着色器程序入口
void fragment() {
	//// 计算 UV
	// vec2 uv = FRAGCOORD.xy * SCREEN_PIXEL_SIZE;
	vec2 uv = UV;
	
	vec3 lower_left_corner = vec3(-2.0, -1.0, 0.0);
	vec3 horizontal = vec3(4.0, 0.0, 0.0);
	vec3 vertical = vec3(0.0, 2.0, 0.0);
	vec3 origin = vec3(0.0, 0.0, -1.0);
	
	vec3 ro = origin;
	vec3 po = lower_left_corner + uv.x*horizontal + uv.y*vertical;
	vec3 rd = normalize(po - ro);
	
	ray r = ray(ro, rd);
	vec3 color = render(r);
	
	COLOR = vec4(color, 1.0);
}
```

### 加入一个地面

```glsl
shader_type canvas_item;

#define TMIN 0.001
#define TMAX 20.0
#define RAYMARCH_TIME 128
#define PRECISION 0.001
#define MAP_SIZE 10000.0

//// 光线
struct ray {
	vec3 origin, direction;
};

vec3 at(ray r, float t) {
	return r.origin + t * r.direction;
}

//// 光线击中的记录
struct record {
	float t;
	vec3 p, normal;
};

//// SDF 球
float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

//// SDF 地图
float map(vec3 p) {
	float res = MAP_SIZE;
	res = min(res, sdSphere(p - vec3(0, 0, 0), 0.5));
	res = min(res, sdSphere(p - vec3(0, -100.5, 0), 100));
	return res;
}

//// 计算地图法线
vec3 calcNormal(vec3 p)
{
    const float eps = 0.0001;
    const vec2 h = vec2(eps, 0);
    return normalize(vec3(map(p+h.xyy) - map(p-h.xyy),
                          map(p+h.yxy) - map(p-h.yxy),
                          map(p+h.yyx) - map(p-h.yyx)));
}

//// 光线步进
float raycast(ray r) {
	float t = TMIN;
	for(int i = 0; i < RAYMARCH_TIME && t < TMAX; i++) {
		float d = map(at(r, t));
		if(d < PRECISION) return t;
		t += d;
	}
	//// 没有击中物体
	return -1.0;
}

//// 天空
vec3 sky(ray r) {
	float t = (r.direction.y + 1.0) / 2.0;
	vec3 bottom = vec3(1.0, 1.0, 1.0);
	vec3 top = vec3(0.5, 0.7, 1.0);
	return mix(top, bottom, t);
}

//// 渲染
vec3 render(ray r) {
	float t = raycast(r);
	if (t < 0.0) {
		return sky(r);
	}
	vec3 p = at(r, t);
	vec3 n = calcNormal(p);
	vec3 c = (n + 1.0) / 2.0;
	return c;
}

//// 片段着色器程序入口
void fragment() {
	//// 计算 UV
	// vec2 uv = FRAGCOORD.xy * SCREEN_PIXEL_SIZE;
	vec2 uv = vec2(UV.x, 1.0 - UV.y);
	
	vec3 lower_left_corner = vec3(-2.0, -1.0, 0.0);
	vec3 horizontal = vec3(4.0, 0.0, 0.0);
	vec3 vertical = vec3(0.0, 2.0, 0.0);
	vec3 origin = vec3(0.0, 0.0, -1.0);
	
	vec3 ro = origin;
	vec3 po = lower_left_corner + uv.x*horizontal + uv.y*vertical;
	vec3 rd = normalize(po - ro);
	
	ray r = ray(ro, rd);
	vec3 color = render(r);
	
	COLOR = vec4(color, 1.0);
}
```

### 漫反射

```glsl
shader_type canvas_item;

//// 配置常量
const float TMIN = 0.001;
const float TMAX = 20.0;
const float PRECISION = 0.0001; // 必须要小于 TMIN，否则光线会自相交产生阴影痤疮
const float MAP_SIZE = 100000.0;

const uint MAX_RAYMARCH = 512U;
const uint MAX_RAYTRACE = 512U;

const float PHI = 1.61803398874989484820459;

//// 光线（射线）
struct ray {
	vec3 origin;
	vec3 direction;
	vec4 color;
};

struct material {
	vec3 albedo;
};

//// 光子击中的记录
struct record {
	float t; // 沿射线前进的距离，为负代表没有击中
	vec3 position;
	vec3 normal;
	material mat;
};

//// 摄像机
struct camera {
	////  图像平面位置
	vec3 lower_left_corner;
	vec3 horizontal;
	vec3 vertical;
	//// 视点位置
	vec3 origin;
};

struct random {
	vec2 uv;
	float seed;
	float value;
};

//// 生成归一化随机数（uv 和 seed 均必须归一化）
float noise(inout random r) {
	r.seed += 0.1;
	vec2 xy = (r.uv + 1.0) * 3333.3;
	return fract(tan(distance(xy*PHI, xy)*r.seed)*xy.x);
}

//// 光子在射线所在的位置
vec3 at(ray r, float t) {
	return r.origin + t * r.direction;
}

//// 从摄像机获取光线
ray get_ray(camera c, vec2 uv, vec4 color) {
	//// 视点位置
	vec3 ro = c.origin;
	//// 像素位置
	vec3 po = c.lower_left_corner
			+ c.horizontal * uv.x
			+ c.vertical   * uv.y;
	//// 光线方向
	vec3 rd = normalize(po - ro);
	return ray(ro, rd, color);
}

//// SDF 球体
float sphere(vec3 p, float s) {
    return length(p) - s;
}

//// SDF 地图
float map(vec3 p) {
	float res = MAP_SIZE;
	res = min(res, sphere(p - vec3(0, 0, 0), 0.5));
	res = min(res, sphere(p - vec3(0, -100.5, 0), 100));
	return res;
}

//// 计算地图法线
vec3 normal(vec3 p)
{
    const float eps = 0.0001;
    const vec2 h = vec2(eps, 0);
    return normalize(vec3(map(p+h.xyy) - map(p-h.xyy),
                          map(p+h.yxy) - map(p-h.yxy),
                          map(p+h.yyx) - map(p-h.yyx)));
}

//// 光线步进
record raycast(ray r) {
	record rec; rec.t = TMIN;
	for(uint i = 0U; i < MAX_RAYMARCH && rec.t < TMAX; i++) {
		rec.position = at(r, rec.t);
		float dis = map(rec.position);
		if(dis < PRECISION) return rec;
		rec.t += dis;
	}
	//// 没有击中物体
	rec.t = -1.0; // 设置为负值标记
	return rec;
}

//// 天空
vec4 sky(ray r) {
	float t = (r.direction.y + 1.0) / 2.0;
	vec4 bottom = vec4(1.0, 1.0, 1.0, 1.0);
	vec4 top = vec4(0.5, 0.7, 1.0, 1.0);
	return mix(top, bottom, t);
}

//// 产生随机单位向量
vec3 random_unit_vector(inout random rand) {
	float a = mix(0.0, TAU, noise(rand));
	float z = mix(-1.0, 1.0, noise(rand));
	float r = sqrt(1.0 - z*z);
	return vec3(r*cos(a), r*sin(a), z);
}

//// 光线散射
ray scatter(ray r, record rec, random rand) {
	rec.normal = normal(rec.position);
	
	r.origin = rec.position;
	r.direction = normalize(rec.normal + random_unit_vector(rand));
	
	// rec.mat.color = (rec.normal + 1.0) / 2.0;
	rec.mat.albedo = vec3(0.5);
	
	r.color *= vec4(rec.mat.albedo, 1.0);
	return r;
}

//// 光线追踪
ray raytrace(ray r, inout random rand) {
	record rec;
	
	for (uint i = 0U; i < MAX_RAYTRACE; i++) {
		record rec = raycast(r);
		if (rec.t < 0.0) {
			r.color *= sky(r);
			break;
		}
		
		r = scatter(r, rec, rand);
	}
	
	return r;
}

//// 片段着色器程序入口
void fragment() {
	//// 计算并修正 UV 坐标系
	vec2 uv = vec2(UV.x, 1.0 - UV.y);
	
	//// 初始化摄像机
	camera cam;
	cam.lower_left_corner = vec3(-2.0, -1.0, 0.0);
	cam.horizontal = vec3(4.0, 0.0, 0.0);
	cam.vertical = vec3(0.0, 2.0, 0.0);
	cam.origin = vec3(0.0, 0.0, -1.0);
	
	//// 初始化随机数发生器
	random rand;
	rand.seed = fract(TIME);
	rand.uv = uv;
	
	//// 获取光线并逆向追踪光线
	ray r = get_ray(cam, uv, vec4(1.0));
		r = raytrace(r, rand);
	
	//// 对光的颜色进行后处理得到像素颜色
	vec3 color = r.color.rgb;
	vec3 back = vec3(0.0);
	color = mix(back, color, r.color.a);
	
	//// 伽马矫正
	color = pow(color, vec3(0.5));
	// color = vec3(noise(rand));
	COLOR = vec4(color, 1.0);
}
```

::: tip
着色器中产生随机数的想法：

- 利用混沌作为随机数种子
- 使用 backbuffer 和混沌映射逐渐更新随机数
- 利用 alpha 通道和 backbuffer 产生随机数
:::

@include(@src/shared/license.md)