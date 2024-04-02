---
description: 一些文章
comment: false
---

# 一些博文

:::: tip 技术报告
### [引导大语言模型生成计算机可解析内容](p/cllmfgcpc)

大语言模型 (LLMs, Large Language Models) 能够从大量语料的上下文中学习到模式，其包括词语之间的关系、句子的结构甚至更复杂的语义和语用信息。然而，让预训练语言模型生成结构化、严格遵循约定的内容仍然是一项挑战。

本文提出了一种引导大模型生成计算机高可用内容的方案，无需微调和额外的神经网络推理，通过提前约定的上下文无关文法 (CFG, Context-Free Grammar) 构建一个采用协程的约束装置，在自回归模型Transformer的解码阶段引导模型采样正确的词元，以构成符合程序约定的形式语言。这将保证计算机程序每次都能把语言模型生成内容解析为期望的数据结构、类型或指令，以便开发人员更容易地将大语言模型纳入具体应用程序。

本文作者在多个任务数据集上进行了实验，包括JSON、Mermaid框图和函数调用表达式生成等任务，结果表明本文的方法能够有效地提高LLMs生成内容对计算机程序的可用性。

- 中科院科技论文预发布链接：https://chinaxiv.org/abs/202403.00340

::::

:::: tip 技术教程
### [向 New Bing 提问](w/ask-new-bing.md)

微软推出了 ChatGPT 的新版本，问它问题确实很方便获取信息

::::

:::: tip 技术演示
### [149 行代码的康奈尔盒子](w/149-cornell-box.md)

康奈尔盒子是图形学中常用来观察和测试全局光照的场景

::::

:::: tip 技术教程
### [路径追踪PBR渲染原理概述](https://zhuanlan.zhihu.com/p/595867546)

一个基于物理渲染的符号距离场路径追踪渲染程序的总结

::::

:::: tip 技术教程
### [Taichi: 从零开始的光线追踪渲染](w/taichi-ray-tracing.md)

用 Taichi ，从零开始实现一个基于物理渲染的光线追踪渲染器 (WIP)

::::

:::: tip 项目简介
### [Taichi Lang Cheatsheet SVG](p/taichi-lang-cheatsheet-svg.md)

这是一个 SVG 格式（矢量图）的 Taichi Language Cheatsheet

::::

:::: tip 随便写写
### [WebGL 画布和编辑器](w/glsl-canvas-and-editor.md)

一个使用 GLSL Canvas 和 Editor 的案例，其中包含一个 GLSL Editor 工具页面

::::

:::: tip 随便写写
### [一些 Godot 引擎的小技巧](w/some-godot-tips.md)

一些我使用 Godot 引擎的个人记录，可能包含了一些有用的方法和代码

::: info 子内容

#### [四维空间里的超立方体](w/godot-cube-4d.md)

用片段着色器绘制一个超立方体，并且将其摄像机与 Godot 中的摄像机关联

:::

::: info 子内容

#### [基于动力学模型的画笔去抖动](w/godot-smooth-brush.md)

去除画笔的抖动，补足原本的连续性，以及进一步平滑化线条

:::

::::

::: tip 随便写写
### [扩散模型是如何工作的](w/how-diffusion-models-work.md)

Novel AI 于 2022 年 10 月初发布的，能够画各种精致二次元美少女的 NovelAI Diffusion 一下子把 AI 绘画推向风口浪尖。本文从技术角度和数学原理上简要介绍 Diffusion Model 的数学原理

:::

::::: tip 技术文档
### [烧风的 Markdown 进阶教程](p/advanced-use-of-markdown.md)

借助前端框架、 HTML 和 Markdown 拓展用法可以实现更多样化的图文排版。本文介绍 Markdown 的非标准拓展用法，适合进阶学习使用 Markdown

::: info 子内容
#### [使用 Echarts 可视化框架](p/use-echarts-in-markdown.md)

Echats 是一个开源的 Web 可视化框架，借助它你可以可视化流程、关系和数据
:::

::: info 子内容
#### [使用 Mermaid 框图可视化](p/use-mermaid-in-markdwon.md)

通过 Mermaid ，你可以在 Markdown 中用文本和代码创建框图和其它可视化效果
:::

:::::

:::: tip 技术文档
### [烧风的 Markdown 基础教程](p/basic-tutorial-for-markdown.md)

Markdown 是简洁高效的标记语言，被互联网广泛使用，用少许符号就可以轻松排版文章

::: info 子内容
### [使用 Markdown 排版文章](p/how-to-use-markdown.md)

本文简单介绍它的基础使用方法，适合新手了解和入门使用 Markdown
:::


::::

@include(@src/shared/license.md{3-})