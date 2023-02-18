
# 向 New Bing 提问

::: tip
以下是我的一些提问，用作个人记录
:::

## 图形学

::: info Q

- 为了实现基于物理的渲染，路径追踪中大多数光线被俄罗斯轮盘赌结束掉了，或者最终没有击中光源，这些光线是没有贡献的，怎样让更多光线与材质表面交互后成为对图像有贡献的光线？

:::

::: note A

你好，这是必应。我可以帮你查找一些关于路径追踪的信息。😊

路径追踪是一种渲染技术，它通过模拟光线在场景中与物体表面的多次交互，来生成逼真的光照效果¹²³。路径追踪的难点在于如何高效地采样路径，以减少噪声和提高收敛速度。一种常用的方法是使用俄罗斯轮盘赌（Russian Roulette）来终止路径，以避免追踪贡献很小的光线⁴。但是，这也会导致一些光线被过早地结束，从而降低图像的质量。

为了让更多的光线与材质表面交互后成为对图像有贡献的光线，有一些可能的方法，例如：

- 使用重要性采样（Importance Sampling）来根据表面的BSDF或光源的分布来选择光线的方向，以增加光线的能量和方向的一致性¹⁴。
- 使用双向路径追踪（Bidirectional Path Tracing）或多重重要性采样（Multiple Importance Sampling）来同时从相机和光源发出光线，并在路径的某些顶点处连接它们，以增加光线的覆盖率和连通性¹⁴。
- 使用光子映射（Photon Mapping）或光线空间层次结构（Ray-Space Hierarchy）等预计算技术来存储和重用光线的信息，以增加光线的利用率和缓存效率¹⁴。

以上是一些基本的思路，具体的实现和优化细节可能会有所不同，你可以参考一些相关的论文和教程来深入了解。希望这些信息对你有所帮助。😊

Source: Conversation with Bing, 15/2/2023

<div style="overflow-x: auto; font-size: 0.9rem">

<div style="white-space: nowrap">

(1) 聊聊最近几年的路径追踪技术的进展（一） - 秦春林 - 博客园. https://www.cnblogs.com/hielvis/p/6371840.html Accessed 15/2/2023.  
(2) 【UE5小技巧】超高质量影视图像光追渲染器Path Tracer，一分钟学会 - 哔哩哔哩. https://www.bilibili.com/read/cv14342734 Accessed 15/2/2023.  
(3) 路径追踪器 | 虚幻引擎文档. https://docs.unrealengine.com/4.27/zh-CN/RenderingAndGraphics/RayTracing/PathTracer/ Accessed 15/2/2023.  
(4) 知乎 - 有问题，就会有答案. https://www.zhihu.com/question/368551323 Accessed 15/2/2023.  
(5) 路径跟踪算法学习及总结_RobotWoods的博客-CSDN博客_路径跟踪算法. https://blog.csdn.net/qq_35358125/article/details/107029549 Accessed 15/2/2023.  

</div>

</div>

:::

---


::: info Q

- 路径追踪的图像通常会因采样不足而产生大量噪点，为了更快的渲染逼真的图像，如何在渲染的各个环节减少噪点？

:::

::: note A

根据我的搜索结果，为了更快地渲染逼真的图像，减少路径追踪的噪点，有几种可能的方法：

- 增加每个像素的采样数/光线数，这可以降低渲染的方差，但也会增加计算的开销²⁶。
- 使用**自适应采样**，根据像素的变化程度动态调整采样数，这可以减少不必要的采样，提高渲染的效率⁴。
- 使用**路径引导**，这是一种利用重要性采样的技术，可以在难以找到光源的场景中减少噪点，例如通过一个小门开口照亮的房间。路径引导可以随着时间的推移学习重要的光线方向，随着采样数的增加而改善¹³。
- 使用**噪点滤波器**，这是一种后处理的方法，可以在渲染完成后对图像进行平滑或去噪，但也可能会损失一些细节或锐度²⁵。

Source: Conversation with Bing, 15/2/2023

<div style="overflow-x: auto; font-size: 0.9rem">

<div style="white-space: nowrap">

