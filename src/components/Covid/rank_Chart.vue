<template>
  <div class="rankchart-container">
    <button @click="classSwitch(0)">累计确诊</button>
    <div
      ref="rankchart_ref"
      class="rank-chart"
    >排名柱状图</div>
  </div>
</template>

<script>
require('@/styles/echartstheme/vintage')
import { getArea } from '@/api/covid'
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      ArrName: [],
      ArrValue: [],
      ArrValue0: [],
      ArrValue1: [],
      ArrValue2: [],
      ArrClass: 0, // 0：累计确诊；1：累计治愈；2：累计死亡
      zoomStartValue: 0, // 区域缩放起止点
      zoomEndValue: 9,
      timeId: null
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
    clearInterval(this.timeId)
  },
  methods: {
    // 初始化图表实例对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rankchart_ref, 'vintage')
      const initOption = {
        title: {
          text: '▎全国省级行政区累计确诊排行',
          left: 20,
          top: 20
        },
        grid: {
          top: '10%',
          left: '5%',
          right: '5%',
          containLabel: true
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 18
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'log', // 各省数据差异悬殊，用对数处理
          axisLabel: {
            formatter: function (value) {
              return value === 0.1 ? 0 : value
            }
          }
        },
        series: [
          {
            type: 'bar',
            barMinHeight: 10
          }
        ]
      }
      this.chartInstance.showLoading()
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 获取数据
    // 对this.allData赋值后调用updatechart更新图表
    getData() {
      this.params = {
        country: '中国',
        sort: 'confirmedCount' // 按累计确诊排序
      }
      getArea(this.params).then(res => {
        // console.log(res, 'getArea')
        if (res.data.success) {
          // 返回结果第一行是全国数据要切掉
          this.allData = res.data.results.slice(1, 35)
          this.chartInstance.hideLoading()
          // console.log(this.allData)
          // console.log(this.allData.length)
          this.ArrName = this.allData.map(item => {
            return item.provinceShortName
          })
          this.ArrValue0 = this.allData.map(item => {
            return item.confirmedCount
          })
          this.ArrValue1 = this.allData.map(item => {
            return item.curedCount
          })
          this.ArrValue2 = this.allData.map(item => {
            return item.deadCount
          })
          this.ArrValue = this.ArrValue0
          // console.log(provincename_currentconfirmed, 'provincename_currentconfirmed')
          this.updateChart(this.ArrName, this.ArrValue, this.ArrClass)
          this.startInterval()
        }
      })
    },
    // 更新图表
    updateChart(name, value, dataclass) {
      // console.log(value, 'value')
      const fixed_value = []
      value.forEach(item => {
        fixed_value.push(item == 0 ? 0.1 : item)
      }) // 修0
      // console.log(fixed_value, 'fixed_value')
      const colorArr = [
        ['#FF0000', '#F5DEB3'], // 红色
        ['#FFD700', '#FFFFE0'], // 金色
        ['#2E8B57', '#54FF9F'] // 绿色
      ]
      let targetColor = null
      const dataOption0 = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let html = params[0].name
            params.forEach((item, index) => {
              html += `<br/>${item.marker + item.seriesName}: ${
                item.value === 0.1 ? 0 : item.value
              }`
            })
            return html
          }
        },

        xAxis: {
          data: name
        },
        dataZoom: {
          show: false,
          startValue: this.zoomStartValue,
          endValue: this.zoomEndValue
        },
        series: [
          {
            data: value,
            name: '累计确诊人数',
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            itemStyle: {
              color: arg => {
                if (arg.value > 10000) {
                  targetColor = colorArr[0]
                } else if (arg.value > 1000) {
                  targetColor = colorArr[1]
                } else {
                  targetColor = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColor[0]
                  },
                  {
                    offset: 1,
                    color: targetColor[1]
                  }
                ])
              }
            }
          }
        ]
      }
      const dataOption1 = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let html = params[0].name
            params.forEach((item, index) => {
              html += `<br/>${item.marker + item.seriesName}: ${
                item.value === 0.1 ? 0 : item.value
              }`
            })
            return html
          }
        },

        xAxis: {
          data: name
        },
        dataZoom: {
          show: false,
          startValue: this.zoomStartValue,
          endValue: this.zoomEndValue
        },
        series: [
          {
            data: value,
            name: '累计确诊人数',
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            itemStyle: {
              color: arg => {
                if (arg.value > 10000) {
                  targetColor = colorArr[0]
                } else if (arg.value > 1000) {
                  targetColor = colorArr[1]
                } else {
                  targetColor = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColor[0]
                  },
                  {
                    offset: 1,
                    color: targetColor[1]
                  }
                ])
              }
            }
          }
        ]
      }
      const dataOption2 = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let html = params[0].name
            params.forEach((item, index) => {
              html += `<br/>${item.marker + item.seriesName}: ${
                item.value === 0.1 ? 0 : item.value
              }`
            })
            return html
          }
        },

        xAxis: {
          data: name
        },
        dataZoom: {
          show: false,
          startValue: this.zoomStartValue,
          endValue: this.zoomEndValue
        },
        series: [
          {
            data: value,
            name: '累计确诊人数',
            label: {
              show: true,
              position: 'top',
              valueAnimation: true
            },
            itemStyle: {
              color: arg => {
                if (arg.value > 10000) {
                  targetColor = colorArr[0]
                } else if (arg.value > 1000) {
                  targetColor = colorArr[1]
                } else {
                  targetColor = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColor[0]
                  },
                  {
                    offset: 1,
                    color: targetColor[1]
                  }
                ])
              }
            }
          }
        ]
      }
      const dataOptionArr = [dataOption0, dataOption1, dataOption2]
      this.chartInstance.setOption(dataOptionArr[dataclass])
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.rankchart_ref.offsetWidth / 100) * 5
      // console.log(titleFontSize)
      const adaptOption = {
        title: {
          textStyle: { fontSize: titleFontSize / 2 }
        },
        xAxis: {
          nameTextStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.zoomStartValue++
        this.zoomEndValue++
        if (this.zoomEndValue > this.ArrName.length - 1) {
          this.zoomStartValue = 0
          this.zoomEndValue = 9
        }
        this.updateChart(this.ArrName, this.ArrValue, this.ArrClass)
      }, 1500) // 每1.5s一次执行
    },
    classSwitch(classNumber) {
      console.log('类别已转换：', classNumber)
      this.ArrClass = classNumber
    }
  }
}
</script>

<style>
.rankchart-container {
  margin: 0 auto;
  width: 800px;
  height: 650px;
  background-color: skyblue;
}
.rank-chart {
  width: 100%;
  height: 90%;
  bottom: 0%;
  border: 1px;
}
</style>
