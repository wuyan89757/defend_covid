<!-- covid页面的内部主要组件 数据展示-->
<template>
  <div class="app-container">
    <rankchart />
  </div>
</template>

<script>
// import ChinaMapVue from './ChinaMap.vue'
import rank_ChartVue from './rank_Chart.vue'

export default {
  components: {
    // chinamap: ChinaMapVue,
    rankchart: rank_ChartVue
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
