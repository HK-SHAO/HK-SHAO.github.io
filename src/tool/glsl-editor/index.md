---
editLink: false
sidebar: false
lastUpdated: false
contributors: false
description: GLSL 编辑器
comment: false
prev: /blog/w/glsl-canvas-and-editor.md
---

# GLSL 编辑器

::: info

[GLSL Canvas and Editor](/blog/w/glsl-canvas-and-editor.md)

:::

::: warning

由于本页面需要，请使用更宽的屏幕（横向像素大于 719 ）查看本页面哦

:::

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

let elementList: HTMLElement[] = [];

function createScript(src: string, callback?: () => void) {
    if (document) {
        const oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = src;
        document.body.appendChild(oScript);
        callback && oScript.addEventListener('load', callback);
        elementList.push(oScript);
    }
}

function createCSS(href: string, callback?: () => void) {
    if (document) {
        const oLink = document.createElement('link');
        oLink.type = 'text/css';
        oLink.rel = "stylesheet";
        oLink.href = href;
        document.body.appendChild(oLink);
        callback && oLink.addEventListener('load', callback);
        elementList.push(oLink);
    }
}

function createStyle(css) {
    if (window.document) {
        const o = window.document.createElement('style');
        o.innerHTML = css;
        document.body.appendChild(o);
        elementList.push(o);
    }
}

onMounted(() => {
    const min_page_size = Math.min(window.innerWidth, window.innerHeight);
    if (min_page_size < 719) {
        return;
    }

    function createEditor() {
        const glslEditor = new GlslEditor('.page', {
            canvas_width: min_page_size * 2 / 3,
            canvas_height: min_page_size * (2 / 3)**2,
            canvas_draggable: false,
            canvas_follow: true,
            multipleBuffers: false,
            watchHash: true,
            fileDrops: true,
            menu: false,
            lineWrapping: true,
        });
    }

    document.querySelector(".page")!.innerHTML = '';

    createStyle(`
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
    `);

    createCSS('https://cdn.jsdelivr.net/npm/glslEditor@0.0.23/build/glslEditor.css', () => {
        if (typeof GlslEditor !== 'undefined') {
            createEditor();
            return;
        }
        createScript('https://cdn.jsdelivr.net/npm/glslEditor@0.0.23/build/glslEditor.min.js', () => {
            createEditor();
        });
    });
});

onBeforeUnmount(() => {
    elementList.forEach((item) => {
        document.body.removeChild(item);
    });

    document.querySelector(".page")!.innerHTML = '';
});

</script>