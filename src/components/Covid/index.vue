<!-- covid页面的内部主要组件 数据展示-->
<template>
  <div>
    <h1><center>数据展示页面</center></h1>
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
