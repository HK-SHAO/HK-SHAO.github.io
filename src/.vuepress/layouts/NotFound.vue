<template>
    <ParentLayout>
        <template #page-bottom>

            <h1 style="text-align: center;">这个页面不存在哦</h1>
            <p style="text-align: center;">在这里留言告诉我你想获取什么内容 :)</p>
            <CommentService :darkmode="isDarkMode" />
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
//@ts-ignore
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";

const isDarkMode = ref(false);
let observer;

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
});

onBeforeUnmount(() => {
    observer.disconnect();
});

setTimeout(() => {
    const foo = function () {
        const sidebar = document.querySelector(".theme-container") as HTMLElement;
        sidebar.classList.add('no-sidebar');
        return foo;
    }

    window.addEventListener('resize', foo());
}, 0);

document.title = "页面不存在 | HK-SHAO";

</script>

<style>
.theme-default-content {
    display: none;
}
</style>