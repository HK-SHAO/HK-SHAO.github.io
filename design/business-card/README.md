# 个人名片

[HTML 源稿](index.html) · [送印 PDF](business-card.pdf)

正反各一页，成品 90 × 54 mm，四边各 3 mm 出血。PDF 使用 CMYK，嵌入 Sarasa UI SC 和 PSO Coated v3（FOGRA51）。正面小字与二维码用单黑。

## 重建

在本目录使用 Vite+、pnpm 和 uv。首次安装需要网络。

```sh
vp install --frozen-lockfile
vp run --no-cache browser:install
vp run --no-cache build
```

构建用锁定版本的 Chromium 从 HTML 导出矢量稿，再以 Python 3.12 转成印刷色。通过两页尺寸、字体、CMYK 和二维码检查后，才替换 `business-card.pdf`。

默认从 [ECI 官方配置包](https://eci.org/lib/exe/pso-coated_v3.zip) 读取 ICC 并核对哈希。若已有原版 `PSOcoated_v3.icc`，可设置 `BUSINESS_CARD_ICC` 为该文件的路径。字体来源和授权见[字体说明](fonts/README.md)。

若修改二维码链接，同步更新 HTML 内的矢量图形。构建会从成品 PDF 解码并核对地址。
