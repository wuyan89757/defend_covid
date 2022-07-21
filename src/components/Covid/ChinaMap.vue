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
      chartInstance: null,
      allData: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化图表实例对象
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.mapchart_ref)
      // 地图数据http://localhost:9528/json/china.json
      const ret = await Axios.get('http://localhost:9528/json/china.json')
      // console.log(ret)
      // console.log(ret.data)
      this.$echarts.registerMap('china', ret.data)
      const initOption = {
        geo: {
          type: 'map',
          map: 'china',
          label: {
            show: false // 默认不展示标签
          }
        }
      }
      this.chartInstance.setOption(initOption)
    },
    // 获取数据
    // 对this.allData赋值后调用updatechart更新图表
    getData() {
      this.updateChart()
    },
    // 更新图表
    updateChart() {
      const dataOption = {}
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      const adaptOption = {}
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    }
  }
}
</script>

<style>
.map-container {
  left: 500px;
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
