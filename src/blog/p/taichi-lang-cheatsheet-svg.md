# Taichi Lang Cheatsheet SVG

::: info

- 这是一个 SVG 格式（矢量图）的 Taichi Language Cheatsheet
- 仓库地址：https://github.com/HK-SHAO/taichi-cheatsheet-svg

:::

## Preview

::: center
![cheatsheet](https://shao.fun/taichi-cheatsheet-svg/svg/cheatsheet.min.svg)
:::

## Why

直到目前，各种浏览器对 PDF 嵌入网页并高性能显示的效果仍然比不上 SVG 。为了能让 Taichi Language Cheatsheet 被网页更容易的显示、嵌入和引用，我将其转换为了 SVG 格式。

## What

- 这个矢量图保证了在任何设备上字体显示的一致性（但作为代价，文本将不能直接被复制）
  - 并且 <kbd>DOC</kbd> 按钮仍然可以超链接到官方文档
- 它能够被自由的嵌入到网页，例如：https://shao.fun/taichi-cheatsheet-svg/
- 与原版不同，左上角的 Taichi Lang LOGO 链接到了 Taichi Lang 官网 :)

## How to dev&build

- 如何构建 $\TeX$ 版本的 PDF 文件，请查看原仓库
  - https://github.com/taichi-dev/cheatsheet

1. 由于 SVG 嵌入字体的限制，为保证任何情况下字体与原版一致，只好将所有文本转换成了路径，因此要构建 SVG 版本的 Taichi Language Cheatsheet 需要在安装了已有字体的情况下用 illustrator 打开 PDF 并转换为 SVG （字体转换为轮廓，三位数精度）
2. 我将 `taichi-lang-logo.png` 转换成了矢量路径
3. 手动编辑和整理 SVG 的 XML 代码，为不同按钮加上超链接，链接到 [Taichi 官网文档](https://docs.taichi-lang.org/)
4. 将 Taichi Lang LOGO 加入超链接，链接到 [Taichi 官网](https://taichi-lang.org/)
5. 压缩 SVG 文件，生成 `cheatsheet.min.svg`

## Maintain

对于 SVG 的维护，目前并没有脚本自动化解决方案，因此需要手动维护。