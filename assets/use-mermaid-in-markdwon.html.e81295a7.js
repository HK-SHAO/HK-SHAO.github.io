import{e as v,f as b,g as p,r as l,o as h,c as g,a as e,b as s,d as n,w as u,t as m,h as i,_ as k}from"./app.d9ef6744.js";const y=e("h1",{id:"使用-mermaid-框图",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用-mermaid-框图","aria-hidden":"true"},"#"),s(" 使用 Mermaid 框图")],-1),q={class:"custom-container tip"},f=e("p",{class:"custom-container-title"},"提示",-1),w={class:"custom-container info"},A=e("p",{class:"custom-container-title"},"相关信息",-1),S=e("p",null,"通过 Mermaid ，你可以在 Markdown 中用文本和代码创建框图和其它可视化效果",-1),C={href:"https://mermaid-js.github.io/mermaid/",target:"_blank",rel:"noopener noreferrer"},M=e("h2",{id:"流程图",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#流程图","aria-hidden":"true"},"#"),s(" 流程图")],-1),x=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">mermaid</span>
<span class="token code-block language-mermaid">flowchart TB
    c1--&gt;a2
    subgraph one
    a1--&gt;a2
    end
    subgraph two
    b1--&gt;b2
    end
    subgraph three
    c1--&gt;c2
    end
    one --&gt; two
    three --&gt; two
    two --&gt; c2</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="循序图" tabindex="-1"><a class="header-anchor" href="#循序图" aria-hidden="true">#</a> 循序图</h2>`,2),L=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">sequence</span>
<span class="token code-block language-sequence">Alice -&gt;&gt; Bob: Hello Bob, how are you?
Bob--&gt;&gt;John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long&lt;br/&gt;long time, so long&lt;br/&gt;that the text does&lt;br/&gt;not fit on a row.

Bob--&gt;Alice: Checking with John...
Alice-&gt;John: Yes... John, how are you?</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="类图" tabindex="-1"><a class="header-anchor" href="#类图" aria-hidden="true">#</a> 类图</h2>`,2),B=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">class</span>
<span class="token code-block language-class">class Square~Shape~{
    int id
    List~int~ position
    setPoints(List~int~ points)
    getPoints() List~int~
}

Square : -List~string~ messages
Square : +setMessages(List~string~ messages)
Square : +getMessages() List~string~</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="状态图" tabindex="-1"><a class="header-anchor" href="#状态图" aria-hidden="true">#</a> 状态图</h2>`,2),_=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">state</span>
<span class="token code-block language-state">[*] --&gt; Active

state Active {
    [*] --&gt; NumLockOff
    NumLockOff --&gt; NumLockOn : EvNumLockPressed
    NumLockOn --&gt; NumLockOff : EvNumLockPressed
    --
    [*] --&gt; CapsLockOff
    CapsLockOff --&gt; CapsLockOn : EvCapsLockPressed
    CapsLockOn --&gt; CapsLockOff : EvCapsLockPressed
    --
    [*] --&gt; ScrollLockOff
    ScrollLockOff --&gt; ScrollLockOn : EvScrollLockPressed
    ScrollLockOn --&gt; ScrollLockOff : EvScrollLockPressed
}</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="关系图" tabindex="-1"><a class="header-anchor" href="#关系图" aria-hidden="true">#</a> 关系图</h2>`,2),E=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">er</span>
<span class="token code-block language-er">CAR ||--o{ NAMED-DRIVER : allows
CAR {
    string registrationNumber
    string make
    string model
}
PERSON ||--o{ NAMED-DRIVER : is
PERSON {
    string firstName
    string lastName
    int age
}</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="用户日记图" tabindex="-1"><a class="header-anchor" href="#用户日记图" aria-hidden="true">#</a> 用户日记图</h2>`,2),D=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">journey</span>
<span class="token code-block language-journey">title My working day
section Go to work
  Make tea: 5: Me
  Go upstairs: 3: Me
  Do work: 1: Me, Cat
section Go home
  Go downstairs: 5: Me
  Sit down: 5: Me</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="甘特图" tabindex="-1"><a class="header-anchor" href="#甘特图" aria-hidden="true">#</a> 甘特图</h2>`,2),I=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">gantt</span>
<span class="token code-block language-gantt">dateFormat  YYYY-MM-DD
title       Adding GANTT diagram functionality to mermaid
excludes    weekends
%% (\`excludes\` accepts specific dates in YYYY-MM-DD format, days of the week (&quot;sunday&quot;) or &quot;weekends&quot;, but not the word &quot;weekdays&quot;.)

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d

section Critical tasks
Completed task in the critical line :crit, done, 2014-01-06,24h
Implement parser and jison          :crit, done, after des1, 2d
Create tests for parser             :crit, active, 3d
Future task in critical line        :crit, 5d
Create tests for renderer           :2d
Add to mermaid                      :1d

section Documentation
Describe gantt syntax               :active, a1, after des1, 3d
Add gantt diagram to demo page      :after a1  , 20h
Add another diagram to demo page    :doc1, after a1  , 48h

section Last section
Describe gantt syntax               :after doc1, 3d
Add gantt diagram to demo page      :20h
Add another diagram to demo page    :48h</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="饼图" tabindex="-1"><a class="header-anchor" href="#饼图" aria-hidden="true">#</a> 饼图</h2>`,2),N=i('<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">```</span><span class="token code-language">pie</span>\n<span class="token code-block language-pie">title What Voldemort doesn’t have?\n  &quot;FRIENDS&quot; : 2\n  &quot;FAMILY&quot; : 3\n  &quot;NOSE&quot; : 45</span>\n<span class="token punctuation">```</span></span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="git-图表" tabindex="-1"><a class="header-anchor" href="#git-图表" aria-hidden="true">#</a> Git 图表</h2>',2),F=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">git-graph</span>
<span class="token code-block language-git-graph">commit
branch hotfix
checkout hotfix
commit
branch develop
checkout develop
commit id:&quot;ash&quot; tag:&quot;abc&quot;
branch featureB
checkout featureB
commit type:HIGHLIGHT
checkout main
checkout hotfix
commit type:NORMAL
checkout develop
commit type:REVERSE
checkout featureB
commit
checkout main
merge hotfix
checkout featureB
commit
checkout develop
branch featureA
commit
checkout develop
merge hotfix
checkout featureA
commit
checkout featureB
commit
checkout develop
merge featureA
branch release
checkout release
commit
checkout main
commit
checkout release
merge main
checkout develop
merge release</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="c4c-图表" tabindex="-1"><a class="header-anchor" href="#c4c-图表" aria-hidden="true">#</a> C4C 图表</h2>`,2),Q=i(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">c4c</span>
<span class="token code-block language-c4c">title System Context diagram for Internet Banking System

Person(customerA, &quot;Banking Customer A&quot;, &quot;A customer of the bank, with personal bank accounts.&quot;)
Person(customerB, &quot;Banking Customer B&quot;)
Person_Ext(customerC, &quot;Banking Customer C&quot;)
System(SystemAA, &quot;Internet Banking System&quot;, &quot;Allows customers to view information about their bank accounts, and make payments.&quot;)

Person(customerD, &quot;Banking Customer D&quot;, &quot;A customer of the bank, &lt;br/&gt; with personal bank accounts.&quot;)

Enterprise_Boundary(b1, &quot;BankBoundary&quot;) {

  SystemDb_Ext(SystemE, &quot;Mainframe Banking System&quot;, &quot;Stores all of the core banking information about customers, accounts, transactions, etc.&quot;)

  System_Boundary(b2, &quot;BankBoundary2&quot;) {
    System(SystemA, &quot;Banking System A&quot;)
    System(SystemB, &quot;Banking System B&quot;, &quot;A system of the bank, with personal bank accounts.&quot;)
  }

  System_Ext(SystemC, &quot;E-mail system&quot;, &quot;The internal Microsoft Exchange e-mail system.&quot;)
  SystemDb(SystemD, &quot;Banking System D Database&quot;, &quot;A system of the bank, with personal bank accounts.&quot;)

  Boundary(b3, &quot;BankBoundary3&quot;, &quot;boundary&quot;) {
    SystemQueue(SystemF, &quot;Banking System F Queue&quot;, &quot;A system of the bank, with personal bank accounts.&quot;)
    SystemQueue_Ext(SystemG, &quot;Banking System G Queue&quot;, &quot;A system of the bank, with personal bank accounts.&quot;)
  }
}

BiRel(customerA, SystemAA, &quot;Uses&quot;)
BiRel(SystemAA, SystemE, &quot;Uses&quot;)
Rel(SystemAA, SystemC, &quot;Sends e-mails&quot;, &quot;SMTP&quot;)
Rel(SystemC, customerA, &quot;Sends e-mails to&quot;)</span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="许可协议" tabindex="-1"><a class="header-anchor" href="#许可协议" aria-hidden="true">#</a> 许可协议</h2>`,2),R={class:"custom-container warning"},P=e("p",{class:"custom-container-title"},"注意",-1),Y={href:"//shao.fun",target:"_blank",rel:"noopener noreferrer"},O=e("code",null,"shao.fun",-1),U={class:"custom-container info"},J={class:"custom-container-title"},K=v({__name:"use-mermaid-in-markdwon.html",setup(V){const c=b("");return p(()=>{let o=window.setInterval(()=>{const t=document.querySelectorAll(".contributor");t.length>0&&(c.value=Array.from(t).map(d=>d.textContent).join(", "),window.clearInterval(o))})}),(o,t)=>{const d=l("RouterLink"),r=l("ExternalLinkIcon"),a=l("Mermaid");return h(),g("div",null,[y,e("div",q,[f,e("p",null,[s("本文是 "),n(d,{to:"/blog/p/advanced-use-of-markdown.html"},{default:u(()=>[s("进阶使用 Markdown 排版")]),_:1}),s(" 的子内容")])]),e("div",w,[A,S,e("ul",null,[e("li",null,[s("更多使用方法，请参考 "),e("a",C,[s("Mermaid 官网"),n(r)]),s(" ，下面仅举出部分例子")])])]),M,n(a,{id:"mermaid-23",code:"eJxLy8kvT85ILCpRCHHiUgCCZENdXbtEIzC7uDQpvSixIEMhPy8VLJCIJJmal4KqqKQ8HyyQBFKUhEtRRlEqxCywRcmoyoD2KABF4UaBVaOKlOeD+UCNAP9rL9s="}),x,n(a,{id:"mermaid-30",code:"eJxtkL2OwjAQhHueYq4nuR6dcuKnAAp6SicssUXiFfZGCW/POgSQEN1q5tvZn0jXjnxFG2fqYNoZsGxcRciKAisuF9hS03Aq57DcwwTCjbt/BVXLFNuz9Yolr+ROkoukvZDhEbnADqZFzXyCWOMv8WcihpH/7h9YCMHVVsDnidMeJZwSMGjY139l+C1SAXEtzRH5LWuUKE0QGgQnpjjKngVnp6FeMwL3+ex10bTt2lJ1cZrZO7Hj5DzPn//JprOPFFUd3Y//3AGRcm49"}),L,n(a,{id:"mermaid-37",code:"eJxdjcEKwjAMhu99ihwd4gt49qgg7AmClhpw7WziScyzm25hG/ZQyP9/yXd7IvOJMFUcAsA0Qv96Y43aP3CM+rG4PcoCdPfhTCxqicJYmIRK9oKjXIsVvNsiLeicSAvRrWes+wb7ZjMc4TBVLJVyUhgiM6bIW2Jvqovns+yfbsYVN++Cu9kXwg81PVgA"}),B,n(a,{id:"mermaid-44",code:"eJwrLkksSXXJTEwvSszVLTPiUlCI1opV0NW1U3BMLsksS+UCioDVQPkK1UABEIAp8yvN9clPzvZPS4NKIARQ5PMUrBRcy6C8gKLU4uLUFDQdeWgG4tahq4vmCufEgmJUZyCJoKqAOATGRTUXSRGaqXg0YTgmOLkoPycH1TkoYuiqIE5CCKCaj6IQw3ycWmu5AH5fjvM="}),_,n(a,{id:"mermaid-51",code:"eJxLLXLJTEwvSszlUlBwdgxSqKnR1c2vVvBz9HV10XUJ8gxzDVKwUkjMyckvL4YqqQbSIFBcUpSZl65QlJqeCWQmlmTm5/mV5ialFqHK5yZmp6KJ5Kek5gCFaoE4wDUo2N8Ph7WZICuhKtBsTcssKi7xS8xFMzonEUU0M69EITEdxKvlAgC+BkPr"}),E,n(a,{id:"mermaid-58",code:"eJxVzD0OgzAMhuG9p/gO0KWqumRtpU6ZegKrWGB+YpQYIW4PBAFifT77rXWIgacbYGItw08YNTYSShS0cuK/iQZ8FaZ5WxDw1DCMyeHl4DnbcjL0yUhicnge/NneHB4r3fEmu3Yr7Y5AoWPYE2f5J5aX3WYBdjXD"}),D,n(a,{id:"mermaid-65",code:"eJyVU8Fu2zAMvfcrCAMFWsAZ4jQbutyCBB0GrDv1sltViU602lIg0Vvz9yXl2LWTtmh9kkW9x8dHcqMc0RmAUYQ3PtSKAP7wN7m9nazXHCBLFUL7LY2xbgM/lr/v7sBYtQmqhrJxmqx3qrK0B/JQI9NYw1h80lVjMAr2P+IjOhP5+vwcLu672D0orXFHEeIOtS2tTloiWDcQAmXSlnNsH8GXQFtMlHCRxcbxbXYJPkDWpclyeGgInKf2qQ+mDQpB9uXyjHVETMJh2Z34buXrXYWEBkjFx0Pd6VsY7zCXE6sucphNi/lkWkym3/L+eM0MS6b6hydwYVApxBzMMBswfM/hSvy6aagJr0P7E0OvclAlYTjQfD2Czt6BzgdQpmHowIdVsGS1qhKLNOrIDO6IeKm7Z5V1CAv55b4kc4aezLfM8FMIanQEOxUi51XOwF8bOduLwCFDr04clsJWAXkcgCeCR4SnoCMaldgydPaeeMnCx6LHuGTgSZ7AY4RhlGmRFPEWDMb8qFHdy2Lk7NrrRlxQhylbY+TUDwhp/SDuOfT01rQotmJoSypPRLTgbg9ZksHasz+bQ4GLFqUKAGmN9ENgipdiK2xvAHnQdZ+yBc+vt8NyfqnIovud+Vg1bQWJ+uMVfEK1aHwGRAxmlw=="}),I,n(a,{id:"mermaid-72",code:"eJwryEzlUlAoySzJSVUIz0gsUQjLz0lJzc0vKlFIyU8tznvUMLNEISOxLNUeqExBQcktyNPVzyVYScFKwQgq4ujr6RMJEjCGCPj5B7uCuCamXAB+DBmY"}),N,n(a,{id:"mermaid-79",code:"eJyNUUEOgjAQvPuKhmdww4SACWqCxnspC22klJRi9Pci1bAiFg5NNrMzs5NpKUykacM3hDAlpTD9kGlaM064MoW4vxYc2FV1BiETag43qFSDuQgayETkvkdb7hFDy37KmDfqC6Cm07DFBhizDubRgB/vojjp3xlzJRW1I6hVHo7pPkicGQdeGl7C9BQ6s8wcl6BLmCnNqR0TfDcRLLAXjs3LVyax3sjpHU1DBbQFLELQv1p+F6PIXpp+3jTJh/8EoXrlcg=="}),F,n(a,{id:"mermaid-86",code:"eJytlMFu2zAMhu99CiKnFMg2rN1xGBDHbrFDgG7pzgXtMIlQWwokeUkw9N1HybKtxN6Gbb3YEP2J/PmL1uLDQklLR3sFYIUtCVYnY6mCEIa1wK3GCjZKw2cOaUkWEpTPQm4De8V7H0gbJadFbayqSM9nMGmhRYjBfMLRObQMqA3YHUHO3AwOwu5g77Ng6WOARaFqac3byfWwQjJWIYnIp+xoO3oxRi883fQwbV5zJ/wXbXr1ZakOpmvBgFXwXdABhGSDKrRCScBc1da1JvR5IzNAuYYKnwn2eKoo9DZsLh2Tm/7Ovo+5fvfpTyZyocz1ttfC0FPC8TXq0zR/H8q1kck1/HBwa06aezObRcbwErlfngoasWhllSYDWJatwoIDXowDh0Z1ZrI9nVFWozRYOIxXZIugv5UUqb+5UH/j5Tv08nAjV8OUz/0IDMh4uAKZNO6bZvV3owvwcqa9N9PNZfamQlGGzK7KI2cWfgY53VIUWhm1sZAdix3KLQHFG9oK7UmFxPEEhQ5SSNFijob+uRVfqXf+9sL5W5eYz7QfotjbLzXVFOTdDeXdgQf+y+azUpHN98Ny969Q7oWf/mQT8ZXK+PKLbpNvhoznG6j/0v9OHTIGuBFZkVybcO7G/2TLx4eLHczFt+/ZFr6mmP4Juk31kg=="}),Q,e("div",R,[P,e("p",null,[s("本站所有内容均使用 MIT 协议，请遵守 "),n(d,{to:"/LICENSE.html"},{default:u(()=>[s("此协议")]),_:1}),s(" 。转载请标明出处："),e("a",Y,[O,n(r)])])]),e("div",U,[e("p",J,"Copyright © 2019-"+m(new Date().getFullYear())+" "+m(c.value),1)])])}}}),G=k(K,[["__file","use-mermaid-in-markdwon.html.vue"]]);export{G as default};
