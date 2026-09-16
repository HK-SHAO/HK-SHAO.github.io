# sf-blog

烧风的个人博客与作品站。

## 开发

```bash
bun install
bun dev
```

## 检查与构建

```bash
bun test
bun run check
bun run build
bun run preview
```

Astro 将站点构建到 `dist/`。Cloudflare Pages 使用 `bun run build` 作为构建命令，输出目录填写 `dist`。

## 内容

复制 `src/content/entries/_template.mdx` 开始写作。文章、作品与独立内容页共用一个 MDX 内容集合：普通条目是文章，带 `Work` 标签的条目进入作品路由，带 `Page` 标签的条目由独立页面加载。

```yaml
---
title: 标题
description: 摘要
publishedAt: 2026-09-14
updatedAt: 2026-09-14
tags:
  - Web
visibility: public
---
```

`visibility: public` 出现在列表、RSS 与 sitemap；`unlisted` 可直链、不列出；`excluded` 不编译。frontmatter 还支持 `website`、`source` 与逐篇 `license` 覆盖。日期手写。作品列表按 `updatedAt`（没有则用 `publishedAt`）排序。

## 结构

```text
src/
  components/       通用界面
  content/entries/  文章、作品与独立内容页
  data/             个人资料与经历
  layouts/          页面与文章布局
  pages/            文件路由
  styles/           设计令牌、全局样式与正文排版
  content.config.ts 内容 schema
  site.config.ts    站点元数据与导航
```

## 版权

除非另有说明，原创文章与图片采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans)，示例代码与网站源代码采用 [MIT License](./LICENSE)。第三方内容与素材遵循其各自声明。
