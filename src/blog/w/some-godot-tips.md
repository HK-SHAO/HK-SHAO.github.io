# 一些 Godot 引擎的小技巧

::: warning

本页面仅用于我的个人记录，内容比较杂乱

:::

## 在 fragment shader 里使用摄像机

- 将 Godot 中的摄像机与 shader 中的摄像机关联起来

### 相关知识

- https://www.shadertoy.com/ 中有许多非常棒的 shader ，它们所呈现的各种视觉效果很让人兴奋。同时，这也是一个 shader 宝藏，很多 shader 可以被移植到一些图形程序中，例如游戏、播放器、图像处理软件等

- 通常不同的平台和游戏引擎用着不同的 shader 语言，但都大同小异。它们语法很相似，类似 C 语言，只是在结构、各别语法或 GPU API 不同而已

- 如何将 shadertoy 中非常惊艳的，基于 SDF、Ray marching 的 fragment shader 移植到 Godot 中呢？

### 相关链接

- iq 佬：https://www.iquilezles.org/www/articles/normalsSDF/normalsSDF.htm
- 推荐 pdcxs 佬的 shader 教程：https://space.bilibili.com/10707223
- shadertoy 教程 08 - 3D 摄像机设置：https://www.bilibili.com/video/BV1PS4y1j7Xg/
- 将 GLSL 转换为 Godot 着色器：[将 GLSL 转换为 Godot 着色器](https://docs.godotengine.org/zh_CN/stable/tutorials/shaders/converting_glsl_to_godot_shaders.html)

### 关键代码

repo: https://github.com/HK-SHAO/Plotter

- 传递摄像机的 transform 到 shader 的 uniform

```gdscript
extends Node

@export var camera: Camera3D

var material: ShaderMaterial


func _ready() -> void:
	material = get_parent().material


func _process(delta: float) -> void:

	var camera_position := camera.transform.origin
	var camera_rotation := camera.transform.basis

	material.set_shader_parameter(
		"camera_position", camera_position)

	material.set_shader_parameter(
		"camera_rotation", camera_rotation)
```

- 修复 fragment shader 中的 UV
- `uniform float ratio` 是此画布的长宽比

```glsl
uniform float ratio = 1.0;
uniform vec3 camera_position;
uniform mat3 camera_rotation;

vec2 fixedUV(vec2 uv, float r) {
	vec2 p = 2.0*vec2(1. - uv.x, uv.y) - 1.0;
	if (r > 1.0){
		p = vec2(p.x, p.y*r);
	} else {
		p = vec2(p.x/r, p.y);
	}
	return p;
}

void vertex() {
	UV = fixedUV(UV, ratio);
}
```

- 设置 `ro`、`ca`、`rd`

```glsl
vec3 ro = camera_position;
mat3 ca = camera_rotation;
vec3 rd = ca * normalize(-vec3(UV, 1.0));
```


## 修复 shader 中的 UV

- 使得坐标从屏幕中心开始，且 `UV.x` 从左到右介于 $[-1, 1]$ 之间，`UV.y` 从下到上介于 $[-1, 1]$ 之间
- 保证视觉上的长宽比，使得图形不被压缩或拉伸

### 相关知识

在 shadertoy 中，fragment shader 通常开头会先计算 UV

```glsl
vec2 uv = (2. * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
```

### 相关链接

- [UV 坐标](https://zh.wikipedia.org/wiki/UV%E5%9D%90%E6%A0%87)

### 关键代码

repo: https://github.com/HK-SHAO/Plotter

- 使用工具脚本同步 shader 中画布的长宽比 `ratio`

```gdscript
@tool

extends Node

var material: ShaderMaterial
var control: Control


func _ready() -> void:
	control = get_parent() as Control
	material = control.material
	control.resized.connect(on_size_changed)
	action()


func action() -> void:
	var ratio := control.size.y / control.size.x
	material.set_shader_parameter("ratio", ratio)


func on_size_changed() -> void:
	action()
```

- 如果是全屏，也可这样计算 `ratio`

```glsl
float ratio = SCREEN_PIXEL_SIZE.x / SCREEN_PIXEL_SIZE.y;
```

- 修复 UV
- `uv` 即 `UV` ， `r` 即 `ratio`

```glsl
uniform float ratio = 1.0;

vec2 fixedUV(vec2 uv, float r) {
	vec2 p = 2.0*vec2(uv.x, 1.0 - uv.y) - 1.0;
	p = r>1.0?vec2(p.x, p.y*r):vec2(p.x/r, p.y);
	return p;
}
```

### 基于动力学模型的画笔去抖动

::: warning
仍未完成
:::

在物理世界，由人类手部肌肉控制的画笔笔尖做的是连续运动，然而数位板、鼠标等电子设备所采集的信号是离散的，不同的回报率、采样率以及干扰因素会使得计算机得到的一系列点出现抖动，如何去除这种抖动，以及补充原本的连续性，甚至进一步平滑化线条，是一个值得研究的问题。

- 追逐模型

```gdscript
class_name DrawBoard

extends Control

@export var line: Line2D

@export_range(0, 2) var smooth: float = 0.2
@export_range(0, 100000) var sensitivity: float = 5000

@onready var lines: Node2D = $Lines


var cur_line_2d: Line2D = null
var is_left_pressed = false

var brush_position: Vector2
var ink_position: Vector2
var point_position: Vector2

func _ready() -> void:
	pass

func _input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		_input_event_mouse_motion(event)
	elif event is InputEventMouseButton:
		_input_event_mouse_button(event)
	elif event is InputEventKey:
		_input_event_key(event)

func _input_event_mouse_motion(event: InputEventMouseMotion) -> void:
	if is_left_pressed:
		brush_position = event.position

func _input_event_mouse_button(event: InputEventMouseButton) -> void:
	var is_pressed := event.is_pressed()
	if event.button_index == MOUSE_BUTTON_LEFT:
		is_left_pressed = is_pressed

		if not is_left_pressed:
			# 释放掉当前线条的引用
			cur_line_2d = null
		else:
			brush_position = event.position
			ink_position = event.position
			point_position = event.position

func _input_event_key(event: InputEventKey) -> void:
	match event.keycode:
		KEY_SPACE:
			# 清空所有线条
			for line in lines.get_children():
				line.queue_free()

func add_line2d() -> Line2D:
	var line2d := line.duplicate()		\
			if is_instance_valid(line)	\
			else Line2D.new()

	lines.add_child(line2d)
	return line2d

func add_point(point: Vector2) -> void:
	if is_instance_valid(cur_line_2d):
		cur_line_2d.add_point(point)
	else:
		cur_line_2d = add_line2d()

func update_ink(delta: float) -> void:
	var d := brush_position.distance_squared_to(ink_position)
	var s := smooth * sensitivity / (sensitivity + d)

	# ink_position = brush_position
	var delta_position := brush_position - ink_position
	# delta = exp(s * log(delta))
	delta = delta / ( (1 - delta) * s + delta )
	delta = clamp(delta, 0.01, 1)

	ink_position += delta_position * delta

func update_point() -> void:
	var d := ink_position.distance_squared_to(point_position)

	point_position = ink_position
	if d > 0: add_point(point_position)

func _process(delta: float) -> void:
	if is_left_pressed:
		update_ink(delta)
		update_point()
```