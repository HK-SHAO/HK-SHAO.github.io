<template>
    <ParentLayout>
        <template #page-bottom>
            <CommentService :darkmode="isDarkMode" />
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
//@ts-ignore
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";

const isDarkMode = ref(false);
let observer: MutationObserver;

onMounted(() => {
    const html = document.querySelector("html") as HTMLElement;
    isDarkMode.value = html.classList.contains("dark");
    // watch theme change
    observer = new MutationObserver(() => {
        isDarkMode.value = html.classList.contains("dark");
    });
    observer.observe(html, {
        attributeFilter: ["class"],
        attributes: true,
    });

    // function createScript(src: string, callback?: () => void) {
    //     if (document) {
    //         const oScript = document.createElement('script');
    //         oScript.type = 'text/javascript';
    //         oScript.src = src;
    //         document.body.appendChild(oScript);
    //         callback && oScript.addEventListener('load', callback);
    //     }
    // }

    // createScript('//unpkg.com/heti/umd/heti-addon.min.js', () => {
    //     // @ts-ignore
    //     new Heti('.heti').autoSpacing();
    // });

});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>