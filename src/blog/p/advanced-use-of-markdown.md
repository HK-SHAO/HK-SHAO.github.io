---
footer: MIT Licensed | Copyright © 2021-2022 HK-SHAO
description: 进阶使用 Markdown 排版
---

# 烧风的 Markdown 进阶教程

> <p style="text-align: right">——没想到吧，Markdown 远比你想象的要精彩。</p>

::: warning
如果你还没看过 Markdown 基础教程，请先阅读 [使用 Markdown 排版文章](how-to-use-markdown.md)
:::

## Emoji 表情

::: info 
试试在 Markdown 中输入 Emoji 表情 :laughing: :laughing: :laughing:  ！！！

你可以直接键入 Unicode 表情，也可以根据 [这份对照表](https://gist.github.com/rxaviers/7360908) 输入
:::

:laughing: :laughing: :laughing:
🎈🎈🎈 恭喜你进入 Markdown 进阶教程！！！

```markdown
:laughing: :laughing: :laughing:
🎈🎈🎈 恭喜你进入 Markdown 进阶教程！！！
```

## 嵌入 HTML 并渲染

::: tip
更多信息请了解 [HTML 超文本标记语言](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
:::

::: note
通过各种 HTML 标签和 `style` 样式，你可以更加灵活的控制页面布局和样式

下面举出一些常用例子，欢迎你补充或自己默默探索有趣的用法
:::

### 键盘输入元素

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>ESC</kbd>

```markdown
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>ESC</kbd>
```

### 强制居中

<center>这是强制居中的一段文本</center>

<p style="text-align: center">这是居中的一段文本</p>

```markdown
<center>这是强制居中的一段文本</center>

<p style="text-align: center">这是居中的一段文本</p>
```

### 设置图片大小

<center><img src="/images/logo.png" width="100"/></center>

```markdown
<center><img src="/images/logo.png" width="100"/></center>
```

## 转义语法

### 转义符号

在以下字符前面添加反斜杠字符 `\` ，可以显示原本用于格式化 Markdown 文档的字符。

```markdown
\       反斜线          `       反引号
*       星号            _       下划线
{}      花括号          []      方括号
()      小括号          #       井字号
+       加号            -       减号
.       英文句点        !       感叹号
|       管道符号        ~       波浪号
```

### 转义 `` ` ``

想要输入 `` ` `` 你需要这样

```markdown
`` ` ``
```

### 转义 \`\`\`

想要输入 \`\`\` 你需要这样

```markdown
\`\`\`
```

### 字符实体

::: info
因为 Markdown 可以嵌入 HTML ， 因此字符实体也可以用，请参考 [Entity - 术语表 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity)
:::

## 标题索引

::: tip
每个标题是可以被自动索引的，注意到标题前面隐藏的 `#` 超链接了吗？

你还可以通过这个语法为每个标题设置自定义的编号，通过链接索引可以直接到达这个标题位置
:::

```markdown
### 这是你的标题 {#custom-id}
```

### 索引到标题

```markdown
[这个链接索引到标题](#custom-id)  
[也可通过完整链接索引](https://xxxx.xxxx/xxxx/xxxx.html#custom-id)
```

## $\LaTeX$ 公式

::: info
Markdown 内使用 $\LaTeX$ 通常是编辑器或者网页应用了 [Mathjax](https://www.mathjax.org/) 或者 [KaTeX](https://katex.org/)，使用 Mathjax 的 $\LaTeX$ 具体用法可以参考 [这篇帮助文档](https://latexlive.com/help)
:::

### 数学公式

::: tip 傅里叶变换
:::

$$
f(x) = \int_{-\infty}^\infty  \hat f(x)\xi\,e^{2 \pi i \xi x}  \,\mathrm{d}\xi 
$$

```markdown
$$
f(x) = \int_{-\infty}^\infty  \hat f(x)\xi\,e^{2 \pi i \xi x}  \,\mathrm{d}\xi 
$$
```

### 物理公式

::: tip 高斯定理
:::

$$
\mathop \Phi \nolimits_e = \oint { \mathord{ \buildrel{ \lower3pt \hbox{$ \scriptscriptstyle \rightharpoonup$}} \over E} \cdot {d \mathord{ \buildrel{ \lower3pt \hbox{$ \scriptscriptstyle \rightharpoonup$}} \over S}}  = {1 \over {{\varepsilon _0}}}\sum {q} } 
$$

```markdown
$$
\mathop \Phi \nolimits_e = \oint { \mathord{ \buildrel{ \lower3pt \hbox{$ \scriptscriptstyle \rightharpoonup$}} \over E} \cdot {d \mathord{ \buildrel{ \lower3pt \hbox{$ \scriptscriptstyle \rightharpoonup$}} \over S}}  = {1 \over {{\varepsilon _0}}}\sum {q} } 
$$
```

### 化学方程式

::: tip 硫酸钡沉淀
:::

$$
\ce{SO4^2- + Ba^2+ -> BaSO4 v} 
$$

```markdown
$$
\ce{SO4^2- + Ba^2+ -> BaSO4 v} 
$$
```

## 尾声

::: warning
本站所有内容均使用 MIT 协议，并署名 [`shaofun`](//shao.fun)，请遵守 [此协议](/LICENSE.md) ，转载请标明出处。
:::