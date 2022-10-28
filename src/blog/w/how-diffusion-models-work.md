# 扩散模型是如何工作的：从零开始的数学原理

::: warning

由于某些原因，本文暂未完成

:::

## 前言

基于生成对抗网络 GANs 的 AI 生成图像往年在互联网不温不热，但就在最近这几个月， Open AI 于 2022 年 4 月初发布的 DALL-E 2 (基于 GPT Model) ，以及 stability.ai 于 2022 年 8 月底发布的 Stable Diffusion (基于 Diffusion Model)  ，其生成的照片、画作的效果让人乍舌，随即引发了一股新的互联网 AI 创作热潮.  

而真正引发一系列热潮的，是 Novel AI 于 2022 年 10 月初发布的，能够画各种精致二次元美少女的 NovelAI Diffusion  (基于 Stable Diffusion) 一下子把 AI 绘画推向风口浪尖.  无数乐子人蜂拥而至，甚至有黑客把 Novel AI 的官网源码和模型全部扒了下来.  AI 创作数量极快，乍一看都很精致，而这些 “AI Based” 作品正在以一种极快的速度挤压创作者的空间，随即引发的便是关于伦理道德和法律的一系列疑问.  

但是本文暂不讨论伦理道德等方面的问题（也许之后会另发一篇文章讨论），仅仅先从技术角度和数学原理上简要介绍效果出众、“秒杀” GANs 的，改变了人们对原本 AI 绘画认知的 Diffusion Model 的数学原理.  

本文翻译自 AI Summer 的工作人员 Sergios Karagiannakos, Nikolas Adaloglou 几人发布了一篇博客 [How diffusion models work: the math from scratch | AI Summer (theaisummer.com)](https://theaisummer.com/diffusion-models/)

## 扩散模型是什么？

扩散模型 (Diffusion Model) 是一种新型的、先进的生成模型，可以生成各种高分辨率图像.  在 OpenAI, Nvidia 和 Google 成功地训练了大规模的模型后，扩散模型已经吸引了很多人的注意.  基于扩散模型的架构有 GLIDE, DALLE-2, Imagen 和 完全开源的 stable diffusion.

它们背后的原理是什么呢？

在这篇文章，我们将从基本原理开始挖掘.  目前已经有许多不同的基于扩散模型的架构，我们将重点讨论其中最突出的一个，即由 [Sohl-Dickstein](https://arxiv.org/abs/1503.03585) 等人最初提出的去噪扩散概率模型 (DDPM, denoising diffusion probabilistic model) ，然后由 [Ho.](https://arxiv.org/abs/2006.11239) 等人在 2020 年提出。其它各种方法将不会具体讨论，如 stable diffusion 和 score-based models.

::: info

扩散模型与之前所有的生成方法有着本质的区别。直观地说，它们旨在将图像生成过程（采样）分解为许多小的“去噪”步骤

:::

直观点说，模型可以在这些小的步骤中自我修正，并逐渐产生一个好的样本。在某种程度上，这种完善表征的想法已经在 [alphafold](https://youtu.be/nGVFbPKrRWQ?t=1148) 等模型中得到了应用。但是，没有什么是零成本的。这种迭代过程使得它们的采样速度很慢，至少与 [GANs](https://theaisummer.com/gan-computer-vision/) 相比是如此

## 扩散过程

扩散模型的基本思想是相当简单的。他们把输入图像 $\mathbf{x}_0$ 并通过一系列的 $T$ 步骤，逐渐向其添加高斯噪声，我们将此称为正向过程。值得注意的是，这与神经网络的前向传递无关。如果你愿意，这部分对于为我们的神经网络生成目标（应用 $t \lt T$ 噪声步骤后的图像）是必要的

之后，神经网络被训练为通过逆转噪声过程来恢复原始数据。通过能够对反向过程进行建模，我们可以生成新的数据。这就是所谓的反向扩散过程，或者一般来说，生成式模型的采样过程

具体是怎样的？让我们深入研究一下其中的数学，让它变得清晰

## 前向过程

扩散模型可以被看作是潜在变量模型。“潜在”意味着我们指的是一个隐藏的连续特征空间。以这种方式，它们可能看起来类似于 [变分自动编码器 (VAEs)](https://theaisummer.com/latent-variable-models/). 

在实践中，它们是用一个马尔科夫链的 $T$ 步骤来制定的。这里，马尔可夫链意味着每一步只取决于前一步，这是一个很自然的假设。重要的是，我们不受限制地使用特定类型的神经网络，与基于流量的模型不同。