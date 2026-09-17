export const site = {
  name: "烧风",
  alias: "HK-SHAO",
  title: "烧风 · HK-SHAO",
  description: "烧风的个人网站：AI Agent、软件、游戏与图形实验",
  url: "https://shao.fun",
  author: "HK-SHAO",
  language: "zh-CN",
  analytics: "G-BV3YSXZYJX",
  icp: "20222718",
  themeColor: {
    light: "#fff8ea",
    dark: "#171512",
  },
  profiles: {
    github: "https://github.com/HK-SHAO",
    bilibili: "https://space.bilibili.com/24046148",
  },
} as const;

export const navigation = [
  { href: "/", label: "首页" },
  { href: "/works/", label: "作品" },
  { href: "/blog/", label: "文章" },
  { href: "/links/", label: "友链" },
  { href: "/about/", label: "关于" },
] as const;

export const comments = {
  repo: "HK-SHAO/HK-SHAO.github.io",
  repoId: "MDEwOlJlcG9zaXRvcnkxNjczMTgzNDc=",
  category: "General",
  categoryId: "DIC_kwDOCfkTS84CR31L",
} as const;
