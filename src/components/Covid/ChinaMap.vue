<template>
  <div class="map-container">
    <div
      ref="mapchart_ref"
      class="map-chart"
    >地图</div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      chartInstance: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
  },
  methods: {
    // 初始化图表实例对象
    async initChart() {
      this.chartInstance = echarts.init(this.$refs.mapchart_ref)
      // 地图数据http://localhost:9528/json/china.json
      const ret = await Axios.get('http://localhost:9528/json/china.json')
      console.log(ret)
    },
    // 获取数据
    getData() {
      this.updateChart()
    },
    // 更新图表
    updateChart() {}
  }
}
</script>

<style>
.map-container {
  left: 347px;
  top: 50px;
  background-color: skyblue;
  border: 1px;
  position: relative;
}

.map-chart {
  width: 800px;
  height: 346px;
  border: 1px;
}
</style>
