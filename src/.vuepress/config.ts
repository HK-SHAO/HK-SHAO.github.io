import { defineUserConfig } from 'vuepress';
import { heads } from './configs/heads';
import { plugins } from './configs/plugins';
import { theme } from './configs/theme';

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'HK-SHAO',
  description: '烧风的个人主页',
  head: heads,
  plugins: plugins,
  theme: theme,
})