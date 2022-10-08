---
footer: MIT Licensed | Copyright © 2021-2022 HK-SHAO
description: Markdown 基础教程
---

# 使用 Markdown 排版文章

> <p style="text-align: right">——图文排版是集合计算机算法和软件工程等学科的一门艺术。</p>

:::info 一些排版软件
- **Office Word** 和各种在线文档是所见即所得的，但是并不方便开源行业使用，而且功能过于臃肿，不简洁高效和统一优雅
- **$\TeX$** 是算法和程序设计技术先驱 D.E. Knuth 发明的排版系统，对 PDF 格式支持更好，是学术论文排版的首选，但是编译时间长，非所见即所得，[$\LaTeX$](https://www.latex-project.org/) 是 $\TeX$ 最广为人知的衍生
- **Doxygen** 是开源并跨平台的文档生成系统，但是学习门槛较高，泛用性可能没那么好
:::

::: note 更多情况，请选择 Markdown
Markdown 是简单高效的文章排版标记方式，同样所见即所得，被互联网广为使用，有大量工具软件支持，简单通用，一次编写到处发布
:::

::: warning
一些包含代码的例子，仅仅只是演示 Markdown 排版和展示代码的能力，你并不需要理解代码的含义。在学习过程中，**你只需要关注 Markdown 的标记语法起到的排版、布局和改变样式的作用**
:::

## 多级标题

::: info 语法 
使用 N 个 `#` 空格后接标题
:::

::: tip
Markdown 相当于对 HTML 的简化， Markdown 通常要先转换为 HTML ，然后再被排版渲染
:::

::: normal-demo

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

:::

::: details 查看 Markdown 代码
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
:::

## 段落格式

::: tip
在 Markdown 中，请注意必要的空格 <kbd>Space</kbd> 和换行 <kbd>Enter</kbd> 是语法需要
:::

### 换行

::: tip
在行末加两个空格然后回车换行
:::

这是第一行文字  
这是第二行文字

::: details 查看 Markdown 代码
```markdown
这是第一行文字  
这是第二行文字
```
:::

### 分段

::: tip
两次回车换行实际上是分段
:::

这是第一段文字

这是第二段文字

::: details 查看 Markdown 代码
```markdown
这是第一段文字

这是第二段文字
```
:::

## 字体样式

### 斜体

*斜体文本*  
_这也是斜体文本_  

::: details 查看 Markdown 代码
```markdown
*斜体文本*  
_这也是斜体文本_  
```
:::

### 粗体

**粗体文本**  
__这也是粗体文本__  

::: details 查看 Markdown 代码
```markdown
**粗体文本**  
__这也是粗体文本__  
```
:::

### 粗斜体

::: tip
粗斜体实际上是组合使用粗体语法和斜体语法
:::

***粗斜体文本***  
___这也是粗斜体文本___  

::: details 查看 Markdown 代码
```markdown
***粗斜体文本***  
___这也是粗斜体文本___  
```
:::

### 删除线

~~这行文字被删除了~~  
***~~这行文字被删除了~~***

::: details 查看 Markdown 代码
```markdown
~~这行文字被删除了~~  
***~~这行文字被删除了~~***
```
:::

## 分隔线

### 各种分隔线

::: tip
符号最少重复三遍，重复多遍效果一致，分隔线前后要换行
:::

分隔线 ***

***

分隔线 * * *

* * *

分隔线 ---

---

分隔线 - - -

- - -

分隔线 ___

___

分隔线 _ _ _

_ _ _


::: details 查看 Markdown 代码
```markdown
分隔线 ***

***

分隔线 * * *

* * *

分隔线 ---

---

分隔线 - - -

- - -

分隔线 ___

___

分隔线 _ _ _

_ _ _
```
:::

### 分隔线标题

::: tip
这是一种特殊情况，文字换行后紧接着分隔线，这行会被设置为二级标题
:::

::: normal-demo

```html
<h2>分隔线二级标题<h2>
```

:::

::: details 查看 Markdown 代码
```markdown
分隔线二级标题
---
```
:::

## 文字列表

::: tip
多使用列表，以及嵌套列表，可以让你的文本更加富有逻辑
:::

### 无序列表

::: tip
三个符号 ( `+` `-` `*` ) 效果完全一样，可以代替使用，交替使用，也可以混合使用
:::

#### 使用 `-` 的例子

- 第一项
- 第二项
- 第三项

::: details 查看 Markdown 代码
```markdown
- 第一项
- 第二项
- 第三项
```
:::

#### 使用 `+` 的例子

+ 第一项
  + 1.1
  + 1.2
+ 第二项
  + 2.1
  + 2.2
+ 第三项
  + 3.1
  + 3.2

::: details 查看 Markdown 代码
```markdown
+ 第一项
  + 1.1
  + 1.2
+ 第二项
  + 2.1
  + 2.2
+ 第三项
  + 3.1
  + 3.2
```
:::

#### 使用 `*` 的例子

* 第一项
* * 1.1
* * * 1.1.1
* * * * 1.1.1.1
* 第二项
  * 2.1
    * 2.1.1
      * 2.1.1.1
* 第三项

::: details 查看 Markdown 代码
```markdown
* 第一项
* * 1.1
* * * 1.1.1
* * * * 1.1.1.1
* 第二项
  * 2.1
    * 2.1.1
      * 2.1.1.1
* 第三项
```
:::

### 有序列表

::: info 语法
数字之后加一个英文句号 `.` 再加空格，后面接内容
:::

1. 第一项
2. 第二项
3. 第三项

::: details 查看 Markdown 代码
```markdown
1. 第一项
2. 第二项
3. 第三项
```
:::

### 混合列表

::: tip
列表可以任意混合，嵌套使用，当然也可以嵌套其他语法
:::

1. 第一项：
    - 第一项嵌套的第一个元素
      1. 我是 1.1.1
      2. 我是 1.1.2
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
      - 我是 2.1.1
      - 我是 2.1.2
    - 第二项嵌套的第二个元素

::: details 查看 Markdown 代码
```markdown
1. 第一项：
    - 第一项嵌套的第一个元素
      1. 我是 1.1.1
      2. 我是 1.1.2
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
      - 我是 2.1.1
      - 我是 2.1.2
    - 第二项嵌套的第二个元素
```
:::

### 任务列表

- [x] 完成了
- [ ] TODO
  - [x] 完成
  - [ ] 没完成
- [ ] TODO

::: details 查看 Markdown 代码
```markdown
- [x] 完成了
- [ ] TODO
  - [x] 完成
  - [ ] 没完成
- [ ] TODO
```
:::

## 区块引用

### 单行引用
> 这是单行区块引用

::: details 查看 Markdown 代码
```markdown
> 这是单行区块引用
```
:::

### 多行引用

> 这是多行区块引用
> 
> 这是也是多行区块引用
> 
> 这是还是多行区块引用

::: details 查看 Markdown 代码
```markdown
> 这是多行区块引用
> 
> 这是也是多行区块引用
> 
> 这是还是多行区块引用
```
:::

### 嵌套引用

> 嵌套区块引用
> > 第一层嵌套
> > > 第二层嵌套
>
> > > > > 疯狂嵌套
> 
> > 这还是嵌套
> - 嵌套中嵌套无序列表
> 1. 嵌套中嵌套有序列表
> - > 列表中嵌套

::: details 查看 Markdown 代码
```markdown
> 嵌套区块引用
> > 第一层嵌套
> > > 第二层嵌套
>
> > > > > 疯狂嵌套
> 
> > 这还是嵌套
> - 嵌套中嵌套无序列表
> 1. 嵌套中嵌套有序列表
> - > 列表中嵌套
```
:::

## 代码块


### 行内代码

我喜欢 `C` 语言，不喜欢 `C++` 语言

::: details 查看 Markdown 代码
```markdown
我喜欢 `C` 语言，不喜欢 `C++` 语言
```
:::

### 多行代码

::: tip
就像分隔线一样，更多的反引号 `` ```` `` 或者波浪线 `~~~~` 同样是可以的
:::

::: warning
正确的三个反引号是 `` ``` `` ，而不是 `ˋˋˋ` ，它们只是看起来很像而已
:::

```
#include <stdio.h>

int main() {
	puts("Hello, World!");
	return 0;
}
```

::: details 查看 Markdown 代码
````
```
#include <stdio.h>

int main() {
	puts("Hello, World!");
	return 0;
}
```
````
:::

### 高亮代码

```c
#include <stdio.h>

int main() {
	puts("Hello, World!");
	return 0;
}
```

::: details 查看 Markdown 代码
````
```c
#include <stdio.h>

int main() {
	puts("Hello, World!");
	return 0;
}
```
````
:::

~~~csharp
using System;
class Program {
	static void Main(string[] args) {
		Console.WriteLine("Hello, World!");
	}
}
~~~

::: details 查看 Markdown 代码
```markdown
~~~csharp
using System;
class Program {
	static void Main(string[] args) {
		Console.WriteLine("Hello, World!");
	}
}
~~~
```
:::

### 代码区块

::: info 语法
多行整体一个 <kbd>Tap</kbd> 缩进，或使用 4 个空格
:::

```
console.log('shaofun is a newbie')
console.log('shaofun is a newbie')
```

::: details 查看 Markdown 代码
```markdown
    console.log('shaofun is a newbie')
	console.log('shaofun is a newbie')
```
:::

## 链接

### 超链接

[链接到烧风的视频主页](https://space.bilibili.com/24046148)

::: details 查看 Markdown 代码
```markdown
[链接到烧风的视频主页](https://space.bilibili.com/24046148)
```
:::

### 脚注链接

[链接到烧风的视频主页][shaofun's bilibili]

[shaofun's bilibili]: https://space.bilibili.com/24046148

::: details 查看 Markdown 代码
```markdown
[链接到烧风的视频主页][shaofun's bilibili]

[shaofun's bilibili]: https://space.bilibili.com/24046148
```
:::

## 表格

::: tip
对于复杂的表格，你可以通过在线 Markdown 表格生成工具来创建
:::

### 默认对齐

::: warning
默认通常是左对齐，但不同的平台可能有少许差异
:::

|  表头   | 表头  |
|  ----  | ----  |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |

::: details 查看 Markdown 代码
```markdown
|  表头   | 表头  |
|  ----  | ----  |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |
```
:::

### 左对齐

|  表头   | 表头  |
|  :----  | :---- |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |

::: details 查看 Markdown 代码
```markdown
|  表头   | 表头  |
|  :----  | :---- |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |
```
:::

### 右对齐

|  表头   | 表头  |
|  ----:  | ----: |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |

::: details 查看 Markdown 代码
```markdown
|  表头   | 表头  |
|  ----:  | ----: |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |
```
:::

### 居中对齐

|  表头   | 表头  |
|  :---:  | :---: |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |

::: details 查看 Markdown 代码
```markdown
|  表头   | 表头  |
|  :---:  | :---: |
| 我是单元格内的一行文本哦阿巴阿巴  | 我是单元格内的一行文本哦阿巴阿巴 |
| 单元格  | 单元格 |
```
:::

## 图片

::: info 语法 
```markdown
![备注](图片链接 "标题")
```
:::

| ![shaofun](/images/logo.png)   | ![shaofun](/images/logo.png "shaofun") |
| :---------------------------:  | :------------------------------------: |
| `![shaofun](/images/logo.png)` |`![shaofun](/images/logo.png "shaofun")`|

::: details 查看 Markdown 代码
```markdown
| ![shaofun](/images/logo.png)   | ![shaofun](/images/logo.png "shaofun") |
| :---------------------------:  | :------------------------------------: |
| `![shaofun](/images/logo.png)` |`![shaofun](/images/logo.png "shaofun")`|
```
:::

## 脚注

虽然这是一个引用脚注 [^1]
但是请问烧风是不是大佬 [^no114514]

[^1]: 这里是对脚注的解释
[^no114514]: 烧风不是大佬

::: details 查看 Markdown 代码
```markdown
虽然这是一个引用脚注 [^1]
但是请问烧风是不是大佬 [^no114514]

[^1]: 原来这里是对脚注的解释
[^no114514]: 烧风不是大佬
```
:::

## 尾声

::: info 快试试吧
快试试 Markdown 吧！在本文末尾的评论区 ，你就可以立即开始用 Markdown 实践了，发条评论试试！如果你想进阶学习 Markdown 的扩展用法，请看这篇文章 [烧风的 Markdown 进阶教程](advanced-use-of-markdown.md)
:::

---
::: warning
本站所有内容均使用 MIT 协议，并署名 [`shaofun`](//shao.fun)，请遵守 [此协议](/LICENSE.md) ，转载请标明出处
:::

## 评论

<CommentService />