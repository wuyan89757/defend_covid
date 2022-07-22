<!-- covid页面的内部主要组件 数据展示-->
<template>
  <div class="app-container">
    <chinamap />
  </div>
</template>

<script>
import ChinaMapVue from './ChinaMap.vue'

export default {
  components: {
    chinamap: ChinaMapVue
  }
}
</script>
<style scoped lang="scss">
// .app-container {
//   h1 {
//     text-align: center;
//   }
// }
</style>
