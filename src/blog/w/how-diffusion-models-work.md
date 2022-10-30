# 扩散模型是如何工作的：从零开始的数学原理

::: info

本文翻译自 AI Summer 的工作人员 Sergios Karagiannakos, Nikolas Adaloglou 等几人发布的一篇文章，原文是 [How diffusion models work: the math from scratch | AI Summer (theaisummer.com)](https://theaisummer.com/diffusion-models/)

:::

![](./images/diffusion-models.png)

::: details 目录

[[TOC]]

:::

## 译者前言

基于生成对抗网络 GANs 的 AI 生成图像往年在互联网不温不热，但就在最近这几个月， Open AI 于 2022 年 4 月初发布的 DALL-E 2 (基于 GPT Model) ，以及 stability.ai 于 2022 年 8 月底发布的 Stable Diffusion (基于 Diffusion Models)  ，其生成的照片、画作的效果让人乍舌，随即引发了一股新的互联网 AI 创作热潮。

引发这一系列热潮的便是 [Novel AI](https://novelai.net/) 于 2022 年 10 月初发布的，能够画各种精致二次元风格图片的 NovelAI Diffusion (基于 Stable Diffusion) 一下子把 AI 绘画推向风口浪尖。无数乐子人蜂拥而至，甚至有黑客把 Novel AI 的官网源码和模型全部扒了下来。 AI 创作数量极快，乍一看都很精致，而这些 “AI Based” 作品正在以一种极快的速度挤压创作者的空间，随即引发的便是关于伦理道德和法律的一系列疑问。

但是本文暂不讨论伦理道德等方面的问题（也许之后会写一篇文章讨论），仅仅先从技术角度和数学原理上简要介绍效果出众、“秒杀” GANs 且改变了人们对原本 AI 绘画认知的 Diffusion Models 的数学原理。

## 扩散模型是什么？

扩散模型 (Diffusion Models) 是一种新型的、先进的生成模型，可以生成各种高分辨率图像。在 OpenAI, Nvidia 和 Google 成功地训练了大规模的模型后，扩散模型已经吸引了很多人的注意。基于扩散模型的架构有 GLIDE, DALLE-2, Imagen 和 完全开源的 Stable Diffusion 。

其背后的原理是什么？

在这篇文章，我们将从基本原理开始挖掘。目前已经有许多不同的基于扩散模型的架构，我们将重点讨论其中最突出的一个，即由 [Sohl-Dickstein et al](https://arxiv.org/abs/1503.03585) 和 [Ho. et al 2020](https://arxiv.org/abs/2006.11239) 提出的去噪扩散概率模型 (DDPM, denoising diffusion probabilistic model) 。其它各种方法将不会具体讨论，如 Stable Diffusion 和 score-based models 。

::: tip

扩散模型与之前所有的生成方法有着本质的区别。直观地说，它们旨在将图像生成过程（采样）分解为许多小的“去噪”步骤

:::

直观点说，模型可以在这些小的步骤中自我修正，并逐渐产生一个更好的样本。在某种程度上，这种完善表征的想法已经在 [alphafold](https://youtu.be/nGVFbPKrRWQ?t=1148) 等模型中得到了应用。但是，这种迭代过程使其采样速度很慢，至少与 [GANs](https://theaisummer.com/gan-computer-vision/) 相比。

## 扩散过程

扩散模型的基本思想是相当简单的。把输入图像 $\mathbf{x}_0$ 并通过一系列的 $T$ 步骤，逐渐向其添加高斯噪声，我们将此称为正向过程。值得注意的是，正向过程与神经网络的正向传播无关，但是正向传播对于为我们的神经网络生成目标（应用 $t \lt T$ 噪声步骤后的图像）是有必要的。

之后，神经网络被训练为通过逆转噪声过程来恢复原始数据。通过对反向过程进行建模，我们可以生成新的数据。这就是所谓的反向扩散过程，或者说是生成式模型的采样过程。

具体是怎样的？让我们深入其中的数学，让一切变得清晰起来。

## 前向扩散

扩散模型可以被看作是潜在变量模型。“潜在”意味着我们指的是一个隐藏的连续特征空间。以这种方式，它们可能看起来类似于 [变分自动编码器 (VAEs)](https://theaisummer.com/latent-variable-models/) 。

在实践中，它们是用一个马尔科夫链的 $T$ 步骤来制定的。这里，马尔可夫链意味着每一步只取决于前一步，这是一个很自然的假设。重要的是，与基于流量的模型不同，我们不受限制地使用特定类型的神经网络。

给定一个数据点 $\mathbf{x}_0$ ，从真实数据分布 $q(\mathbf{x})$ ($\mathbf{x}_0 \sim q(\mathbf{x})$) 中采样，我们可以通过添加噪声来定义一个前向扩散过程。具体来说，在马尔科夫链的每一步，我们向 $\mathbf{x}_{t-1}$ 添加方差为 $\beta_t$ 的高斯噪声，产生一个新的潜在变量 $\mathbf{x}_{t}$ ，其分布为 $q(\mathbf{x}_t|\mathbf{x}_{t-1})$ 。这个扩散过程可以表述如下：

$$
q(\mathbf{x}_t \vert \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \boldsymbol{\mu}_t=\sqrt{1 - \beta_t} \mathbf{x}_{t-1}, \boldsymbol{\Sigma}_t = \beta_t\mathbf{I})
$$

![](./images/forward-diffusion.png)

::: center

前向扩散过程  
图片修改自 [Ho et al. 2020](https://arxiv.org/abs/2006.11239)

:::

由于我们处于多维情况下， $\textbf{I}$ 是单位矩阵，表明每个维度有相同的标准偏差 $\beta_t$ 。注意到， $q(\mathbf{x}_t \vert \mathbf{x}_{t-1})$ 是一个正态分布，其均值是 $\boldsymbol{\mu}_t =\sqrt{1 - \beta_t} \mathbf{x}_{t-1}$​​ ，方差为 $\boldsymbol{\Sigma}_t=\beta_t\mathbf{I}$ ，其中 $\boldsymbol{\Sigma}$ 是一个对角矩阵的方差（这里就是 $\beta_t$ ）。

因此，我们可以自 $\mathbf{x}_0$ 到 $\mathbf{x}_t$ 以一种可操作的方式来近似输入。在数学上，这种后验概率定义如下：

$$
q(\mathbf{x}_{1:T} \vert \mathbf{x}_0) = \prod^T_{t=1} q(\mathbf{x}_t \vert \mathbf{x}_{t-1}) 
$$

其中，$q(\mathbf{x}_{1:T})$ 意味着我们从时间 $1$ 到 $T$ 重复应用 $q$ 。

到目前为止，看起来还不错？并不！对于时间步长 $t=500<T$ 我们需要为了采样 $\mathbf{x}_t$ 应用 $q$ 函数 500 次。难道就没有更好的方式吗？

[重参数化技巧 (Reparametrization Trick)](https://theaisummer.com/latent-variable-models/#reparameterization-trick) 对此提供了一个魔法般的补救办法。
### 重参数化技巧：在任何时间步长上的可操作闭式采样

如果我们定义 $\alpha_t= 1- \beta_t$, $\bar{\alpha}_t = \prod_{s=0}^t \alpha_s$ ，其中 $\boldsymbol{\epsilon}_{0},..., \epsilon_{t-2}, \epsilon_{t-1} \sim \mathcal{N}(\textbf{0},\mathbf{I})$ ，那么我们可以使用重参数化技巧证明：

$$
\begin{aligned}

\mathbf{x}_t 

&=\sqrt{1 - \beta_t} \mathbf{x}_{t-1} + \sqrt{\beta_t}\boldsymbol{\epsilon}_{t-1}\\

&= \sqrt{\alpha_t}\mathbf{x}_{t-1} + \sqrt{1 - \alpha_t}\boldsymbol{\epsilon}_{t-1}  \\

&= \dots \\

&= \sqrt{\bar{\alpha}_t}\mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t}\boldsymbol{\epsilon_0} 

\end{aligned}
$$

::: note

由于所有时间段都有相同的高斯噪声，我们从现在开始只使用符号 $ϵ$

:::

因此，为了产生一个样本，我们可以使用如下公式：

$$
\mathbf{x}_t  \sim q(\mathbf{x}_t \vert \mathbf{x}_0) = \mathcal{N}(\mathbf{x}_t; \sqrt{\bar{\alpha}_t} \mathbf{x}_0, (1 - \bar{\alpha}_t)\mathbf{I})
$$

由于 $\beta_t$ 是一个超参数，我们可以预先计算所有时间步长的 $\alpha_t$ 和 $\bar{\alpha}_t$ 。这意味着我们在任何一个时间点 $t$ 对噪声进行采样，并一次性得到 $\mathbf{x}_t$ 。因此，我们可以在任何一个任意的时间段对我们的潜变量 $\mathbf{x}_t$ 进行采样。这将是我们以后计算可操作的目标损失 $L_t$ 的目标。

### 方差表

方差参数 $\beta_t$ 可以固定为一个常数，也可以选择作为 $T$ 时间段的一个时间表。事实上，人们可以定义一个方差表，它可以是线性的、二次的、余弦的等等。最初的 DDPM 作者利用了一个从 $\beta_1= 10^{-4}$ 到 $\beta_T = 0.02$ 增加的线性时间表。 [Nichol et al. 2021](https://arxiv.org/abs/2102.09672) 的研究表明，采用余弦时间表效果更好。

![](./images/variance-schedule.png)

::: center

分别来自线性（上面）和余弦时间表（下面）的潜伏样本  
图片来自 [Nichol & Dhariwal 2021](https://arxiv.org/abs/2102.09672)

:::

## 反向扩散

当 $T \to \infty$ 时，潜在的 $\mathbf{x}_T$ 几乎是一个 [各向同性 (isotropic)](https://math.stackexchange.com/questions/1991961/gaussian-distribution-is-isotropic#:~:text=TLDR%3A%20An%20isotropic%20gaussian%20is,%CE%A3%20is%20the%20covariance%20matrix.) 的高斯分布。因此，如果我们设法学习反向分布 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_{t})$ ，我们可以对 $\mathbf{x}_t$ 进行采样，从 $\mathcal{N}(\textbf{0},\mathbf{I})$ 中获取样本，运行反向过程并从 $q(\mathbf{x}_0)$ ，从原始数据分布中产生一个新的数据点。


问题是我们如何对反向扩散过程进行建模。

### 用神经网络逼近反向过程

在实际情况中，我们不知道 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_{t})$ ，由于估计 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_{t})$ 需要涉及数据分布的计算，所以这是难以解决的。

相反，我们用一个参数化的模型 $p_{\theta}$ （例如一个神经网络）来近似 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_{t})$ 。由于 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_{t})$ 也将是高斯的，对于足够小的 $\beta_t$ ，我们可以选择是高斯的 $p_{\theta}$ ，只需对平均值和方差进行参数化：

$$
p_\theta(\mathbf{x}_{t-1} \vert \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1}; \boldsymbol{\mu}_\theta(\mathbf{x}_t, t), \boldsymbol{\Sigma}_\theta(\mathbf{x}_t, t))
$$

![](./images/reverse-diffusion.png)

::: center

反向扩散过程  
图片修改自 [Ho et al. 2020](https://arxiv.org/abs/2006.11239)

:::

如果我们对所有的时间步数应用反向公式 $p_\theta(\mathbf{x}_{0:T})$ ，我们可以由 $\mathbf{x}_T$ 得到数据分布：

$$
p_\theta(\mathbf{x}_{0:T}) = p_{\theta}(\mathbf{x}_T) \prod^T_{t=1} p_\theta(\mathbf{x}_{t-1} \vert \mathbf{x}_t)
$$

通过对时间段 $t$ 的额外调节，该模型将学会预测每个时间段的高斯参数（指平均值 $\boldsymbol{\mu}_\theta(\mathbf{x}_t, t)$ ）和协方差矩阵 $\boldsymbol{\Sigma}_\theta(\mathbf{x}_t, t)$ 但我们如何训练这样一个模型呢？

## 训练一个扩散模型

如果我们退一步讲，我们可以注意到， $q$ 和 $p$ 的组合与变分自编码器 (VAE) 非常相似。因此，我们可以通过优化训练数据的负对数似然来训练它。经过一系列的计算（我们在此不做分析），我们可以把证据下界 (ELBO) 写成如下：

$$
\begin{aligned}

\log p(\mathbf{x}) \geq ~

&\mathbb{E}_{q(x_1 \vert x_0)} [\log p_{\theta} (\mathbf{x}_0 \vert \mathbf{x}_1)] - \\ &D_{KL}(q(\mathbf{x}_T \vert \mathbf{x}_0) \vert\vert p(\mathbf{x}_T))- \\

&\sum_{t=2}^T \mathbb{E}_{q(\mathbf{x}_t \vert \mathbf{x}_0)} [D_{KL}(q(\mathbf{x}_{t-1} \vert \mathbf{x}_t, \mathbf{x}_0) \vert \vert p_{\theta}(\mathbf{x}_{t-1} \vert \mathbf{x}_t)) ] \\

& = L_0 - L_T - \sum_{t=2}^T L_{t-1}

\end{aligned}
$$

我们来分析一下这些内容：

1. $\mathbb{E}_{q(x_1 \vert x_0)} [log p_{\theta} (\mathbf{x}_0 \vert \mathbf{x}_1)]$ 可以当作是一个重建项 (reconstruction term) ，类似于变量自动编码器 ELBO 中的那个。在 [Ho et al 2020](https://arxiv.org/abs/2006.11239) 的研究中，这一项是用一个单独的解码器学习的。
2. $D_{KL}(q(\mathbf{x}_T \vert \mathbf{x}_0) \vert\vert p(\mathbf{x}_T))$ 显示了 $\mathbf{x}_T$ 与标准高斯是多么的相似。注意到，整个项都没有可训练的参数，因此，训练过程这个项会被忽略。
3. 最后的第三项 $\sum_{t=2}^T L_{t-1}$ 也表示为 $L_t$ ，描述了期望的去噪步骤 $p_{\theta}(\mathbf{x}_{t-1} \vert \mathbf{x}_t))$ 与近似项 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_t, \mathbf{x}_0)$ 之间的差异。

很明显，通过 ELBO ，最大化的可能性可以归结为学习去噪步骤 $L_t$ 。

::: note

尽管 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_{t})$ 是难以解决的，但 [Sohl-Dickstein et al](https://arxiv.org/abs/1503.03585) 说明，通过对 $\textbf{x}_0$ 的附加条件，可以使它变得容易解决

:::

直观地说，画家（我们的生成模型）需要一个参考图像 ($\textbf{x}_0$) 来慢慢绘制（反向扩散步骤 $q(\mathbf{x}_{t-1} \vert \mathbf{x}_t, \mathbf{x}_0)$ ）一个图像。因此，当且仅当我们有 $\mathbf{x}_0$ 作为参考时，我们可以向后退一小步，即从噪声中生成一个图像。

换句话说，我们可以在噪声水平 $t$ 的条件下对 $\textbf{x}_t$ 进行采样。由于 $\alpha_t= 1- \beta_t$ 和 $\bar{\alpha}_t = \prod_{s=0}^t \alpha_s$ ，我们可以证明：

$$
\begin{aligned}

q(\mathbf{x}_{t-1} \vert \mathbf{x}_t, \mathbf{x}_0) &= \mathcal{N}(\mathbf{x}_{t-1}; {\tilde{\boldsymbol{\mu}}}(\mathbf{x}_t, \mathbf{x}_0), {\tilde{\beta}_t} \mathbf{I}) \\

\tilde{\beta}_t &= \frac{1 - \bar{\alpha}_{t-1}}{1 - \bar{\alpha}_t} \cdot \beta_t \\

\tilde{\boldsymbol{\mu}}_t (\mathbf{x}_t, \mathbf{x}_0) &= \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_t}{1 - \bar{\alpha}_t} \mathbf{x_0} + \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} \mathbf{x}_t 

\end{aligned}
$$

::: note

$\alpha_t$ 和 $\bar{\alpha}_t$ 只取决于​ $\beta_t$ ，所以它们可以被预先计算出来

:::

这个小技巧为我们提供了一个完全可操作的 ELBO 。上述属性还有一个重要的副作用，正如我们在重参数化技巧中已经看到的，我们可以将 $\mathbf{x}_0$ 表示为：

$$
\mathbf{x}_0 = \frac{1}{\sqrt{\bar{\alpha}_t}}\left(\mathbf{x}_t - \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}\right),
$$

其中 $\boldsymbol{\epsilon} \sim \mathcal{N}(\textbf{0},\mathbf{I})$

通过合并最后两个方程，现在每个时间步长将有一个平均数 $\tilde{\boldsymbol{\mu}}_t$ （我们的目标），它只取决于 $\mathbf{x}_t$ :

$$
\tilde{\boldsymbol{\mu}}_t (\mathbf{x}_t) = {\frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}  \right)}
$$

