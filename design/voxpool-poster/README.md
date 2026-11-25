# 体素池核海报

[HTML 排版稿](index.html) · [送印 PDF](voxpool-poster.pdf)

成品为 **300 × 450 mm**，四边各留 **3 mm 出血**。送印稿使用 CMYK 和 PSO Coated v3（FOGRA51）。场景以约 340 ppi 的原生分辨率置入，PDF 内使用高质量 CMYK JPEG 压缩。中文轮廓和官方标志保持矢量，说明文字嵌入 Sarasa UI SC。

右上两行共用右边线，官方标志在上，较宽的中文标题在下。右下水面上的网址在上，「池核探索 · 自由建造 · 实时光追」在下。两行均用同字号、同字重的 Sarasa UI SC 半粗体，右对齐。HTML 和 PDF 中的 [shao.fun/voxpool](https://shao.fun/voxpool/) 均可点击。字体来源与许可见[字体说明](fonts/README.md)。

- [中文字标](title-zh.svg) 以独立的路径组绘制四个字，采用与官方英文轮廓呼应的等线笔画、方切端点和局部圆角。
- [官方标志](voxpool-logo.svg) 来自 `raygame/docs/logo-dark.svg`，包含四格图标和英文轮廓。
- [原生场景图](scene.png) 是 4096 × 6144 的 WebGPU 无滤镜 PNG。左上方天窗斜照池面，池底的折射焦散与右墙、梁底的反射焦散来自同一组日光光路。
- [可编辑地图](scene.vpool) 可导入体素池核。静帧的精确机位、太阳方向和采样质量见[渲染参数](render-settings.json)。

## 重建送印 PDF

从仓库根目录执行。复用名片工程锁定的 Playwright 和 Python 依赖，首次安装需要联网并准备 Vite+、pnpm 和 uv。

```sh
(cd design/business-card && vp install --frozen-lockfile && vp run --no-cache browser:install)
node design/voxpool-poster/export.mjs
```

导出器读取本目录的 HTML 和原生 PNG，验收裁切、出血、CMYK、字体、字标与链接后替换 PDF。ICC 默认从 [ECI 官方配置包](https://eci.org/lib/exe/pso-coated_v3.zip)下载并校验哈希，也可通过 `VOXPOOL_POSTER_ICC` 指定本机的原版 `PSOcoated_v3.icc`。

## 重新捕获场景

送印稿以随仓库提供的 `scene.png` 为母版。若要改场景或机位，使用 [WebGPU 捕获源码](native-source/) 和包含提交 `274166603da064aab1288f383609017909a56780` 的本地 raygame 仓库。该提交是重渲染基线。母版采自开发中的渲染器，GPU 和浏览器版本也会影响像素值。

先完成上面的依赖安装。在博客仓库根目录设置 raygame 路径，用独立 worktree 启动渲染器。

```sh
raygame_dir=/path/to/raygame
capture_dir="$(mktemp -d)/raygame"
git -C "$raygame_dir" worktree add --detach "$capture_dir" 274166603da064aab1288f383609017909a56780
mkdir -p "$capture_dir/.local/tests/voxpool-poster"
cp design/voxpool-poster/native-source/* "$capture_dir/.local/tests/voxpool-poster/"
(cd "$capture_dir" && vp install --frozen-lockfile && vp dev --host 127.0.0.1 --port 40619 --strictPort)
```

在另一终端的博客仓库根目录，用支持 WebGPU 的 Chrome 捕获。输出目录会得到包含 PNG、地图和渲染参数的三件套。

```sh
PLAYWRIGHT_PATH="$PWD/design/business-card/node_modules/playwright" \
  node design/voxpool-poster/native-source/render.mjs "$(mktemp -d)"
```

默认采用 4096 × 6144 原生尺寸、64 次时域采样、128 焦散网格、8 次阴影采样、24 个光学界面、96 次间接光反弹、128 次镜面反射上限和 `none` 滤镜。
