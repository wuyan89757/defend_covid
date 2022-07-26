<template>
  <div class="map-container">
    <div ref="mapchart_ref" class="map-chart"></div>
  </div>
</template>

<script>
require('@/styles/echartstheme/chalk')
// import Axios from 'axios'
import { getArea, getMap } from '@/api/covid'
export default {
  data() {
    return {
      params: {
        country: '中国',
        sort: 'confirmedCount'
      },
      chartInstance: null
    }
  },
  mounted() {
    // sessionStorage.setItem('time', '')
    // console.log('挂载完成')
    this.initChart()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    getNow() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const dates = date.getDate()
      const now = year + '年' + month + '月' + dates + '日 '
      return now
    },
    // 初始化图表实例对象
    async initChart() {
      // this.chartInstance = this.$echarts.init(this.$refs.mapchart_ref, 'chalk')
      this.chartInstance = this.$echarts.init(this.$refs.mapchart_ref)
      this.chartInstance.showLoading()
      // 地图数据http://localhost:9528/json/china.json
      const ret = await getMap()
      // console.log('注册图表')
      this.$echarts.registerMap('china', ret.data)
      const initOption = {
        title: {
          text: '▎现存确诊',
          left: 20,
          top: 20,
          textStyle: {
            color: 'black'
          }
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          label: {
            show: false // 默认不展示标签
          },
          itemStyle: {
            borderWidth: 2, // 设置外层边框
            borderColor: '#f8911b'
          }
        }
      }
      this.chartInstance.setOption(initOption)
      // console.log('初始化完成')
      this.getData(this.params)
    },
    // 获取数据
    // 对this.allData赋值后调用updatechart更新图表
    async getData(params) {
      // localStorage.clear()
      const now = this.getNow()
      // console.log(typeof now, typeof sessionStorage.getItem('time'))
      // console.log(now, sessionStorage.getItem('time'))
      // console.log(now !== sessionStorage.getItem('time'))
      if (now !== sessionStorage.getItem('time')) {
        // this.$localStorage.set('time', now)

        await getArea(params).then(res => {
          // console.log(res, 'getArea')
          if (res.data.success) {
            // 返回结果第一行是全国数据要切掉
            const data = res.data.results.slice(1, 35).map(item => {
              return {
                name: item.provinceShortName,
                value: item.currentConfirmedCount
              }
            })
            sessionStorage.setItem('data', JSON.stringify(data))
            sessionStorage.setItem('time', now)
            // this.$localStorage.set('data', data)
            // console.log(111)
            // console.log(
            //   JSON.parse(sessionStorage.getItem('data')) === data,
            //   // sessionStorage.getItem('data', JSON.parse(data)),
            //   typeof JSON.parse(sessionStorage.getItem('data'))
            // )
            // console.log(SeriesArr_chinaarea, 'SeriesArr_chinaarea')
          }
          // console.log('数据切片完成，存入local')
          // console.log(JSON.parse(sessionStorage.getItem('data')), '数据切片')
        })
      }
      this.updateChart(JSON.parse(sessionStorage.getItem('data')))
      // console.log('数据发送给图表完成')
      this.chartInstance.hideLoading()
    },
    // 更新图表
    updateChart(arr) {
      // console.log('数据更新前')
      // arr.push({ name: '南海诸岛', value: 0 })
      const dataOption = {
        geo: {
          type: 'map',
          map: 'china',
          emphasis: {
            label: {
              show: true
            }
          },
          label: {
            position: 'inside',
            fontSize: 15,
            show: false // 默认展示标签
          }
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2
        },
        toolbox: {
          show: true,
          // orient: 'vertical',
          left: 'center',
          top: 'top',
          feature: {
            dataView: { readOnly: true },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            data: arr,
            name: '现存确诊人数',
            geoIndex: 0, // 将确诊人数的数据和第0个geo配置关联在一起
            type: 'map',
            itemStyle: {
              borderColor: '#a18a3a',
              borderWidth: 1,
              borderType: 'dashed'
            }
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
          textStyle: {
            fontSize: 15
          }
          // calculable: true // 出现滑块
        }
      }
      // console.log('数据填入地图')
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.mapchart_ref.offsetWidth / 100) * 3
      const adaptOption = {
        title: {
          textStyle: { fontSize: titleFontSize }
        }
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    }
  }
}
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 70%;
  .map-chart {
    width: 100%;
    height: 100%;
    border: 1px;
  }
}
</style>
