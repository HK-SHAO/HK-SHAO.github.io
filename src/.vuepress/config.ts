import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'HK-SHAO',
    description: '烧风的个人网站',
    head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN',
            title: 'HK-SHAO',
            description: '烧风的个人网站',
        },
        '/en/': {
            lang: 'en-US',
            title: "HK-SHAO",
            description: "shaofun's personal website",
        },
    },
})