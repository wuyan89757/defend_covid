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
import { getArea } from '@/api/covid'
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
      this.chartInstance.showLoading()
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
      this.params = {
        country: '中国',
        sort: 'confirmedCount' // 按确诊排序(可能出现乱码)
      }
      getArea(this.params).then(res => {
        // console.log(res, 'getArea')
        if (res.data.success) {
          // 返回结果第一行是全国数据要切掉
          this.allData = res.data.results.slice(1, 35)
          this.chartInstance.hideLoading()
          // console.log(this.allData)
          const SeriesArr_chinaarea = this.allData.map(item => {
            return {
              name: item.provinceShortName,
              value: item.currentConfirmedCount
            }
          })
          console.log(SeriesArr_chinaarea, 'SeriesArr_chinaarea')
          this.updateChart(SeriesArr_chinaarea)
        }
      })
    },
    // 更新图表
    updateChart(seriesArr) {
      const dataOption = {
        geo: {
          type: 'map',
          map: 'china',
          label: {
            show: true // 默认展示标签
          }
        },
        toolbox: {
          show: true,
          // orient: 'vertical',
          left: 'right',
          top: 'top',
          feature: {
            dataView: { readOnly: true },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            data: seriesArr,
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: 'map'
          }
        ],
        visualMap: {
          type: 'piecewise',
          left: 'left',
          pieces: [
            { gte: 10000, color: 'black' },
            { gte: 1000, lte: 10000, color: '#B03060' },
            { gte: 500, lte: 999, color: '#FF0000' },
            { gte: 100, lte: 499, color: '#FF7F50' },
            { gte: 10, lte: 99, color: '#FFFFCD' },
            { gte: 1, lte: 9, color: '#FAEBD7' },
            { value: 0, color: 'white' } // [0, 0]
          ],
          calculable: true // 出现滑块
        }
      }
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
  left: 300px;
  top: 50px;
  width: 800px;
  height: 650px;
  background-color: skyblue;
  border: 1px;
  position: relative;
}

.map-chart {
  width: 600px;
  height: 500px;
  border: 1px;
}
</style>