因此，我们可以使用一个神经网路 $\epsilon_{\theta}(\mathbf{x}_t,t)$ 来近似 $\boldsymbol{\epsilon}$ 并得到如下均值结果：

$$
\tilde{\boldsymbol{\mu}_{\theta}}( \mathbf{x}_t,t) = {\frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_{\theta}(\mathbf{x}_t,t) \right)}
$$

因此，损失函数（ELBO中的去噪项）可以表示为：

$$
\begin{aligned}

L_t &= \mathbb{E}_{\mathbf{x}_0,t,\boldsymbol{\epsilon}}\left[\frac{1}{2||\boldsymbol{\Sigma}_\theta (x_t,t)||_2^2} ||\tilde{\boldsymbol{\mu}}_t - \boldsymbol{\mu}_\theta(\mathbf{x}_t, t)||_2^2 \right] \\

&= \mathbb{E}_{\mathbf{x}_0,t,\boldsymbol{\epsilon}}\left[\frac{\beta_t^2}{2\alpha_t (1 - \bar{\alpha}_t) ||\boldsymbol{\Sigma}_\theta||^2_2} \| \boldsymbol{\epsilon}_{t}-  \boldsymbol{\epsilon}_{\theta}(\sqrt{\bar{a}_t} \mathbf{x}_0 + \sqrt{1-\bar{a}_t}\boldsymbol{\epsilon}, t ) ||^2 \right]

