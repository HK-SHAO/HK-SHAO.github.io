export const profile = {
  name: "烧风",
  alias: "HK-SHAO",
  summary: "AI Agent、软件、视觉交互",
  introduction: "关注 AI Agent、图形、数学与互联网技术",
  interests: ["AI", "Graphics", "DSP", "Math", "Web"],
} as const;

export type TimelineItem = {
  period: string;
  title: string;
  detail?: string;
  place: "job" | "campus";
};

export const roles: TimelineItem[] = [
  { place: "job", period: "2025.10 — 至今", title: "字节跳动", detail: "AI 生视频与创意特效玩法工作流" },
  { place: "job", period: "2024.07 — 2025.10", title: "腾讯", detail: "智能体平台与多智能体工作流（Owner）" },
  { place: "job", period: "2023.07 — 2024.02", title: "腾讯 PCG · 实习", detail: "智能体方向，留用答辩第一名" },
  { place: "job", period: "2023.01 — 2023.04", title: "腾讯 PCG · 实习", detail: "大模型评测与观测平台（Owner）" },
  { place: "campus", period: "2022.09 — 2023.06", title: "SCNU 软件协会 · 会长", detail: "同年创建并主持椰风游戏开发社" },
  { place: "job", period: "2022.07 — 2022.09", title: "Cocos（厦门雅基软件）· 实习", detail: "内容研发部与市场部，游戏优化、原型开发与社区生态" },
  { place: "job", period: "2022.01 — 2022.03", title: "腾讯 PCG · 实习", detail: "社交平台开发组，技术研发" },
  { place: "campus", period: "2021.09 — 2022.06", title: "SCNU 软件协会技术部 · 部长", detail: "搭建解密平台，开设讲座与课程" },
  { place: "job", period: "2021.07 — 2021.09", title: "腾讯 CSIG · 实习", detail: "技术研发" },
  { place: "campus", period: "2020.09 — 2024.06", title: "华南师范大学", detail: "人工智能学院 · 软件工程" },
];

export const jobs = roles.filter((item) => item.place === "job");

export const awards = [
  { value: "全国一等奖", label: "腾讯 × 清华高校微信小程序应用开发赛 · 游戏类第一名（2021）" },
  { value: "全球三等奖", label: "华为 ICT 大赛创新赛 · 全国一等奖（2022）" },
  { value: "全球第一名", label: "Taichi Hackathon 高性能计算黑客松（2023）" },
  { value: "最佳玩法奖", label: "CUSGA 中国大学生游戏开发创作大赛（2022）" },
];

export const skills = [
  { period: "语言", title: "TypeScript、Python、Java、C#、Go、Moonbit、Lua、GLSL / HLSL、SQL", detail: "从前端与客户端到服务端与着色器" },
  { period: "客户端", title: "Android、Electron、Tauri、Flutter", detail: "跨端桌面与移动应用" },
  { period: "服务与数据", title: "Node.js、Bun、React、Vue、Svelte、PostgreSQL、MySQL、Redis、MongoDB", detail: "前后端、实时通信与数据存储" },
  { period: "图形与游戏", title: "Godot、Unity、Cocos、WebGL、Taichi", detail: "实时渲染、路径追踪与交互原型" },
  { period: "平台与工程", title: "Docker、Kubernetes、CI / CD、可观测性", detail: "构建、发版与线上运维" },
  { period: "文档与写作", title: "Markdown、MDX、LaTeX、Typst", detail: "技术写作与可视化表达" },
];
