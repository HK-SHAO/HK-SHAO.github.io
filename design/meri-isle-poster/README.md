# 美丽岛海报

[HTML 源稿](index.html) · [送印 PDF](meri-isle-poster.pdf)

成品为 **A4（210 × 297 mm）**，四边各留 **3 mm 出血**。PDF 使用 CMYK，嵌入 PSO Coated v3（FOGRA51）。1199 × 1312 的[原生插画](scene.png)以 188 mm 宽置入，有效密度约 162 ppi。

海报取的是初到小岛的第一场对话。旅客举起一张灯塔明信片，岛民朝沿港的台阶指路。暖纸、海蓝字和砖红灯塔沿用作品的港口视觉。

双语字标靠左，灯塔、「上岛，用英语开启崭新的生活」和网址沿插画右缘对齐。网址用约 19 pt 的深海蓝半粗体独占一行。字标与灯塔均为可编辑 SVG，HTML 与 PDF 的链接均指向预定落地页 [shao.fun/isle](https://shao.fun/isle)。

- [中文字标](title-zh.svg)的三个字分别绘制，可逐字调整。
- [英文字标](title-en.svg)用 Fraunces 轮廓重排，轴值为 `wght 630 / opsz 48 / SOFT 30 / WONK 0`。[字体许可](fonts/Fraunces-OFL.txt)
- [灯塔标记](lighthouse.svg)从原应用图标提取塔房、红带和单条海浪。
- Sarasa UI SC 来自 v1.0.37。标语用 [Regular](fonts/regular.ttf)，网址用 [SemiBold](fonts/semibold.ttf)。两个子集均保留字形提示和字体名称。[字体许可](fonts/Sarasa-OFL.txt)

## 重建送印 PDF

从仓库根目录执行。导出复用名片工程锁定的 Playwright、Python 依赖与 ICC 校验，以及体素池核海报的 CMYK 图像编码。

```sh
(cd design/business-card && vp install --frozen-lockfile && vp run --no-cache browser:install)
node design/meri-isle-poster/export.mjs
```

首次安装需要 Vite+、pnpm 和 uv。导出默认读取同仓[名片成品](../business-card/business-card.pdf)内嵌的 ICC，并核对其 SHA-256。也可通过 `MERI_ISLE_POSTER_ICC` 指定从 [ECI 官方配置包](https://eci.org/lib/exe/pso-coated_v3.zip)取得的 `PSOcoated_v3.icc`。裁切、出血、分色、字体、矢量与链接预检通过后才替换 PDF。

## 插画来源

使用内置 ImageGen，以明信片草稿作为人物互动参考，以游戏港景原画作为地标和色彩参考。每次重建都以仓库中的 `scene.png` 为插画母版。生成提示如下。

<details>
<summary>插画生成提示</summary>

Use case: ads-marketing. Create the standalone illustration plate for a commercial, collectible bilingual print poster for an original independent game about learning to live in English on a small fictional island. Artwork only, no design mockup. Use a nearly square crop, slightly portrait if possible, roughly 1:1.1, at the highest available native resolution and quality. Reference 1 is the approved story and point of view, NOT its printed title, texture or typography. Reference 2 is the developer's canonical harbour and lighthouse, for recognizable geography, red-and-cream striped lighthouse and deep blue-green sea; preserve the inhabited island quality. Completely redraw the art with a quieter, more authoritative printmaker's hand, sharp clean contours, deliberate masses and restrained detail. Make it an original illustration, with no text anywhere and no existing logos.

A close view across the very bottom of a ferry ramp on a bright early morning. In lower left/middle a young adult newcomer in a warm off-white shirt and navy trousers touches the rail with their left hand and holds up one light cream rectangular picture postcard with their right hand. They travel light, without a bag. The visible thumb and fingers visibly pinch one edge, and the front of the card shows one tiny red lighthouse icon, no writing. At lower centre/right a welcoming adult local woman in a dark petrol jacket or apron and a warm rust skirt pauses on the stone quay. Their eye-lines and natural attentive poses make this read instantly as the first small conversation, with both heads and the card against clean simpler color fields. She can make one small graceful gesture towards the town, with sensible hand anatomy. Make the two protagonists large enough to read at a thumbnail yet keep them entirely inside the frame. A single distant person near a café is sufficient.

Composition: one clean deliberate diagonal rail enters from lower left, then leads into the hands and postcard. A handsome turquoise bay runs up on the left, the curved harbor quay and a short stair carry our glance into the middle distance and around to a slim red-and-cream lighthouse at upper left. Blue-green slopes and a compact tier of simple, distinct harbor houses then frame the upper right, with an inviting restrained coral shop awning near the right. The horizon and warm pale sky occupy only the uppermost 12–16%, with an uninterrupted seam of sky along the top. Avoid cropping heads, cluttered silhouettes or confusing stair connections. Use golden morning side light, broad quiet deep blue and sea-green areas, clear warm paper highlights, soft sky, a disciplined small amount of vermilion and terracotta. Strong editorial screenprint / gouache at medium scale, selective squared-off pixel-like texture along edges ties to the game but avoid pervasive halftone, speckle, tiny repetitive highlights, jagged color noise, giant clouds, gloss and generic travel stock aesthetics. Keep motifs visually distinct: one lighthouse, one postcard, a few cafe details, recognisably stone waterfront, pleasantly ordinary daily life. No border, title, lettering, numbers, signage, label, decorative badges, URL, signature, mockup, or footer. Full-bleed illustration art, clean and print-friendly.

</details>
