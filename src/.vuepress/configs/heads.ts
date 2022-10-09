import { HeadConfig } from 'vuepress'

export const heads: HeadConfig[] = [
    ['link', { rel: 'icon', href: '/safari-pinned-tab.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],

    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/site.webmanifest" }],
    ['link', { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#3eaf7c" }],
    ['meta', { name: "msapplication-TileColor", content: "#3eaf7c" }],
    ['meta', { name: "theme-color", content: "#ffffff" }],
]