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
import { onBeforeUnmount, onMounted } from "vue";

let scriptList: HTMLScriptElement[] = [];
let cssList: HTMLLinkElement[] = [];

function createScript(src: string, callback?: () => void) {
    if (document) {
        const oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = src;
        document.body.appendChild(oScript);
        callback && oScript.addEventListener('load', callback);
        scriptList.push(oScript);
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
        cssList.push(oLink);
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
                // canvas_draggable: true,
                canvas_follow: true,
                canvas_draggable: true,
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
                item.style.zIndex = "inherit";
            });

            document.querySelectorAll('.ge_editor').forEach((item) => {
                item.style.backgroundColor = 'inherit';
            });

            document.querySelectorAll('.ge_canvas_container').forEach((item) => {
                item.style.position = 'absolute';
                item.style.zIndex = '1';
            });
    }
    document.querySelector(".page")!.innerHTML = '';

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
    scriptList.forEach((item) => {
        document.body.removeChild(item);
    });
    cssList.forEach((item) => {
        document.body.removeChild(item);
    });

    document.querySelector(".page")!.innerHTML = '';
});

</script>