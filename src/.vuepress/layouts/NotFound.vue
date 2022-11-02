<template>
    <ParentLayout>
        <template #page-content-top>

            <div>
                <div style="text-align: center;">
                    <h1 id="这个页面不存在哦" tabindex="-1">
                        <a class="header-anchor" href="#这个页面不存在哦" aria-hidden="true">#</a>
                        这个页面不存在哦
                    </h1>
                    <hr>
                    <p>你访问的链接 <code>{{ pathname }}</code> 已经丢失，或本来就不存在，试试下面的链接吧</p>
                    <details class="custom-container details">
                        <summary style="text-align: left;">查看相关链接</summary>
                        <div class="url-table-container">
                            <SFLoading></SFLoading>
                        </div>
                    </details>
                    <p>如果需要，可以在这里留言你想获取的内容 😄</p>
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
//@ts-ignore
import SFLoading from "../components/SFLoading.vue";

import { SITE_URL } from "../constant";

const pathname = ref('');
const isDarkMode = ref(false);
let observer: MutationObserver;

onMounted(() => {

    window.setTimeout(async () => {

        //  hack document title

        ((title: string) => {
            setInterval(() => {
                if (document.title !== title) {
                    document.title = title;
                }
            });
        })("页面不存在 | HK-SHAO");

        pathname.value = decodeURIComponent(window.location.pathname).slice(1);

        const links = await GetSortedPageLinks();

        // 将链接转换为表格

        const table_container = document.querySelector('.url-table-container');

        if (table_container) {
            let html = `<table>`;
            html += `<thead><tr><th>距离</th><th>链接</th><th>上次修改时间</th></thead>`;
            html += `<tbody>`;
            for (let i = 0; i < links.length; i++) {
                const link = links[i];

                let link_name = link.url.replace(SITE_URL, '');
                if (link_name.length !== 0) {
                    html += `
                        <tr>
                            <td>
                                ${link.distance}
                            </td>
                            <td style="text-align: left;">
                                <a href="${link.url}" id="${'link-a-' + i}">${link_name}</a>
                            </td>
                            <td style="text-align: left;">
                                <code> ${link.lastmod}</code>
                            </td>
                        </tr>`;
                }

                // 找到链接标题，一直等待直到填充
                (async () => {
                    let title = await GetLinkTitle(link.url);
                    const observeFunction = () => {
                        if (!title) return;
                        const a = document.querySelector('#link-a-' + i);
                        if (a) {
                            a.innerHTML = title.replace(" | HK-SHAO", '');;
                            title = null;
                        }
                        clearInterval(interval)
                    }
                    const interval = setInterval(observeFunction);
                })();

            }
            html += `</tbody>`;
            html += `</table>`;

            table_container.innerHTML = html;
        }

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

async function GetLinkTitle(url: string) {
    try {
        const text = await (await fetch(url)).text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const title = doc.querySelector("title")?.textContent;
        return title;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}

async function GetSortedPageLinks() {
    const path = pathname.value;

    const sitemap = await FetchSiteMap();
    if (sitemap) {
        const urls = sitemap.querySelectorAll('url');

        const data = Array.from(urls).map((u) => {
            const url = u.querySelector('loc')?.textContent || '';
            const lastmod = u.querySelector('lastmod')?.textContent || '';
            const distance = LevenshteinDistance(path, url);
            return { url, distance, lastmod };
        });

        data.sort((a, b) => a.distance - b.distance);

        return data;
    }
    return [];
}

function LevenshteinDistance(a: string, b: string): number {
    const matrix: [number][] = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}

async function FetchSiteMap() {
    try {
        const text: string = await (await fetch("//shao.fun/sitemap.xml")).text();
        const document: Document = (new window.DOMParser()).parseFromString(text, "text/xml");
        return document;
    } catch (e) {
        console.error(e);
        return null;
    }
}

</script>

<style scoped>
.url-table-container {
    overflow: auto;
}
</style>