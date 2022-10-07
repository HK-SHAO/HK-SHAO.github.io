import { PluginConfig } from "vuepress"
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";


export const plugins: PluginConfig = [
    pwaPlugin({
        skipWaiting: true,
    }),
    pwaPopupPlugin({
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
        imageMark: true,
        tasklist: true,
        include: true,
        mathjax: true,
        echarts: true,
        flowchart: true,
        mermaid: true,
        demo: true,
    }),
    searchPlugin({
        locales: {
            '/': {
                placeholder: '搜索',
            },
        },
    }),
]