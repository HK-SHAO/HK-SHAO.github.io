import { HeadConfig } from 'vuepress';

export const heads: HeadConfig[] = [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/manifest.webmanifest" }],
    ['link', { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#ffffff" }],
    ['meta', { name: "msapplication-TileColor", content: "#ffffff" }],
    ['meta', { name: "theme-color", content: "#ffffff" }],
    ['meta', { name: "keywords", content: "烧风, shaofun, hk-shao, hk_shao, HK-SHAO" }],
    ['meta', { name: "description", content: "烧风(HK-SHAO, shaofun)的个人网站/主页，分享一些技术文档/文章和我的作品" }],
    // ['link', { rel: "stylesheet", href: "//unpkg.com/heti/umd/heti.min.css" }],
    // https://github.com/sivan/heti
    // 弃用之
]