---
description: 烧风的 Markdown 基础教程
next: how-to-use-markdown.md
---

# 烧风的 Markdown 基础教程

> <p style="text-align: right">——是的， Markdown 是计算机使用者的基本技能之一。</p>

::: warning

如果你需要 Markdown 的基本语法教程，请直接前往：[Markdown 的基本用法](#markdown-的基本用法)

:::

::: note

记录是我们的基本能力之一。以前我们常使用笔和纸来写字，这种方式非常自由，因为本质上来说我们记录的一切内容是“画”出来的，我们可以在任意位置书写和绘图。后来我们使用计算机软件来记录和处理文字，但是操纵软件仍然需要技巧（有时需要耐心和创意）。

:::

::: info

如何使用文字软件，既能够高效的产出一份排版规范、易读性好的文档，又能够保留排版自由度？标准的 Markdown 做到了第一点，而经过扩展的 Markdown 与 HTML 结合则能做到第二点。

:::


## Markdown 的用处

在许多需要文字排版的场合，Markdown 都能够发挥作用。例如：


- 记录自己的内容、发布可打印的文档、写博客、写论文、写邮件、写书等。
- 创建幻灯片、思维导图、框图、流程图、以及其它数据可视化后的图。
- MkDocs, VuePress, Jekyll, Hexo 等生成网站的工具。
- GitHub, Gitee, Gitlab 等平台的文字书写区域。
- Discord, Mattermost, Slack 等聊天工具。
- WordPress, Typecho, Ghost 等博客系统。
- 知乎, CSDN, 简书, 掘金等写作平台。
- 简单网站排版、微信公众号排版等。
- 以及其它非常多用武之地。


## 什么是 Markdown

Markdown 是一种轻量简单的标记语言，它允许你在纯文本中通过特定的标记符号（例如 `` #-*> `` 等）来排版文字，之后通过软件转换为常见的文档格式。你所看到的本页面就是由纯 Markdown 编写的。

### 常见的文档格式

::: tip
文档格式特别多，这里只列出常见的几种
:::

- 文件扩展名（扩展名并不影响文件本身数据，只是用来标记它的文件格式）
  - `.txt` `.md` `.markdown`
  - `.pdf`
  - `.htm` `.html` `.xhtml`
  - `.tex`
  - `.doc` `.docx` `.odt`

- 文件编码格式
    - 纯文本编码（可以用文本编辑器直接编辑）
    - 二进制编码（非纯文本编码）

::: info
有些文件格式既可以是纯文本编码也可以是二进制编码，例如：`.pdf` 等
:::

::: info
一个有趣的事实是 `.docx` `.odt` 其实是一个 zip 压缩包，解压缩后得到的 `.xml` 文件可以用文本编辑器直接编辑。当然你能否读懂它的语义并且正确修改就是另外一回事了
:::

### Markdown 的格式
Markdown 文档是纯文本编码（通常是 [Unicode](https://home.unicode.org/) 编码），文件扩展名为 `.md` 或 `.markdown` 。

由于 Markdown 的格式是纯文本，因此你可以使用任何文本编辑器来编辑它。但是，如果你想要更好的编辑体验（更多提示、快捷键、所见即所得等），你可以使用专门的 Markdown 编辑器，或者使用支持 Markdown 插件的软件。

## Markdown 的优点

- 语法带来的好处：简单快捷、非常易学。
- 格式带来的好处：易于[编辑](#markdown-的格式)、 易于[版本控制和管理](#markdown-的版本控制)。
- 生态带来的好处：有很多[工具](#支持-markdown-的工具)使用、能够[转换为多种其它文档格式](#markdown-转换器)、有许多[用武之地](#markdown-的用处)。
- 标准、规范同时不失扩展性和排版自由度。

## 支持 Markdown 的工具

### Markdown 编辑器

::: tip
支持 Markdown 的编辑器特别多，这里只列出常见的几种。

- 如果你无从下手，那么请从 [VS Code 编辑器](https://code.visualstudio.com/) 或在线编辑器开始
:::

- 现代编辑器
    - [VS Code](https://code.visualstudio.com/) / [Fleet](https://www.jetbrains.com/fleet/) / [HBuilder X](https://dcloud.io/hbuilderx.html) / [Atom](https://atom.io/)
- 传统编辑器
    - [Vim](https://www.vim.org/) / [Emacs](https://www.gnu.org/software/emacs/) / [Sublime Text](https://www.sublimetext.com/) / [Notepad++](https://notepad-plus-plus.org/)
- IDE 自带编辑器
    - [IntelliJ IDEA](https://www.jetbrains.com/idea/) / [Android Studio](https://developer.android.com/studio/) / [WebStorm](https://www.jetbrains.com/webstorm/)
- 专用编辑器
    - [Mark Text](https://marktext.app/) / [Ulysses](https://ulysses.app/) / Mou / [Typora](https://typora.io/) / Markpad
- 在线编辑器
    - [Milkdown](https://milkdown.dev/online-demo) / [Notion](https://www.notion.so/)

::: tip

- 本页面底下的评论区是支持 Markdown 的在线编辑器
- 网页搜索“在线 Markdown 编辑器”试试

:::

### Markdown 转换器

[Pandoc](https://pandoc.org/) 是一个支持多种文档格式的转换器，它可以将 Markdown 转换为其它格式，也可以将其它格式转换为 Markdown。

常用 Pandoc 将 Markdown 转换为 $\TeX$, HTML, PDF, Word 等格式。

::: details Pandoc 支持的文档转换格式

![Pandoc 支持的文档转换格式](https://pandoc.org/diagram.svg)

:::

## Markdown 的版本控制

我们修改一份文档时，需要保证之前历史的文档也能够保留下来，有时需要了解每一次修改到底修改了哪些内容，这就需要版本控制。

你应该不想这样吧：

::: warning 反复创建文件副本

- 文档.docx
- 文档(1).docx
- 最新文档.docx
- 最新文档v2.docx
- 最新文档v3.docx

:::

由于 Markdown 是纯文本，因此可以使用版本控制工具来管理文档的版本。通过这种方式，你能够保留所有历史版本的文档，也能够查看每一次修改的具体内容。

常见的版本控制工具有 [Git](https://git-scm.com/) 和 SVN。推荐使用 Git 仓库托管平台 [GitHub](https://github.com/) 和 VS Code 的 Git 插件来进行版本控制。

## Markdown 的基本用法

::: info

请前往：[使用 Markdown 排版文章](how-to-use-markdown.md)

:::

@include(@src/shared/license.md{3-})