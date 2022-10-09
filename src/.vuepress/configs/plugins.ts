import { PluginConfig } from "vuepress"
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { gitPlugin } from '@vuepress/plugin-git'
import { commentPlugin } from "vuepress-plugin-comment2";


export const plugins: PluginConfig = [
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
        componentsDir: path.resolve(__dirname, './components'),
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
        lazyLoad: true,
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
    gitPlugin({
        createdTime: true,
        updatedTime: true,
        contributors: true,
    }),
    commentPlugin({
        provider: "Giscus",
        repo: "HK-SHAO/HK-SHAO.github.io",
        repoId: "MDEwOlJlcG9zaXRvcnkxNjczMTgzNDc=",
        category: "General",
        categoryId: "DIC_kwDOCfkTS84CR31L",
    }),
]