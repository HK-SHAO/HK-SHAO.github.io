# 许可协议

## 许可协议

:::: warning

本站所有内容均使用 MIT 协议，请遵守 [此协议](../LICENSE.md) 。转载请标明出处：[`shao.fun`](//shao.fun)

::::

:::: info Copyright © 2019-{{new Date().getFullYear()}} {{names}}
::::


<script setup lang="ts">
import { onMounted, ref } from "vue";

const names = ref('');

onMounted(() => {
  let int = window.setInterval(() => {
    const contributors = document.querySelectorAll('.contributor')
    if (contributors.length > 0) {
        names.value = Array.from(contributors).map((contributor) => {
            return contributor.textContent;
        }).join(', ');
        window.clearInterval(int);
    }
  });
});

</script>
