<template>
    <ParentLayout>
        <template #page-content-top>

            <div>
                <div style="text-align:center;">
                    <h1 id="这个页面不存在哦" tabindex="-1">
                        <a class="header-anchor" href="#这个页面不存在哦" aria-hidden="true">#</a>
                        这个页面不存在哦
                    </h1>
                    <hr>
                    <p>你访问的链接 <code>{{ pathname }}</code> 已经丢失，或本来就不存在</p>
                    <p>可以在这里留言你想获取的内容 😄</p>
                </div>
            </div>

            <CommentService :darkmode="isDarkMode" />
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
//@ts-ignore
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";

const pathname = ref('');
const isDarkMode = ref(false);
let observer;

onMounted(() => {

    window.setTimeout(() => {
        pathname.value = decodeURIComponent(window.location.pathname).slice(1);
        document.title = "页面不存在 | HK-SHAO";
    });

    // if (window.location.pathname !== "/404.html") {
    //     window.location.pathname = "/404.html";
    // }

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

    const foo = function () {
        const sidebar = document.querySelector(".theme-container") as HTMLElement;
        sidebar.classList.add('no-sidebar');
        return foo;
    }

    window.addEventListener('resize', foo());

    let content = document.querySelector(".theme-default-content") as HTMLElement;
    content.removeChild(content.children[content.children.length - 1]);

});

onBeforeUnmount(() => {
    observer.disconnect();
});

</script>

<style scoped>
.theme-default-content {
    display: none;
}
</style>