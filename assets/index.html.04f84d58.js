import{e as c,g as l,l as m,r as p,o as u,c as h,a as n,d as _,w as g,b as i,_ as f}from"./app.d9ef6744.js";const v=n("h1",{id:"glsl-编辑器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#glsl-编辑器","aria-hidden":"true"},"#"),i(" GLSL 编辑器")],-1),b={class:"custom-container info"},w=n("p",{class:"custom-container-title"},"相关信息",-1),x=n("div",{class:"custom-container warning"},[n("p",{class:"custom-container-title"},"注意"),n("p",null,"由于本页面需要，请使用更宽的屏幕（横向像素大于 719 ）查看本页面哦")],-1),y=c({__name:"index.html",setup(C){let r=[];function a(o,t){if(document){const e=document.createElement("script");e.type="text/javascript",e.src=o,document.body.appendChild(e),t&&e.addEventListener("load",t),r.push(e)}}function s(o,t){if(document){const e=document.createElement("link");e.type="text/css",e.rel="stylesheet",e.href=o,document.body.appendChild(e),t&&e.addEventListener("load",t),r.push(e)}}function d(o){if(window.document){const t=window.document.createElement("style");t.innerHTML=o,document.body.appendChild(t),r.push(t)}}return l(()=>{const o=Math.min(window.innerWidth,window.innerHeight);if(o<719)return;function t(){new GlslEditor(".page",{canvas_width:o*2/3,canvas_height:o*(2/3)**2,canvas_draggable:!1,theme:"monokai",canvas_follow:!0,multipleBuffers:!1,watchHash:!0,fileDrops:!0,menu:!1,lineWrapping:!0})}document.querySelector(".page").innerHTML="",d(`
        .ge_editor {
            background-color: inherit !important;
        }
        .CodeMirror-gutters {
            background-color: inherit !important;
            border-right: 1px solid var(--c-border) !important;
        }
        .CodeMirror {
            background-color: inherit !important;
            color: inherit !important;
            margin-top: 0 !important;
            font-weight: bold !important;
            z-index: inherit !important;
        }
        .ge_canvas_container {
            position: absolute !important;
            z-index: 1 !important;
            padding-top: var(--navbar-height) !important;
        }
        .CodeMirror-cursor {
            border-left: 2px solid #3aa675 !important;
        }
        .ge_picker_modal {
            display: none !important;
        }
        .cm-s-monokai span.cm-variable {
            color: inherit !important;
        }
        .cm-s-monokai .CodeMirror-matchingbracket {
            color: #3aa675 !important;
        }
        .CodeMirror-selected {
            background: #3aa675aa !important;
        }
    `),s("/thirdparty/glsl-editor/glslEditor.css",()=>{if(typeof GlslEditor<"u"){t();return}a("/thirdparty/glsl-editor/glslEditor.min.js",()=>{t()})})}),m(()=>{r.forEach(o=>{document.body.removeChild(o)}),document.querySelector(".page").innerHTML=""}),(o,t)=>{const e=p("RouterLink");return u(),h("div",null,[v,n("div",b,[w,n("p",null,[_(e,{to:"/blog/w/glsl-canvas-and-editor.html"},{default:g(()=>[i("GLSL Canvas and Editor")]),_:1})])]),x])}}}),E=f(y,[["__file","index.html.vue"]]);export{E as default};
