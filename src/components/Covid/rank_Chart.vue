<template>
  <div class="rankchart-container">
    <div class="rankchart-buttongroup">
      <div>
        <el-button type="info" @click="classSwitch(0)">累计确诊</el-button>
        <el-button type="success" @click="classSwitch(1)">累计治愈</el-button>
        <el-button type="warning" @click="classSwitch(2)">累计死亡</el-button>
      </div>
    </div>
    <div ref="rankchart_ref" class="rank-chart">排名柱状图</div>
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
      zoomEndValue: 4,
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
      this.chartInstance = this.$echarts.init(this.$refs.rankchart_ref, null)
      const initOption = {
        title: {
          text: '▎全国省级行政区累计确诊排行',
          right: 20,
          top: 25
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
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'log' // 各省数据差异悬殊，用对数处理
          /* axisLabel: {
            formatter: function (value) {
              return value === 0.1 ? 0 : value
            }
          }*/
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
          this.ArrValue1.sort(function (a, b) {
            return b - a
          })
          console.log(this.ArrValue1, '治愈人数排序')
          this.ArrValue2.sort(function (a, b) {
            return b - a
          })
          this.ArrValue = this.ArrValue0
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
      const colorArr0 = [
        ['#FF0000', '#F5DEB3'], // 红色渐变
        ['#FFD700', '#FFFFE0'], // 金色渐变
        ['#2E8B57', '#54FF9F'] // 绿色渐变
      ] // 累计确诊排行颜色组
      const colorArr1 = [
        ['#FF1493', '#FFFFF0'], // 深粉渐变
        ['#FF83FA', '#FFFFF0'], // magenta渐变
        ['#CD919E', '#FFFFF0'] // 浅粉渐变
      ] // 累计治愈排行颜色组
      const colorArr2 = [
        ['#696969', '#BEBEBE'], // 黑灰渐变
        ['#000080', '#F0F8FF'] // 海军蓝渐变
      ] // 累计死亡排行颜色组
      let targetColor = null
      const dataOption0 = {
        title: {
          text: '▎全国省级行政区累计确诊排行',
          right: 20,
          top: 25
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 18
          },
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
          type: 'category',
          data: name
        },
        yAxis: {
          type: 'log' // 各省数据差异悬殊，用对数处理
        },
        dataZoom: {
          show: false,
          startValue: this.zoomStartValue,
          endValue: this.zoomEndValue
        },
        series: [
          {
            type: 'bar',
            barMinHeight: 10,
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
                  targetColor = colorArr0[0]
                } else if (arg.value > 1000) {
                  targetColor = colorArr0[1]
                } else {
                  targetColor = colorArr0[2]
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
        title: {
          text: '▎全国省级行政区累计治愈排行',
          right: 20,
          top: 25
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 18
          },
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
          type: 'category',
          data: name
        },
        yAxis: {
          type: 'log', // 各省数据差异悬殊，用对数处理
          axisLabel: {
            formatter: function (value) {
              return value === 0.1 ? 0 : value
            }
          }
        },
        dataZoom: {
          show: false,
          startValue: this.zoomStartValue,
          endValue: this.zoomEndValue
        },
        series: [
          {
            type: 'bar',
            barMinHeight: 10,
            data: fixed_value,
            name: '累计治愈人数',
            label: {
              show: true,
              position: 'top',
              valueAnimation: true,
              formatter: function (params) {
                return params.data === 0.1 ? 0 : params.data
              }
            },
            itemStyle: {
              color: arg => {
                if (arg.value > 10000) {
                  targetColor = colorArr1[0]
                } else if (arg.value > 1000) {
                  targetColor = colorArr1[1]
                } else {
                  targetColor = colorArr1[2]
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
        title: {
          text: '▎全国省级行政区累计死亡排行',
          right: 20,
          top: 25
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 18
          },
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
          type: 'category',
          data: name
        },
        yAxis: {
          type: 'log', // 各省数据差异悬殊，用对数处理
          axisLabel: {
            formatter: function (value) {
              return value === 0.1 ? 0 : value
            }
          }
        },
        dataZoom: {
          show: false,
          startValue: this.zoomStartValue,
          endValue: this.zoomEndValue
        },
        series: [
          {
            type: 'bar',
            barMinHeight: 10,
            data: fixed_value,
            name: '累计死亡人数',
            label: {
              show: true,
              position: 'top',
              valueAnimation: true,
              formatter: function (params) {
                return params.data === 0.1 ? 0 : params.data
              }
            },
            itemStyle: {
              color: arg => {
                if (arg.value > 100) {
                  targetColor = colorArr2[0]
                } else {
                  targetColor = colorArr2[1]
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
        this.zoomStartValue = -1
        this.zoomEndValue = 3
      }
      this.timeId = setInterval(() => {
        this.zoomStartValue++
        this.zoomEndValue++
        if (this.zoomEndValue > this.ArrName.length - 1) {
          this.zoomStartValue = 0
          this.zoomEndValue = 4
        }
        this.updateChart(this.ArrName, this.ArrValue, this.ArrClass)
      }, 1500) // 每1.5s一次执行
    },
    classSwitch(classNumber) {
      console.log('类别已转换：', classNumber)
      this.ArrClass = classNumber
      // this.chartInstance.clear()
      switch (classNumber) {
        case 0:
          this.ArrValue = this.ArrValue0
          this.updateChart(this.ArrName, this.ArrValue0, classNumber)
          this.startInterval()
          break
        case 1:
          this.ArrValue = this.ArrValue1
          this.updateChart(this.ArrName, this.ArrValue1, classNumber)
          this.startInterval()
          break
        case 2:
          this.ArrValue = this.ArrValue2
          this.updateChart(this.ArrName, this.ArrValue2, classNumber)
          this.startInterval()
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.rankchart-container {
  // padding-top: 20px;
  position: relative;
  height: 50%;
  .rankchart-buttongroup {
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 26px;
    right: 0;
    margin: 0 auto;
    z-index: 999;
    text-align: center;

    div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
      padding: 4px 8px;
    }
  }
  .rank-chart {
    width: 100%;
    // padding-top: 16px;
    height: 100%;
    bottom: 0;
    border: 1px;
  }
}
</style>
