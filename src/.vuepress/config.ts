import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'HK-SHAO',
  description: '烧风的个人网站',
  head: [
    ['link', { rel: 'icon', href: '/safari-pinned-tab.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
  ],
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: 'HK-SHAO',
      description: '烧风的个人网站',
    },
  },
  theme: defaultTheme({
    logo: '/images/logo.png',
    repo: 'HK-SHAO',
    docsRepo: 'HK-SHAO/HK-SHAO.github.io',
    docsBranch: 'main',
    docsDir: 'src',
    colorModeSwitch: true,
    colorMode: 'auto',
    home: '/',
    sidebar: 'auto',
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        navbar: [
          {
            text: '主页',
            link: '/',
          },
          {
            text: '博客',
            link: '/blog',
          },
          {
            text: '链接',
            link: '/links',
          },
          {
            text: '关于',
            link: '/about',
          },
        ],
      },
    },
  }),
  plugins: [
    pwaPlugin({
      skipWaiting: true,
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索全站',
        },
        '/en/': {
          placeholder: 'Search',
        },
      },
    }),
  ],
})