(1) Optimizing Path Tracing using Noise Reduction Filters, Henrik Wann Jensen. https://graphics.stanford.edu/~henrik/papers/wscg95.html Accessed 15/2/2023.  
(2) Path tracing - Wikipedia. https://en.wikipedia.org/wiki/Path_tracing Accessed 15/2/2023.  
(3) Path tracing, sampler settings and noise reduction tips - prman-pixar .... https://github-wiki-see.page/m/prman-pixar/RenderManForBlender/wiki/Path-tracing,-sampler-settings-and-noise-reduction-tips Accessed 15/2/2023.  
(4) Sampling — Blender Manual. https://docs.blender.org/manual/en/latest/render/cycles/render_settings/sampling.html#:~:text=Path%20guiding%20helps%20reduce%20noise%20in%20scenes%20where,over%20time%2C%20improving%20as%20more%20samples%20are%20taken. Accessed 15/2/2023.  
(5) Sampling — Blender Manual. https://docs.blender.org/manual/en/latest/render/cycles/render_settings/sampling.html Accessed 15/2/2023.  
(6) Algorithms to Remove High Frequency Noise from Path Tracing. https://computergraphics.stackexchange.com/questions/5270/algorithms-to-remove-high-frequency-noise-from-path-tracing Accessed 15/2/2023.  

</div>

</div>

:::

---

::: info Q

- 简洁描述路径追踪时自适应采样的具体原理

:::

::: note A

根据我的搜索结果，路径追踪时自适应采样的具体原理是：

- 自适应采样是一种根据像素的变化程度动态调整采样数的方法，可以减少不必要的采样，提高渲染的效率³⁴。
- 自适应采样的基本思想是，对每个像素，先通过四个角发射主光线，如果四个角的亮度差异很大，就说明像素需要更多的采样，否则就说明像素已经足够平滑，不需要更多的采样³。
- 如果像素需要更多的采样，就将像素分成四个矩形部分，对每个部分重复上述过程，直到达到预设的采样数或者像素的亮度差异小于预设的阈值³⁴。
- 自适应采样可以看作是一种自动的分支路径追踪，分支路径追踪是一种根据材质的不同给不同的像素分配不同的采样数的方法，自适应采样可以更好地实现这一目标²。

Source: Conversation with Bing, 15/2/2023

<div style="overflow-x: auto; font-size: 0.9rem">

<div style="white-space: nowrap">

(1) Adaptive sampling - WPI. https://web.cs.wpi.edu/~matt/courses/cs563/talks/antialiasing/adaptive.html Accessed 15/2/2023.  
(2) Adaptive Sampling and Bias Estimation in Path Tracing. http://luthuli.cs.uiuc.edu/~daf/courses/Rendering/Papers-2/RTHWJ.article.pdf Accessed 15/2/2023.  
(3) Please, dont remove Branched Path Tracing! - Cycles Development .... https://devtalk.blender.org/t/please-dont-remove-branched-path-tracing/20619 Accessed 15/2/2023.  
(4) Please, dont remove Branched Path Tracing! - Cycles Development .... https://bing.com/search?q=adaptive+sampling+path+tracing Accessed 15/2/2023.  
(5) NVIDIA Omniverse Path Tracing with Adaptive Sampling - YouTube. https://www.youtube.com/watch?v=Gh3ZaMxwhto Accessed 15/2/2023.  

</div>

</div>

:::

---

::: info Q
- 半球采样时，`normalize(normal + vector)`和`normalize(vector * dot(vector, normal))`有什么区别？

:::

::: note A

半球采样是一种在计算机图形学中用于模拟光照效果的技术，它可以根据不同的分布函数生成随机的方向向量⁵⁷。`normalize(normal + vector)`和`normalize(vector * dot(vector, normal))`是两种不同的半球采样方法，它们都可以得到单位长度的向量，但是它们的方向和密度分布有所不同。

`normalize(normal + vector)`是一种均匀分布的半球采样方法，它可以得到任意方向上相同概率的向量⁵。这种方法适合用于模拟漫反射或者均匀散射的效果。

