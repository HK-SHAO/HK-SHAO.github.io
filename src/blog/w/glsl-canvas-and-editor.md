

# GLSL Canvas 和 Editor

::: info

这是测试 GLSL Canvas 和 Editor 的页面，使用了以下开源仓库中的代码

- https://github.com/patriciogonzalezvivo/glslCanvas
- https://github.com/patriciogonzalezvivo/glslEditor

:::

::: tip
- GLSL 是 OpenGL Shading Language 的缩写，一种用于编写 GPU 着色器的语言
- GLSL Canvas 和 Editor 是一个用于在浏览器中显示和编写 GLSL 的工具
- 这里的 GLSL fragment shader 会被迅速编译为在 GPU 中执行的机器码
:::

## GLSL Canvas

:::: normal-demo

```html
<canvas id="glslCanvas"></canvas>
```

```js
function createScript(src, callback) {
    if (window.document) {
        const oScript = window.document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = src;
        document.appendChild(oScript);
        callback && oScript.addEventListener('load', callback);
    }
}

function createCanvas() {
    let canvas = document.querySelector("#glslCanvas");
    let sandbox = new GlslCanvas(canvas);

    // Load only the Fragment Shader
    let string_frag_code = `
        #ifdef GL_ES
        precision highp float;
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


        vec4 c = vec4(color, 1.0);
        vec4 b = vec4(0.0);
        gl_FragColor = mix(b, c, smoothstep(0.01, 0.014, length(m - st) - 0.2));
        }
    `;
    sandbox.load(string_frag_code);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
}

(function() {
    if (typeof GlslCanvas !== 'undefined') {
        createCanvas();
        return;
    }
    createScript('//cdn.jsdelivr.net/npm/glslCanvas@0.2.5/dist/GlslCanvas.min.js', createCanvas);
})();
```

::::


## GLSL Editor

::: info
请点击前往：[GLSL Editor](/tool/glsl-editor)
:::

::: warning

由于并未对窄屏做适配，所以一些宽度不够的设备显示效果不佳

:::

:::: normal-demo {id=abcd}

```css
.ge_editor {
    background-color: inherit !important;
}
.CodeMirror-gutters {
    background-color: inherit !important;
    border-right: 1px solid var(--c-border) !important;
}
.CodeMirror {
    background-color: inherit !important;
    color: inherit !important;
    margin-top: 0 !important;
    font-weight: bold !important;
    z-index: inherit !important;
}
.ge_canvas_container {
    position: absolute !important;
    z-index: 1 !important;
}
.CodeMirror-cursor {
    border-left: 2px solid #3aa675 !important;
}
```

```html
<div id="glslEditor"></div>
```

```js
function createScript(src, callback) {
    if (window.document) {
        const oScript = window.document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = src;
        document.appendChild(oScript);
        callback && oScript.addEventListener('load', callback);
    }
}

function createCSS(href, callback) {
    if (window.document) {
        const oLink = window.document.createElement('link');
        oLink.type = 'text/css';
        oLink.rel = "stylesheet";
        oLink.href = href;
        document.appendChild(oLink);
        callback && oLink.addEventListener('load', callback);
    }
}

(function() {
    function createEditor() {
        const glslEditor = new GlslEditor(
            document.querySelector("#glslEditor"), {
                // canvas_width: 200,
                // canvas_height: 200,
                canvas_draggable: false,
                canvas_follow: true,
                multipleBuffers: false,
                watchHash: true,
                fileDrops: true,
                menu: false,
                lineWrapping: false,
                autofocus: false,
            });

        document.host.style.padding = 'inherit';
        document.host.style.overflow = 'hidden';
    }

    createCSS('/thirdparty/glsl-editor/glslEditor.css', () => {
        if (typeof GlslEditor !== 'undefined') {
            createEditor();
            return;
        }
        createScript('/thirdparty/glsl-editor/glslEditor.min.js', () => {
            createEditor();
        });
    });
})();
```

::::