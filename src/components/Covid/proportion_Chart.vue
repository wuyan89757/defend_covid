<template>
  <div class="com-container">
    <span class="pro_title">▎世界各大洲现存确诊占比图</span>
    <div ref="ProportionChart" class="com-chart">比例图</div>
  </div>
</template>
<script>
require('@/styles/echartstheme/chalk')
import Axios from 'axios'
import { getArea } from '@/api/covid'
let chart = null
/*const calculateProportion = (value, total) => {
  return ((value / total) * 100).toFixed(0)
}*/
export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  methods: {
    initChart() {
      /* if (null != chart && undefined != chart) {
        chart.dispose()
      }*/
      this.chart = this.$echarts.init(this.$refs.ProportionChart)
      this.setOptions()
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.ProportionChart.offsetWidth / 100) * 3
      const adaptOption = {
        title: {
          textStyle: { fontSize: titleFontSize / 2 }
        }
      }
      // this.chartInstance.setOption(adaptOption)
      // this.chartInstance.resize()
    },
    // 对this.allData赋值后调用updatechart更新图表
    /*   getData() {
      getArea().then(res => {
        // console.log(res, 'getArea')
        if (res.data.success) {
          
          this.data = res.data
         
        }
         const SeriesArr_proportion =this.data.results
         this.setOptions(SeriesArr_proportion)
      })
    },*/
    setOptions() {
      const list = [
        {
          name: '现有确诊',
          value: 12
        },
        {
          name: '累计死亡',
          value: 0.13
        },
        {
          name: '累计治愈',
          value: 86
        }
      ]
      let titleList = []
      let seriesList = []
      list.forEach((item, index) => {
        titleList.push({
          text: item.name,
          top: '55%',
          left: index * 30 + 12 + '%',
          textStyle: {
            fontWeight: 'normal',
            color: '#436EEE',
            fontSize: '15'
          }
        })
        //
        seriesList.push({
          name: item.name,
          type: 'pie',
          clockWise: true,
          radius: ['20%', '30%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: [index * 30 + 20 + '%', '35%'],
          data: [
            {
              value: item.value,
              name: item.name,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + '%'
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold',
                    color: 'black'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: {
                    // 完成的圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: '#D32E58' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#F99266' // 100% 处的颜色
                      }
                    ]
                  },
                  label: {
                    // show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            },
            {
              name: 'lanweihong',
              value: 100 - item.value
            }
          ]
        })
      })
      let option = {
        title: titleList,
        color: ['rgba(7, 158, 254, .9)'],
        series: seriesList
      }
      this.chart.setOption(option)
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        if (oldValue != newValue) {
          this.setOptions()
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
.com-container {
  position: relative;
  // width: 100%;
  height: 50%;
  overflow: hidden;
}

.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.pro_title {
  float: left;
  color: black;
  font-size: 20;
  font-weight: 900;
}
</style>
