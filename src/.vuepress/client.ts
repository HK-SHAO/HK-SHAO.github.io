import { defineClientConfig } from "@vuepress/client";
// @ts-ignore
import Layout from "./layouts/Layout.vue";
// @ts-ignore
import NotFound from './layouts/NotFound.vue';

export default defineClientConfig({
    layouts: {
        Layout,
        NotFound,
    },
});