\end{aligned}
$$

这有效地告诉我们，该模型不是预测分布的平均值，而是预测每个时间点 $t$ 的噪声 $\boldsymbol{\epsilon}$

[Ho et.al 2020](https://arxiv.org/abs/2006.11239) 对实际损失项做了一些简化，因为他们忽略了一个加权项。简化后的版本优于完整的目标：

$$
L_t^\text{simple} = \mathbb{E}_{\mathbf{x}_0, t, \boldsymbol{\epsilon}} \left[\|\boldsymbol{\epsilon}- \boldsymbol{\epsilon}_{\theta}(\sqrt{\bar{a}_t} \mathbf{x}_0 + \sqrt{1-\bar{a}_t} \boldsymbol{\epsilon}, t ) ||^2 \right]
$$

作者发现，优化上述目标比优化原始 ELBO 效果更好。这两个方程的证明可以在 [Lillian Weng](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/#reverse-diffusion-process) 的这篇优秀文章或 [Luo et al. 2022](https://arxiv.org/abs/2208.11970) 中找到。

此外，[Ho et. al 2020](https://arxiv.org/abs/2006.11239) 决定保持方差固定，让网络只学习平均值。后来 [Nichol et al. 2021](https://arxiv.org/abs/2102.09672) 对此进行了改进，他们让网络学习协方差矩阵 $(\boldsymbol{\Sigma})$ （通过修改 $L_t^\text{simple}$ ），取得了更好的结果。

![](./images/training-sampling-ddpm.png)

::: center

DDPMs 的训练和采样算法  
图片来自 [Ho et al. 2020](https://arxiv.org/abs/2006.11239)

:::

## 架构

到目前为止，我们还没有提到的一件事是模型的架构是什么样子的。请注意，模型的输入和输出应该是相同大小的。

为此， [Ho et al.](https://arxiv.org/abs/2006.11239) 采用了一个 U-Net 。如果你对 U-Net 不熟悉，请随时查看我们过去关于 [主要 U-Net 架构](https://theaisummer.com/unet-architectures/) 的文章。简而言之， U-Net 是一种对称的架构，其输入和输出的空间大小相同，在相应特征维度的编码器和解码器块之间使用 [跳过连接](https://theaisummer.com/skip-connections/) 。通常情况下，输入图像首先被降频，然后被升频，直到达到其初始尺寸。

在 DDPMs 的原始实现中， U-Net 由宽 [ResNet 块](https://theaisummer.com/skip-connections/#resnet-skip-connections-via-addition) 、 [分组归一化](https://theaisummer.com/normalization/#group-normalization-2018) 以及 [自我注意](https://theaisummer.com/attention/) 块组成。

扩散时间段 $t$ 是通过在每个残差块中加入一个正弦的 [位置嵌入](https://theaisummer.com/positional-embeddings/) 来指定的。欲了解更多细节，请随时访问 [官方 GitHub 仓库](https://github.com/hojonathanho/diffusion)  。关于扩散模型的详细实现，请查看 [Hugging Face 的这篇精彩文章](https://huggingface.co/blog/annotated-diffusion) 。


![](./images/unet.png)

::: center

U-Net 的架构  
图片来自 [Ronneberger et al.](https://arxiv.org/abs/1505.04597)

:::

## 条件性图像生成：引导扩散

图像生成的一个关键方面是调节采样过程，以操纵生成的样本。在这里，这也被称为引导性扩散。

甚至有一些方法将图像嵌入到扩散中，以便“引导”生成。从数学上讲，引导指的是用一个条件 $y$ ，即类别标签或图像/文本嵌入来调节先验数据分布 $p(\textbf{x})$ ，导致 $p(\textbf{x}|y)$ 为了把扩散模型 $p_\theta$ 变成一个条件扩散模型，我们可以在每个扩散步骤中加入条件信息 $y$ :

$$
p_\theta(\mathbf{x}_{0:T} \vert y) = p_\theta(\mathbf{x}_T) \prod^T_{t=1} p_\theta(\mathbf{x}_{t-1} \vert \mathbf{x}_t, y)
$$

在每个时间点都能看到调节的事实，这可能是文字提示的优秀样本的一个很好的理由。

一般来说，引导扩散模型的目的是学习 $\nabla \log p_\theta( \mathbf{x}_t \vert y)$ ，所以使用贝叶斯规则，我们可以写出：

$$
\begin{aligned}

\nabla_{\textbf{x}_{t}} \log p_\theta(\mathbf{x}_t \vert y) &= \nabla_{\textbf{x}_{t}} \log (\frac{p_\theta(y \vert \mathbf{x}_t) p_\theta(\mathbf{x}_t) }{p_\theta(y)}) \\

&= \nabla_{\textbf{x}_{t}} log p_\theta(\mathbf{x}_t) + \nabla_{\textbf{x}_{t}} log (p_\theta( y \vert\mathbf{x}_t ))

\end{aligned}
$$

因为梯度算子 $\nabla_{\textbf{x}_{t}}$ 只代表 $\textbf{x}_{t}$ ， $p_\theta(y)$ 被移除，所以 $y$ 没有梯度。此外请记住 $\log(a b)= \log(a) + \log(b)$ 。

再加上一个指导性的标量项 $s$ ，我们就有：

$$
\nabla \log p_\theta(\mathbf{x}_t \vert y) =  \nabla \log p_\theta(\mathbf{x}_t) +  s \cdot \nabla \log (p_\theta( y \vert\mathbf{x}_t ))
$$

利用这一表述，让我们对分类器和无分类器的引导进行区分。接下来，我们将介绍两个旨在注入标签信息的方法系列。

### 分类指导

[Sohl-Dickstein et al.](https://arxiv.org/abs/1503.03585) 以及后来的 [Dhariwal 和 Nichol](https://arxiv.org/abs/2105.05233) 表明，我们可以使用第二个模型，即分类器 $f_\phi(y \vert \mathbf{x}_t, t)$ ，在训练过程中引导向目标类 $y$ 的扩散。为了达到这个目的，我们可以在噪声图像 $\mathbf{x}_t$ 上训练一个分类器 $f_\phi(y \vert \mathbf{x}_t, t)$ ，以预测其类别 $y$ 。然后我们可以使用梯度 $\nabla \log (f_\phi( y \vert\mathbf{x}_t ))$ 来引导扩散。具体怎么办呢？

我们可以建立一个具有均值 $\mu_\theta(\mathbf{x}_t|y)$ 和方差 $\boldsymbol{\Sigma}_\theta(\mathbf{x}_t |y)$ 的类条件扩散模型。

由于 $p_\theta \sim \mathcal{N}(\mu_{\theta}, \Sigma_{\theta})$ ，我们可以用上一节的引导公式表明，均值受到了 $y$ 类的 $\log f_\phi(y|\mathbf{x}_t)$ 的梯度扰动，而结果是：

$$
\hat{\mu}(\mathbf{x}_t |y) =\mu_\theta(\mathbf{x}_t |y) + s \cdot \boldsymbol{\Sigma}_\theta(\mathbf{x}_t |y) \nabla_{\mathbf{x}_t} logf_\phi(y \vert \mathbf{x}_t, t)
$$

在 [Nichol et al. 著名的 GLIDE 论文](https://arxiv.org/abs/2112.10741) 中，作者扩展了这个想法，并使用 [CLIP 嵌入](https://theaisummer.com/vision-language-models/#clip) 来指导扩散。 [Saharia et al.](https://arxiv.org/abs/2205.11487) 提出的 CLIP 由一个图像编码器 $g$ 和一个文本编码器 $h$ 组成。它分别产生一个图像和文本嵌入 $g(\mathbf{x}_t)$ 和 $h(c)$ ，其中 $c$ 是文本标题。

因此，我们可以用它们的点积来扰动梯度：

$$
\hat{\mu}(\mathbf{x}_t |c) =\mu(\mathbf{x}_t |c) + s \cdot \boldsymbol{\Sigma}_\theta(\mathbf{x}_t |c) \nabla_{\mathbf{x}_t} g(\mathbf{x}_t) \cdot h(c)
$$

结果是，它们设法将生成过程“引向”用户定义的文本标题。

![](./images/classifier-guidance.png)

::: center

分类器引导的扩散采样算法  
图片来自 [Dhariwal & Nichol 2021](https://arxiv.org/abs/2105.05233)

:::

### 无分类指导

使用与之前相同的表述，我们可以将无分类器的引导扩散模型定义为：

$$
\nabla \log p(\mathbf{x}_t \vert y)  =s \cdot \nabla log(p(\mathbf{x}_t \vert y)) + (1-s) \cdot \nabla log p(\mathbf{x}_t) 
$$

正如 [Ho & Salimans](https://openreview.net/forum?id=qw8AKxfYbI) 所提议的那样，不需要第二个分类器模型就可以实现指导作用。事实上，他们使用的是完全相同的神经网络，而不是训练一个单独的分类器，作者将条件性扩散模型 $\boldsymbol{\epsilon}_\theta (\mathbf{x}_t|y)$ 与无条件性模型 $\boldsymbol{\epsilon}_\theta (\mathbf{x}_t |0)$ 一起训练。在训练过程中，他们随机地将类 $y$ 设置为 $0$ ，这样模型就同时接触到了有条件和无条件的设置：

$$
\begin{aligned}

\hat{\boldsymbol{\epsilon}}_\theta(\mathbf{x}_t |y) & = s \cdot \boldsymbol{\epsilon}_\theta(\mathbf{x}_t |y) + (1-s) \cdot \boldsymbol{\epsilon}_\theta(\mathbf{x}_t |0) \\

 &=  \boldsymbol{\epsilon}_\theta(\mathbf{x}_t |0) + s \cdot (\boldsymbol{\epsilon}_\theta(\mathbf{x}_t |y) -\boldsymbol{\epsilon}_\theta(\mathbf{x}_t |0) )

\end{aligned}
$$

::: note

请注意，这也可以用来“注入”文本嵌入，正如我们在分类器指导中显示的那样

:::

这个公认的“怪异”过程有两个主要优点：

1. 它只使用一个单一的模型来指导扩散。
2. 当对难以用分类器预测的信息（如文本嵌入）进行调节时，它简化了指导。

[Saharia et al.](https://arxiv.org/abs/2205.11487) 提出的 Imagen 在很大程度上依赖于无分类器的引导，因为他们发现这是一个关键因素去产生具有强大图像-文本对准的生成样本。关于 Imagen 方法的更多信息，请看 AI Coffee Break 与 Letitia 的这段 YouTube 视频：

<YouTube id="xqDeAz0U-R4" />

## 扩大扩散模型的规模

你可能会问这些模型的问题是什么。好吧，将这些 U-Net 扩展到高分辨率的图像中，在计算上是非常昂贵的。这给我们带来了两种将扩散模型扩展到高分辨率的方法：级联扩散模型和潜伏扩散模型。

### 级联扩散模型

[Ho et al. 2021](https://arxiv.org/abs/2106.15282) 引入了级联扩散模型，以努力产生高保真的图像。级联扩散模型包括一个由许多连续扩散模型组成的管道，生成分辨率越来越高的图像。每个模型通过连续地对图像进行上采样并增加更高分辨率的细节，生成一个比前一个质量更好的样本。为了生成一个图像，我们从每个扩散模型中依次取样。

![](./images/cascade-diffusion.png)

::: center

级联扩散模型管道  
图片来自 Ho & Saharia et al.

:::

为了获得级联架构的良好效果，对每个超级分辨率模型的输入进行强有力的数据增强是至关重要的。为什么呢？因为它可以减轻之前级联模型的复合误差，以及由于训练-测试不匹配造成的误差。

研究发现，高斯模糊是实现高保真度的一个关键转变。他们把这种技术称为调节增强。

### Stable Diffusion: 潜在扩散模型

潜在扩散模型是基于一个相当简单的想法：我们不是直接在高维输入上应用扩散过程，而是将输入投射到一个较小的潜伏空间，并在那里应用扩散。

更详细地说， [Rombach et al.](https://arxiv.org/abs/2112.10752) 建议使用编码器网络将输入编码为潜伏表示，即 $\mathbf{z}_t = g(\mathbf{x}_t)$ 。这一决定背后的直觉是通过在低维空间处理输入来降低训练扩散模型的计算需求。之后，一个标准的扩散模型 (U-Net) 应用于生成新的数据，这些数据被一个解码器网络放大。

如果一个典型的扩散模型 (DM) 的损失被表述为：

$$
L _{DM} = \mathbb{E}_{\mathbf{x}, t, \boldsymbol{\epsilon}} \left[\| \boldsymbol{\epsilon}-  \boldsymbol{\epsilon}_{\theta}( \mathbf{x}_t, t ) ||^2 \right]
$$

然后，给定编码器 $\mathcal{E}$ 和一个潜在表示 $z$ ，那么一个潜在扩散模型 (LDM) 的损失函数可以表示为：

$$
L _{LDM} = \mathbb{E}_{ \mathcal{E}(\mathbf{x}), t,  \boldsymbol{\epsilon}} \left[\|  \boldsymbol{\epsilon}-  \boldsymbol{\epsilon}_{\theta}( \mathbf{z}_t, t ) ||^2 \right]
$$

![](./images/stable-diffusion.png)

::: center

潜伏的扩散模型  
图片来自 [Rombach et al](https://arxiv.org/abs/2112.10752)

:::


欲了解更多信息，请看这个 YouTube 视频：

<YouTube id="ltLNYA3lWAQ" />

## 基于评分的生成模型

在 DDPM 论文发表的同时， [Song and Ermon](https://arxiv.org/abs/1907.05600) 提出了一种不同类型的生成模型，似乎与扩散模型有许多相似之处。基于评分的模型利用评分匹配和 Langevin 动力学来解决生成式学习。

::: info

- [评分匹配 (Score-matching)](https://www.jmlr.org/papers/v6/hyvarinen05a.html) 指的是对数概率密度函数梯度的建模过程，也被称为评分函数。
- [Langevin 动力学 (Langevin dynamics)](https://en.wikipedia.org/wiki/Langevin_dynamics) 是一个迭代过程，可以从一个分布中只使用其评分函数来抽取样本

:::

$$
\mathbf{x}_t=\mathbf{x}_{t-1}+\frac{\delta}{2} \nabla_{\mathbf{x}} \log p\left(\mathbf{x}_{t-1}\right)+\sqrt{\delta} \boldsymbol{\epsilon}, \quad \text { where } \boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})
$$

其中 $\delta$ 是步长大小。

假设我们有一个概率密度 $p(x)$ ，并且我们定义评分函数为 $\nabla_x \log p(x)$ 。然后我们可以训练一个神经网络 $s_{\theta}$ 来估计 $\nabla_x \log p(x)$ ，而不用先估计 $p(x)$ 。训练目标可以表述如下：

$$
\mathbb{E}_{p(\mathbf{x})}[\| \nabla_\mathbf{x} \log p(\mathbf{x}) - \mathbf{s}_\theta(\mathbf{x})  \|_2^2] = \int p(\mathbf{x}) \| \nabla_\mathbf{x} \log p(\mathbf{x}) - \mathbf{s}_\theta(\mathbf{x})  \|_2^2 \mathrm{d}\mathbf{x}
$$

然后通过使用 Langevin 动力学，我们可以使用近似的评分函数直接从 $p(x)$ 中采样。

::: tip

如果你错过了，引导式扩散模型使用这种基于评分的模型的表述，因为它们直接学习 $\nabla_x \log p(x)$ 。当然，他们并不依赖 Langevin 动力学

:::

### 为基于评分的模型添加噪音：噪声条件得分网络(NCSN)

::: tip

到目前为止的问题是：在低密度地区，估计的评分函数通常是不准确的，因为那里的数据点很少。因此，**使用 Langevin 动力学采样的数据质量并不好**

:::

他们的解决方案是对数据点进行噪声扰动，然后在噪声数据点上训练基于评分的模型。事实上，他们使用了多种规模的高斯噪声扰动。

因此，添加噪声是使 DDPM 和基于评分的模型都能工作的关键。

![](./images/score-based.png)

::: center

基于评分的生成模型与评分匹配以及 Langevin 动力学  
图片来自 [Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.github.io/blog/2021/score/)

:::

在数学上，给定数据分布 $p(x)$ ，我们用高斯噪声进行扰动 $\mathcal{N}(\textbf{0}, \sigma_i^2 I)$ 其中 $i=1,2,\cdots,L$ 得到一个噪声扰动的分布：

$$
p_{\sigma_i}(\mathbf{x}) = \int p(\mathbf{y}) \mathcal{N}(\mathbf{x}; \mathbf{y}, \sigma_i^2 I) \mathrm{d} \mathbf{y}
$$

然后我们训练一个网络 $s_\theta(\mathbf{x},i)$ ，称为基于噪声条件的评分网络 (NCSN) 来估计评分函数 $\nabla_\mathbf{x} \log d_{\sigma_i}(\mathbf{x})$ 。训练目标是所有噪声尺度的 [Fisher 散度](https://en.wikipedia.org/wiki/Fisher_information_metric) 的加权和：

$$
\sum_{i=1}^L \lambda(i) \mathbb{E}_{p_{\sigma_i}(\mathbf{x})}[\| \nabla_\mathbf{x} \log p_{\sigma_i}(\mathbf{x}) - \mathbf{s}_\theta(\mathbf{x}, i)  \|_2^2]
$$

### 通过随机微分方程 (SDE) 进行基于评分的生成性建模

[Song et al. 2021](https://arxiv.org/abs/2011.13456) 探讨了基于评分的模型与扩散模型的联系。为了将 NSCNs 和 DDPMs 都囊括在同一伞下，他们提出了以下建议。

我们不使用有限数量的噪声分布来扰动数据，而是使用连续的分布，这些分布根据扩散过程随时间演变。这个过程由一个规定的随机微分方程 (SDE) 来模拟，它不依赖于数据，也没有可训练的参数。通过逆转这个过程，我们可以生成新的样本。

![](./images/score-sde.png)

::: center

通过随机微分方程 (SDE) 进行基于评分的生成性建模  
图片来自 [Song et al. 2021](https://arxiv.org/abs/2011.13456)

:::

我们可以把扩散过程 $\{ \mathbf{x}(t) \}_{t\in [0, T]}$ 定义为以下形式的 SDE:

$$
\mathrm{d}\mathbf{x} = \mathbf{f}(\mathbf{x}, t) \mathrm{d}t + g(t) \mathrm{d} \mathbf{w}
$$

其中，$\mathbf{w}$ 是维纳过程（又称布朗运动）。 $\mathbf{f}(\cdot, t)$ 是一个矢量值函数，称为 $\mathbf{x}(t)$ 的漂移系数， $g(\cdot)$ 是一个标度函数，称为 $\mathbf{x}(t)$ 的扩散系数。请注意， SDE 通常有一个唯一的强解。

::: tip

为了理解我们为什么使用 SDE ，这里有一个提示： SDE 的灵感来自于布朗运动，在布朗运动中，一些粒子在介质内随机移动。粒子运动的这种随机性模拟了数据上的连续噪声扰动

:::

在对原始数据分布进行足够长时间的扰动后，被扰动的分布会变得接近于一个可操作的噪声分布。

为了产生新的样本，我们需要逆转扩散过程。该 SDE 被选择为有一个相应的封闭形式的反向 SDE:

$$
\mathrm{d}\mathbf{x} = [\mathbf{f}(\mathbf{x}, t) - g^2(t) \nabla_\mathbf{x} \log p_t(\mathbf{x})]\mathrm{d}t + g(t) \mathrm{d} \mathbf{w}
$$

为了计算反向 SDE ，我们需要估计评分函数 $\nabla_\mathbf{x} \log p_t(\mathbf{x})$ 。这是用基于评分的模型 $s_\theta(\mathbf{x},i)$ 和 Langevin 动力学完成的。训练目标是 Fisher 分歧的连续组合：

$$
\mathbb{E}_{t \in \mathcal{U}(0, T)}\mathbb{E}_{p_t(\mathbf{x})}[\lambda(t) \| \nabla_\mathbf{x} \log p_t(\mathbf{x}) - \mathbf{s}_\theta(\mathbf{x}, t) \|_2^2]
$$


其中 $\mathcal{U}(0, T)$ 表示时间间隔上的均匀分布， $\lambda$ 是一个正的加权函数。一旦我们有了评分函数，我们就可以把它放入反向 SDE 并求解，以便从原始数据分布 $p_0(\mathbf{x})$ 中采样 $\mathbf{x}(0)$ 。

::: tip

有许多解决反向 SDE 的方案，我们在此不作分析。请务必查看原始论文或作者的 [这篇优秀博文](https://yang-song.github.io/blog/2021/score/)

:::

![](./images/score-based-sde-overview.png)

::: center

通过 SDEs 进行基于评分的生成性建模的概述  
图片来自 [Song et al. 2021](https://arxiv.org/abs/2011.13456)

:::

## 总结

让我们对这篇博文中所学到的主要内容做一个简单的总结。

- 扩散模型的工作原理是通过一系列的 TT 步骤将高斯噪声逐渐添加到原始图像中，这个过程被称为扩散。
- 为了对新数据进行采样，我们使用神经网络对反向扩散过程进行近似。
- 模型的训练是基于证据下界 (ELBO) 的最大化。
- 我们可以将扩散模型置于图像标签或文本嵌入的条件下，以便“指导”扩散过程。
- 级联扩散和潜伏扩散是两种将模型扩展到高分辨率的方法
- 级联扩散模型是连续的扩散模型，可以生成分辨率越来越高的图像。
- 潜伏扩散模型（像 Stable Diffusion ）在较小的潜伏空间上应用扩散过程，以提高计算效率，使用变分自编码器进行向上和向下取样。
- 基于评分的模型也将一连串的噪声扰动应用到原始图像上。但它们是用评分匹配和 Langevin 动力学来训练的。尽管如此，它们最终的目标是相似的。
- 扩散过程可以被表述为一个 SDE 。解决反向 SDE 使我们能够生成新的样本。


最后，对于 [扩散模型](https://angusturner.github.io/generative_models/2021/06/29/diffusion-probabilistic-models-I.html) 和 VAE 或 AE 之间的更多联系，请查看 [这些很棒的文章](https://benanne.github.io/2022/01/31/diffusion.html) 。

## 引用

```bibtex
@article{karagiannakos2022diffusionmodels,
    title   = "Diffusion models: toward state-of-the-art image generation",
    author  = "Karagiannakos, Sergios, Adaloglou, Nikolaos",
    journal = "https://theaisummer.com/",
    year    = "2022",
    howpublished = {https://theaisummer.com/diffusion-models/},
  }
```

## 参考文献

::: info

<div style="overflow-x: auto; font-size: 0.9rem">

<nobr>
  
[1] Sohl-Dickstein, Jascha, et al. [Deep Unsupervised Learning Using Nonequilibrium Thermodynamics](https://arxiv.org/abs/1503.03585). arXiv:1503.03585, arXiv, 18 Nov. 2015  
[2] Ho, Jonathan, et al. [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239). arXiv:2006.11239, arXiv, 16 Dec. 2020  
[3] Nichol, Alex, and Prafulla Dhariwal. [Improved Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2102.09672). arXiv:2102.09672, arXiv, 18 Feb. 2021  
[4] Dhariwal, Prafulla, and Alex Nichol. [Diffusion Models Beat GANs on Image Synthesis](https://arxiv.org/abs/2105.05233). arXiv:2105.05233, arXiv, 1 June 2021  
[5] Nichol, Alex, et al. [GLIDE: Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion Models](https://arxiv.org/abs/2112.10741). arXiv:2112.10741, arXiv, 8 Mar. 2022  
[6] Ho, Jonathan, and Tim Salimans. [Classifier-Free Diffusion Guidance](https://openreview.net/forum?id=qw8AKxfYbI). 2021. openreview.net  
[7] Ramesh, Aditya, et al. [Hierarchical Text-Conditional Image Generation with CLIP Latents](https://arxiv.org/abs/2204.06125). arXiv:2204.06125, arXiv, 12 Apr. 2022  
[8] Saharia, Chitwan, et al. [Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding](https://arxiv.org/abs/2205.11487). arXiv:2205.11487, arXiv, 23 May 2022  
[9] Rombach, Robin, et al. [High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752). arXiv:2112.10752, arXiv, 13 Apr. 2022  
[10] Ho, Jonathan, et al. [Cascaded Diffusion Models for High Fidelity Image Generation](https://arxiv.org/abs/2106.15282). arXiv:2106.15282, arXiv, 17 Dec. 2021  
[11] Weng, Lilian. [What Are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) 11 July 2021  
[12] O'Connor, Ryan. [Introduction to Diffusion Models for Machine Learning](https://www.assemblyai.com/blog/diffusion-models-for-machine-learning-introduction/) AssemblyAI Blog, 12 May 2022  
[13] Rogge, Niels and Rasul, Kashif. [The Annotated Diffusion Models](https://huggingface.co/blog/annotated-diffusion). Hugging Face Blog, 7 June 2022  
[14] Das, Ayan. [An Introduction to Diffusion Probabilistic Models](https://ayandas.me/blog-tut/2021/12/04/diffusion-prob-models.html). Ayan Das, 4 Dec. 2021  
[15] Song, Yang, and Stefano Ermon. [Generative Modeling by Estimating Gradients of the Data Distribution](https://arxiv.org/abs/1907.05600). arXiv:1907.05600, arXiv, 10 Oct. 2020  
[16] Song, Yang, and Stefano Ermon. [Improved Techniques for Training Score-Based Generative Models](https://arxiv.org/abs/2006.09011). arXiv:2006.09011, arXiv, 23 Oct. 2020  
[17] Song, Yang, et al. [Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456). arXiv:2011.13456, arXiv, 10 Feb. 2021  
[18] Song, Yang. [Generative Modeling by Estimating Gradients of the Data Distribution](https://yang-song.github.io/blog/2021/score/). 5 May 2021  
[19] Luo, Calvin. [Understanding Diffusion Models: A Unified Perspective](https://doi.org/10.48550/arXiv.2208.11970). 25 Aug. 2022

</nobr>

</div>

:::

---
::: warning
本站所有内容均使用 MIT 协议，并署名 [`shaofun`](//shao.fun)，请遵守 [此协议](/LICENSE.md) ，转载请标明出处
:::