`normalize(vector * dot(vector, normal))`是一种余弦加权分布的半球采样方法，它可以得到与法线方向更接近的向量，而远离法线方向的向量概率较低⁵⁷。这种方法适合用于模拟镜面反射或者高光效果。

Source: Conversation with Bing, 18/2/2023

<div style="overflow-x: auto; font-size: 0.9rem">

<div style="white-space: nowrap">

(1) Uniform Sampling on unit Hemisphere – Thomas' blog. https://blog.thomaspoulet.fr/uniform-sampling-on-unit-hemisphere/#:~:text=Hemisphere%3A%20Cosine%20Weighted%20Sampling%20The%20goal%20of%20this,power%20is%20perfectly%20suited%20for%20this%20spiky%20effect. Accessed 18/2/2023.  
(2) Importance Sampling of a Hemisphere. https://www.mathematik.uni-marburg.de/~thormae/lectures/graphics1/code/ImportanceSampling/index.html Accessed 18/2/2023.  
(3) Eigen中norm、normalize、normalized的区别_dzxia920的博客-CSDN博客_eigen normalize. https://blog.csdn.net/m0_56348460/article/details/117386857 Accessed 18/2/2023.  
(4) 【Unity】如何理解Vector3.normalized 归一化向量 以及 向量方向计算. https://blog.csdn.net/xyl192960/article/details/120774285 Accessed 18/2/2023.  
(5) Vector magnitude & normalization (article) | Khan Academy. https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/vector-magnitude-normalization Accessed 18/2/2023.  
(6) How to Normalize a Vector: 9 Steps (with Pictures) - wikiHow. https://www.wikihow.com/Normalize-a-Vector Accessed 18/2/2023.  
(7) Uniform Sampling on unit Hemisphere – Thomas' blog. https://blog.thomaspoulet.fr/uniform-sampling-on-unit-hemisphere/ Accessed 18/2/2023.  
(8) 13.6 2D Sampling with Multidimensional Transformations. https://www.pbr-book.org/3ed-2018/Monte_Carlo_Integration/2D_Sampling_with_Multidimensional_Transformations Accessed 18/2/2023.  
(9) EY Helix – Audit technology | EY - Global. https://www.ey.com/en_gl/audit/technology/helix Accessed 18/2/2023.  

</div>

</div>

:::

---

::: info Q
- 蒙特卡洛采样时，这两种方法的 PDF 分别是什么，用公式表示

:::

::: note A

蒙特卡洛采样是一种通过随机数来近似求解期望、均值、面积、积分等问题的方法¹²³。在计算机图形学中，蒙特卡洛采样可以用于模拟光线追踪、全局光照等效果⁴。

在蒙特卡洛采样中，PDF（概率密度函数）是一个描述随机变量取不同值的概率的函数²。不同的半球采样方法有不同的PDF，用公式表示如下：

`normalize(normal + vector)`的PDF是`p(x) = 1 / (2π)`，这是一个均匀分布的函数。

`normalize(vector * dot(vector, normal))`的PDF是`p(x) = cos(θ) / π`，这是一个余弦加权分布的函数 。其中，θ是向量与法线之间的夹角。

Source: Conversation with Bing, 18/2/2023

<div style="overflow-x: auto; font-size: 0.9rem">

<div style="white-space: nowrap">

(1) 初探强化学习（1）蒙特卡洛采样_难受啊！马飞...的博客-CSDN博客. https://blog.csdn.net/qq_33328642/article/details/123118339 Accessed 18/2/2023.  
(2) 采样之蒙特卡罗方法 - 小糊涂也学要编程 - 博客园. https://www.cnblogs.com/171207xiaohutu/p/9480119.html Accessed 18/2/2023.  
(3) 一文看懂蒙特卡洛采样方法 - 知乎. https://zhuanlan.zhihu.com/p/338103692 Accessed 18/2/2023.  
(4) MCMC（蒙特卡洛采样）_整得咔咔响的博客-CSDN博客_蒙特卡罗采样. https://blog.csdn.net/qq_27388259/article/details/112001362 Accessed 18/2/2023.  

</div>

</div>

:::