

# GLSL Canvas 和 Editor

::: warning

测试 GLSL Canvas 和 Editor 的页面

:::


::: center

<canvas class="glslCanvas" width="500" height="500">
</canvas>

:::

<script setup lang="ts">
import { onMounted, ref } from "vue";
import GlslCanvas from "glslCanvas";

onMounted(() => {
    let canvas = document.querySelector(".glslCanvas");
    let sandbox = new GlslCanvas(canvas);

    // Load only the Fragment Shader
    let string_frag_code = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));
    
    vec2 m = u_mouse/u_resolution.xy;
    m.x *= u_resolution.x/u_resolution.y;
    m.x /= 2.;
    m.y /= 2.;
    m.y += 0.5;
    
    vec4 c = vec4(color, 1.0);
    vec4 b = vec4(0.0);
    gl_FragColor = mix(b, c, smoothstep(0.01, 0.014, length(m - st) - 0.2));
}
`;
    sandbox.load(string_frag_code);
});

</script>