import { PluginConfig } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search';
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { path } from '@vuepress/utils';
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { commentPlugin } from "vuepress-plugin-comment2";
import { componentsPlugin } from "vuepress-plugin-components";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { seoPlugin } from "vuepress-plugin-seo2";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import copyCode from "vuepress-plugin-copy-code2";

export const plugins: PluginConfig = [
    googleAnalyticsPlugin({
        id: 'G-BV3YSXZYJX'
    }),
    componentsPlugin({
        components: [
            "BiliBili",
            "FontIcon",
            "PDF",
            "StackBlitz",
            "VideoPlayer",
            "YouTube",
        ],
        iconAssets: "iconfont",
    }),
    sitemapPlugin({
        hostname: 'https://shao.fun/',
        changefreq: 'always',
    }),
    seoPlugin({
        hostname: 'https://shao.fun/',
        author: {
            name: 'HK-SHAO',
            url: 'https://shao.fun/',
        },
        twitterID: 'HKSHAO',
    }),
    pwaPlugin({
        skipWaiting: true,
    }),
    pwaPopupPlugin({
        locales: {
            '/': {
                message: '发现新内容可用',
                buttonText: '刷新',
            },
        },
    }),
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../components'),
    }),
    mdEnhancePlugin({
        gfm: true,
        linkCheck: 'dev',
        container: true,
        tabs: true,
        vpre: true,
        codetabs: true,
        align: true,
        attrs: true,
        sup: true,
        sub: true,
        footnote: true,
        mark: true,
        imageSize: true,
        imageMark: true,
        tasklist: true,
        include: true,
        mathjax: true,
        echarts: true,
        flowchart: true,
        mermaid: true,
        demo: true,
        presentation: {
            plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
    }),
    searchPlugin({
        locales: {
            '/': {
                placeholder: '搜索',
            },
        },
    }),
    commentPlugin({
        provider: "Giscus",
        repo: "HK-SHAO/HK-SHAO.github.io",
        repoId: "MDEwOlJlcG9zaXRvcnkxNjczMTgzNDc=",
        category: "General",
        categoryId: "DIC_kwDOCfkTS84CR31L",
    }),
    copyCode({}),
]