import{e as m,f as q,g as b,r as u,o as h,c as p,a as n,b as e,d as i,w as c,t as v,h as l,_ as g}from"./app.d9ef6744.js";const E=n("h1",{id:"使用-echarts-图表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用-echarts-图表","aria-hidden":"true"},"#"),e(" 使用 Echarts 图表")],-1),k={class:"custom-container tip"},B=n("p",{class:"custom-container-title"},"提示",-1),_={class:"custom-container info"},A=n("p",{class:"custom-container-title"},"相关信息",-1),w=n("p",null,"Echats 是一个开源的的 Web 可视化框架，借助它你可以可视化流程、关系和数据",-1),y={href:"https://echarts.apache.org/zh/index.html",target:"_blank",rel:"noopener noreferrer"},f=n("h2",{id:"折线图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#折线图","aria-hidden":"true"},"#"),e(" 折线图")],-1),x=l(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: echarts 一个折线图案例

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span>
<span class="token code-block language-json">{
  &quot;xAxis&quot;: {
    &quot;type&quot;: &quot;category&quot;,
    &quot;data&quot;: [&quot;Mon&quot;, &quot;Tue&quot;, &quot;Wed&quot;, &quot;Thu&quot;, &quot;Fri&quot;, &quot;Sat&quot;, &quot;Sun&quot;]
  },
  &quot;yAxis&quot;: {
    &quot;type&quot;: &quot;value&quot;
  },
  &quot;series&quot;: [
    {
      &quot;data&quot;: [150, 230, 224, 218, 135, 147, 260],
      &quot;type&quot;: &quot;line&quot;
    }
  ]
}</span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="柱状图" tabindex="-1"><a class="header-anchor" href="#柱状图" aria-hidden="true">#</a> 柱状图</h2>`,2),V=l(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: echarts 一个柱状图案例

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span>
<span class="token code-block language-json">{
  &quot;xAxis&quot;: {
    &quot;type&quot;: &quot;category&quot;,
    &quot;data&quot;: [&quot;Mon&quot;, &quot;Tue&quot;, &quot;Wed&quot;, &quot;Thu&quot;, &quot;Fri&quot;, &quot;Sat&quot;, &quot;Sun&quot;]
  },
  &quot;yAxis&quot;: {
    &quot;type&quot;: &quot;value&quot;
  },
  &quot;series&quot;: [
    {
      &quot;data&quot;: [120, 200, 150, 80, 70, 110, 130],
      &quot;type&quot;: &quot;bar&quot;,
      &quot;showBackground&quot;: true,
      &quot;backgroundStyle&quot;: {
        &quot;color&quot;: &quot;rgba(180, 180, 180, 0.2)&quot;
      }
    }
  ]
}</span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="饼图" tabindex="-1"><a class="header-anchor" href="#饼图" aria-hidden="true">#</a> 饼图</h2>`,2),S=l(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: echarts 一个基础南丁格尔玫瑰图案例

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span>
<span class="token code-block language-json">{
  &quot;legend&quot;: {
    &quot;top&quot;: &quot;bottom&quot;
  },
  &quot;toolbox&quot;: {
    &quot;show&quot;: true,
    &quot;feature&quot;: {
      &quot;mark&quot;: {
        &quot;show&quot;: true
      },
      &quot;dataView&quot;: {
        &quot;show&quot;: true,
        &quot;readOnly&quot;: false
      },
      &quot;restore&quot;: {
        &quot;show&quot;: true
      },
      &quot;saveAsImage&quot;: {
        &quot;show&quot;: true
      }
    }
  },
  &quot;series&quot;: [
    {
      &quot;name&quot;: &quot;Nightingale Chart&quot;,
      &quot;type&quot;: &quot;pie&quot;,
      &quot;radius&quot;: [20, 100],
      &quot;center&quot;: [&quot;50%&quot;, &quot;50%&quot;],
      &quot;roseType&quot;: &quot;area&quot;,
      &quot;itemStyle&quot;: {
        &quot;borderRadius&quot;: 8
      },
      &quot;data&quot;: [
        {
          &quot;value&quot;: 40,
          &quot;name&quot;: &quot;rose 1&quot;
        },
        {
          &quot;value&quot;: 38,
          &quot;name&quot;: &quot;rose 2&quot;
        },
        {
          &quot;value&quot;: 32,
          &quot;name&quot;: &quot;rose 3&quot;
        },
        {
          &quot;value&quot;: 30,
          &quot;name&quot;: &quot;rose 4&quot;
        },
        {
          &quot;value&quot;: 28,
          &quot;name&quot;: &quot;rose 5&quot;
        },
        {
          &quot;value&quot;: 26,
          &quot;name&quot;: &quot;rose 6&quot;
        },
        {
          &quot;value&quot;: 22,
          &quot;name&quot;: &quot;rose 7&quot;
        },
        {
          &quot;value&quot;: 18,
          &quot;name&quot;: &quot;rose 8&quot;
        }
      ]
    }
  ]
}</span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="散点图" tabindex="-1"><a class="header-anchor" href="#散点图" aria-hidden="true">#</a> 散点图</h2>`,2),M=l(`<details class="custom-container details"><summary>查看 Markdown 代码</summary><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: echarts 一个散点图案例

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">json</span>
<span class="token code-block language-json">{
  &quot;xAxis&quot;: {},
  &quot;yAxis&quot;: {},
  &quot;series&quot;: [
    {
      &quot;symbolSize&quot;: 20,
      &quot;data&quot;: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      &quot;type&quot;: &quot;scatter&quot;
    }
  ]
}</span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="许可协议" tabindex="-1"><a class="header-anchor" href="#许可协议" aria-hidden="true">#</a> 许可协议</h2>`,2),W={class:"custom-container warning"},C=n("p",{class:"custom-container-title"},"注意",-1),J={href:"//shao.fun",target:"_blank",rel:"noopener noreferrer"},F=n("code",null,"shao.fun",-1),j={class:"custom-container info"},z={class:"custom-container-title"},N=m({__name:"use-echarts-in-markdown.html",setup(Q){const t=q("");return b(()=>{let o=window.setInterval(()=>{const d=document.querySelectorAll(".contributor");d.length>0&&(t.value=Array.from(d).map(s=>s.textContent).join(", "),window.clearInterval(o))})}),(o,d)=>{const s=u("RouterLink"),r=u("ExternalLinkIcon"),a=u("ECharts");return h(),p("div",null,[E,n("div",k,[B,n("p",null,[e("本文是 "),i(s,{to:"/blog/p/advanced-use-of-markdown.html"},{default:c(()=>[e("进阶使用 Markdown 排版")]),_:1}),e(" 的子内容")])]),n("div",_,[A,w,n("ul",null,[n("li",null,[e("更多使用方法，请参考 "),n("a",y,[e("Echarts 官网"),i(r)]),e(" ，下面仅举出部分例子")])])]),f,i(a,{id:"echarts-23",config:"eJyr5lJQUKpwrMgsVrJSAHGA3JLKglQgTyk5sSQ1Pb+oUkkHIp6SWJIIFI9W8s3PU9JRUAopTQVR4akpYF5GKYhyK8oEUcGJJWCqNE8pFqi7FmSEUiV2e8oSc4AmwVUVpxZlpoKURYOVQRQjWW9oaqCjYGQMIoxMgIShhY6CobEpkDAxB3LNDGIh7kWyISczD2wB0AogGctVywUA9j06jQ==",title:"%E4%B8%80%E4%B8%AA%E6%8A%98%E7%BA%BF%E5%9B%BE%E6%A1%88%E4%BE%8B"}),x,i(a,{id:"echarts-32",config:"eJxtT7EOgjAQ3fmK5iZNiAGM0bjp4OaEiQNhKNAAkVBTWqUx/Lt3RZHBJn0vr3f3Xu/lMQb9oa872DMSKLW9C1SQcy1KqSz443vBNcf3BM6yBZ/BxQiiqyicqgzRSdVEMdeOTAspTg9kAfZ/zoM36DR1dULVgtoS1zY2z+LDKPBZFCCEG4Qd3i2JkGAdpONvZ/4ZV58VyL2SzyPPb6WSpi2wrJURUzWbKrG2DU1/47GYy0YqMlRlxhchBf8gWEVL2oHO4Jgw9QbvDfcaVXI=",title:"%E4%B8%80%E4%B8%AA%E6%9F%B1%E7%8A%B6%E5%9B%BE%E6%A1%88%E4%BE%8B"}),V,i(a,{id:"echarts-41",config:"eJyVk71ugzAUhfc8hWWpWwZCfhp1qzp1aaW26lJluCk3YNVgZF/SoirvXtslQH4gYcHce44/+9jwO2KMS4wxi/gdc5WtSeW24GtFpFJue7uxs5FScq1+Gp9J1LetSBfoDLazQaBCY22xrRT0V6s+nFY1Pd9rERC8C3T6+Rl7p+1qhOg5k6VVNiDNKUyjIXWwmwurG9jivXlMIb48yY/u+X84BrVAYz0fXqjjZ5A6Fn8ScUIii0Eie0hAE69XpTL3llxg09QQicLzwmDMJkGwqqVPzAi1k/g8uOFj5odG18rgW8UEe0gNVBCmr1TKo3RrpSPUL/sVl2dvpY7WjufVLcjCEWdBczmt5G47bOI+oyNsB2a67MaEAzBhN2Y6ANMTanY9JuwJNR+AWXRjFgMwPWdzez1m0hNq2cJUb6v6l1mNdqM/icX4bQ==",title:"%E4%B8%80%E4%B8%AA%E5%9F%BA%E7%A1%80%E5%8D%97%E4%B8%81%E6%A0%BC%E5%B0%94%E7%8E%AB%E7%91%B0%E5%9B%BE%E6%A1%88%E4%BE%8B"}),S,i(a,{id:"echarts-50",config:"eJxtkj1uwzAMhXefgtAsEPqX3K1n6Bh4cFsPBlq0iD3EDXz3kkobhEo0COCnp8dHQecOQJ2eT/OinuC8ay43WS7TcZ64PlAFwDd4qWX7fP36eJl/JjpzhrWVv4/reFXzOliDRkNBE4Z/FVGqs4aEfbyl1rM2Yyy3tEcT2aFYobUXX+8FDReHlBrfwN0ah5osPXQo2EsHh5SBHJxMZolmFJCC3UMazGsI6GQvh46lRVCHhmjAkIW2voJv0lJYoqFJm2o3iiDenLrVeV07WZ23CG1GUzTEZt5Yk0VMZfiD11O1bt/8F9TyNq7rdFSV77QP3d79Ahlkc/0=",title:"%E4%B8%80%E4%B8%AA%E6%95%A3%E7%82%B9%E5%9B%BE%E6%A1%88%E4%BE%8B"}),M,n("div",W,[C,n("p",null,[e("本站所有内容均使用 MIT 协议，请遵守 "),i(s,{to:"/LICENSE.html"},{default:c(()=>[e("此协议")]),_:1}),e(" 。转载请标明出处："),n("a",J,[F,i(r)])])]),n("div",j,[n("p",z,"Copyright © 2019-"+v(new Date().getFullYear())+" "+v(t.value),1)])])}}}),T=g(N,[["__file","use-echarts-in-markdown.html.vue"]]);export{T as default};
