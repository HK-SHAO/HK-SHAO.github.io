---
editLink: false
sidebar: false
lastUpdated: false
contributors: false
description: GLSL 编辑器
comment: false
---

# GLSL 编辑器


::: warning

由于本页面需要，请使用更宽的屏幕查看本页面哦

:::

<script setup lang="ts">
import { onMounted } from "vue";

function createScript(src: string, callback?: () => void) {
    if (document) {
        const oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = src;
        document.body.appendChild(oScript);
        callback && oScript.addEventListener('load', callback);
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
                canvas_draggable: true,
                multipleBuffers: true,
                watchHash: true,
                fileDrops: true,
                menu: false,
                lineWrapping: true,
            });

            document.querySelector("header")!.style.zIndex = 600;
            document.querySelector(".ge_canvas_container")!.style.zIndex = 400;

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

            document.querySelectorAll('.sidebar').forEach((item) => {
                item.style.zIndex = '500';
            });
    }
    document.querySelector(".page")!.innerHTML = '';
    if (typeof GlslEditor !== 'undefined') {
        createEditor();
        return;
    }

    createCSS('https://cdn.jsdelivr.net/npm/glslEditor@0.0.23/build/glslEditor.css', () => {
        createScript('https://cdn.jsdelivr.net/npm/glslEditor@0.0.23/build/glslEditor.min.js', () => {
            createEditor();
        });
    });
});

</script>