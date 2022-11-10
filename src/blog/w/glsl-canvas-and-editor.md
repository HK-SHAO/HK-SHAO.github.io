

# GLSL Canvas 和 Editor

::: info

测试 GLSL Canvas 和 Editor 的页面

- https://github.com/patriciogonzalezvivo/glslCanvas
- https://github.com/patriciogonzalezvivo/glslEditor

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
请点击前往：[GLSL Editor](/tool/glsl-editor.md)
:::

:::: normal-demo

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
                // canvas_draggable: true,
                multipleBuffers: true,
                watchHash: true,
                fileDrops: true,
                menu: false,
                lineWrapping: true,
            });
        
        document.querySelectorAll('.CodeMirror-gutters').forEach((item) => {
            item.style.backgroundColor = 'inherit';
            item.style.borderRight = "1px solid var(--c-border)";
        });

        document.querySelectorAll('.CodeMirror').forEach((item) => {
            item.style.backgroundColor = 'inherit';
            item.style.color = 'inherit';
            item.style.marginTop = '0';
            item.style.fontWeight = "bold";
        });

        document.querySelectorAll('.ge_editor').forEach((item) => {
            item.style.backgroundColor = 'inherit';
        });
    }

    if (typeof GlslEditor !== 'undefined') {
        createEditor();
        return;
    }

    createCSS('https://cdn.jsdelivr.net/npm/glslEditor@0.0.23/build/glslEditor.css', () => {
        createScript('https://cdn.jsdelivr.net/npm/glslEditor@0.0.23/build/glslEditor.min.js', () => {
            createEditor();
        });
    });
})();
```

::::