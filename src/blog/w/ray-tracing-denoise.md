---
prev: taichi-ray-tracing.md
---

# 光线追踪实时渲染降噪 (WIP)

::: info
此文作者为 [Keyu Lu](https://www.keyulureels.com/)
:::

::: warning
本文暂未完成
:::

## 初始 approach
对于实时渲染降噪处理的研究可以追溯到 2010 年的论文 Edge-Avoiding À-Trous Wavelet Transform for fast Global Illumination Filtering[^ea] ，此论文的可以概括为通过考虑到输入图像本身以及法线和位置缓冲器，将一个有噪声的蒙特卡洛路径追踪的全分辨率图像生成一个平滑的输出图像。

[^ea]: THOMAS, MANU MATHEW, et al. Temporally Stable Real-Time Joint Neural Denoising and Supersampling, Intel, 2022, https://www.intel.com/content/www/us/en/developer/articles/technical/temporally-stable-denoising-and-supersampling.html

使用光线追踪的图像，一个 normal buffer，一个 position buffer 作为输入并允许保留高频细节，如其他缓冲区中没有的尖锐阴影。由此产生的图像显示了几何体边界的锐利边缘，并在需要时成功地平滑了照明。使用一般的路径追踪算法可以实现各种不同的光传输效果，如光泽材料和不同的光源类型和形状（如简单的点光源、任意的（变形的）区域光源、基于图像的照明），而无需特殊处理。

在此论文所提出的实现方法中，此方法建立于扩展快速未截断的 À-Trous 小波变换，以纳入多个边缘停顿的功能，并表明它可以稳健地过滤高噪声的蒙特卡洛全局照明图像，并在交互式速率下产生视觉上较为满意的降噪结果。

通过使用混合技术，此方法可以将基于 CPU 的射线追踪器的输出与额外的射线追踪器的信息进行补充：用额外的光栅化图像信息来补充基于 CPU 的光线追踪器的输出，用 GPU 着色器应用了避开边缘的 A-Trous 滤波器 结合不同的缓冲区来产生输出图像。

此方法的具体 GLSL 实现如下所示：

```glsl
uniform sampler2D colorMap, normalMap, posMap;
uniform float c_phi, n_phi, p_phi, stepwidth;
uniform float kernel[25];
uniform vec2 offset[25];

void main(void) { 
    vec4 sum = vec4(0.0); vec2 step = vec2(1./512., 1./512.); // resolution 
    vec4 cval = texture2D(colorMap, gl_TexCoord[0].st); 
    vec4 nval = texture2D(normalMap, gl_TexCoord[0].st); 
    vec4 pval = texture2D(posMap, gl_TexCoord[0].st); 
    float cum_w = 0.0;

    for(int i = 0; i < 25; i++) { 
        vec2 uv = gl_TexCoord[0].st + offset[i]*step*stepwidth; 
        vec4 ctmp = texture2D(colorMap, uv); 
        vec4 t = cval - ctmp;
        float dist2 = dot(t,t); 
        float c_w = min(exp(-(dist2)/c_phi), 1.0); 
        vec4 ntmp = texture2D(normalMap, uv); 
        t = nval - ntmp; 
        dist2 = max(dot(t,t)/(stepwidth*stepwidth),0.0); 
        float n_w = min(exp(-(dist2)/n_phi), 1.0); 
        vec4 ptmp = texture2D(posMap, uv);
        t = pval - ptmp; dist2 = dot(t,t);
        float p_w = min(exp(-(dist2)/p_phi),1.0); 
        float weight = c_w * n_w * p_w; sum += ctmp * weight * kernel[i]; 
        cum_w += weight*kernel[i]; 
    }
    gl_FragData[0] = sum / cum_w; 
}
```

### 对此方法的大致解读

输入是路径追踪（噪声）图像（ rt 缓冲器），在最简单的情况下，包含直接和间接照明。此外， À-Trous 滤波器的边缘停止功能 考虑到了法线和位置缓冲区 (the normal and the position buffer) 。该 À-Trous 滤波器的应用数量是由所需的过滤器总尺寸决定。我们可以通过使用 Taichi 语言将此 GLSL Denoiser 实现，并简单运用于实时渲染的场景中。

## 目前最先进的 approach

在 2022 年英特尔团队发表的论文 Temporally Stable Real-Time Joint Neural Denoising and Supersampling[^eb] 中，此团队介绍了一种新型的实时神经重建技术，该技术使用单个网络联合执行去噪和超采样。与最先进的分析或统计去噪器相比，此方法成功取得了明显更好的图像质量。论文中的帧-递归网络接受一个有噪声和混叠的低分辨率输入，并重建一个高分辨率、去噪和超采样的输出。

[^eb]: Dammertz, Holger, et al. Edge-Avoiding À-Trous Wavelet Transform for Fast Global Illumination Filtering. 2010, https://jo.dreggn.org/home/2010_atrous.pdf

之前的工作将去噪和超采样作为单独的问题处理，而此论文成功将这些问题联合起来解决。这样的 approach 比起初始的降噪处理有更高的精确度，但同时也比传统的只用到实时神经重建技术进行图像优化的算法有了更低的总成本。

### 渲染管线

在此论文提出的方法中，光线追踪通道产生漫反射和镜面反射的噪声信号。我们的方法对这些信号使用两个独立的多尺度滤波路径，它们从特征提取器的输出中获得滤波权重。来自 g-buffer 的混叠反照率和法线使用相同的输出进行超采样。这些信号在进入超分辨率的上采样之前被合成在一起。这一步骤也利用了共享特征提取器的输出。

### 联合神经去噪和超采样架构

联合神经原理：与多任务学习的最新进展相一致（ Zhang and Yang 2021 的成果），我们采用了类似的策略，从一个网络中学习一个可共享的表征，以捕捉各种重建任务的特征。我们的特征提取器的成本在所有去噪和超采样任务中被摊销了。为了在推理过程中加速卷积操作，我们对网络进行量化。

使用直接预测网络会导致图像过度模糊和色移伪影（ Hasselgren 等人，2020）。因此，我们使用一个滤波预测网络。

联合神经去噪和超采样架构模块：包括一个输入块、一个特征提取器、过滤路径、一个输出块和一个超采样块。

### 输入块

此模块为一个帧循环架构。前一帧的输出信号被扭曲，并使用渲染器产生的运动矢量进行累积。翘曲使用双三次元滤波；

高动态范围的输入被钳制在 $[0, 65535]$ 范围内，然后被一个简单的音调映射函数压缩；在 $1\times1$ 投影层获得像素级特征后，应用 $3\times3$ 卷积核来提取高级特征。在进入下一阶段之前，使用$2\times2$的平均池操作对特征进行降频处理。

### 特征提取器

特征提取阶段是基于一个标准的 U-Net 架构，由几个编码器块和解码器块组成（ Ronneberger 等人的成果）。该阶段接收来自输入块的下采样特征。每个编码器块由两个 $3\times3$ 的卷积层组成，然后是 ReLU 激活和最大集合操作，再进入下一个块。

在解码块中，第一步是对前一个块的特征图进行双线性上采样，然后是两个 $3\times3$ 卷积层和 ReLU 激活。在解码器块中应用卷积核之前，来自编码器的跳过连接与上采样的激活相连接，以恢复高频细节。每个区块的两个 $1\times1$ 卷积层共享来自解码器和瓶颈区块的激活，以便为过滤阶段得出分层的过滤器权重。

### 过滤路径

在原始分辨率下的每个像素，输出块产生 $3\times3$ 的空间和时间滤波器内核权重，完成漫反射和镜面信号的分层滤波器。此外，它还预测每像素的 $3\times3$ 内核权重，用于过滤混杂的辅助缓冲区，每像素的 $3\times3$ 时间滤波器用于扭曲的先前输出，以及每像素的时间混合权重用于所有信号，以控制历史样本的贡献。对于漫反射和镜面反射，应用了线性内核权重，并被钳制在 $[-1, 1]$ ，提高了整体锐度，而辅助缓冲区的内核权重被归一化。


### 输出块

滤波器的布局包括一个时空滤波器和一系列下采样滤波器，然后是带有跳过连接的上采样滤波器。时空滤波器将不同的 $3\times3$ 内核应用于当前帧和前一帧的过滤和扭曲的输出，其结果是线性混合的。

下采样滤波器应用 $2\times2$ 平均池，然后用 $3\times3$ 核进行过滤。升频滤波器采用双线性升频和 $3\times3$ 内核，然后将结果与相同分辨率的跳过图像进行线性混合。漫反射和镜面滤波路径使用具有独特内核权重的分层滤波方案，而反照率和法线滤波路径只使用原始分辨率的时空滤波，权重在反照率和法线之间共享，每个滤波器的输出使用 ReLU 激活函数。

### 去采样快

复合光照参数 = 反照率 - 漫反射 + 镜面反射

一个两步的双线性升采样过程产生一个色调映射和一个线性版本的合成。色调映射的合成物与输出块的特征相连接，并被传递到一个内核预测阶段。与其他内核预测模块类似，在目标分辨率下，每像素 $3\times3$ 的内核被预测出来。预测的权重和没有音调映射的升采样合成物被送到最后的过滤块，在那里应用内核权重以得到最终的输出图像。

### 超采样块

量化层被设置为使用 8 位整数的权重和激活，其中权重遵循每通道对称量化，而激活则使用每层仿生量化。当跳过层被合并时，此论文选择使用相同的量化范围。权重的量化阈值被设置为其每个通道的最大绝对值，并具有对称范围。对于激活，此论文选择使用通过设置非微分函数梯度的直通估计器来训练阈值。