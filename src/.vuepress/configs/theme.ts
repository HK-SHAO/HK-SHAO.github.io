import { Theme } from "vuepress";
import { defaultTheme } from 'vuepress';
import { navbar } from './navbar';
import { locales } from './locales';

export const theme: Theme = defaultTheme({
    logo: '/images/logo.png',
    repo: 'HK-SHAO',
    docsRepo: 'HK-SHAO/HK-SHAO.github.io',
    docsBranch: 'main',
    docsDir: 'src',
    colorModeSwitch: true,
    colorMode: 'auto',
    home: '/',
    sidebar: 'auto',
    locales: locales,
    navbar: navbar,
    sidebarDepth: 3,
    themePlugins: {
        activeHeaderLinks: false,
    }
})