<!-- 累计趋势 -->
<template>
  <div class="com-container">
    <div ref="TrendChart" class="com-chart">1</div>
  </div>
</template>
<script>
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
  /*props: {
    title: {
      type: String,
      default: ''
    },
    data: Object
    
  },*/
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.TrendChart)
      console.log('初始化完成')
      this.setOptions()
    },
    setOptions() {
      const option = {
        title: {
          text: '▎2022年中国疫情数据时间序列图',
          textStyle: {
            color: 'black'
          },
          left: '0%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          top: '5%',
          right: '5%',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['累计现有确诊', '累计治愈人数', '累计死亡人数'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#BCBCBF'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: '单位（例）',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                width: 0,
                color: 'rgba(128, 128, 128, 0.5)'
              }
            }
          }
        ],
        series: [
          {
            name: '累计现有确诊',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: 'rgba(16,97,204, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(17,235,210, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(16,97,204,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(17,235,210,1)'
                  }
                ])
              },
              emphasis: {
                color: 'rgb(0,196,132)',
                borderColor: 'rgba(0,196,132,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 2
              }
            },
            data: [132479, 130392, 228499, 475180, 681214, 2677949, 4397515]
          },
          {
            name: '累计死亡人数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(205,52,42, 0.5)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(235,235,21, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(205,52,42,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(235,235,21,1)'
                  }
                ])
              },
              emphasis: {
                color: 'rgb(99,250,235)',
                borderColor: 'rgba(99,250,235,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 2
              }
            },
            data: [5699, 5700, 6479, 13436, 15273, 16982, 21400]
          },
          {
            name: '累计治愈人数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(119,68,255, 0.5)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(23,32,79, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(2,163,254,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(119,61,242,1)'
                  }
                ])
              },
              emphasis: {
                color: 'rgb(99,250,235)',
                borderColor: 'rgba(99,250,235,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 2
              }
            },
            data: [120936, 126511, 135431, 183944, 265672, 293039, 297969]
          }
        ]
      }
      this.chart.setOption(option)
    }
  },
  screenAdapter() {
    const titleFontSize = (this.$refs.rankchart_ref.offsetWidth / 100) * 3
    // console.log(titleFontSize)
    const adaptOption = {
      title: {
        textStyle: { fontSize: titleFontSize }
      },
      xAxis: {
        nameTextStyle: {
          fontSize: titleFontSize
        }
      }
    }
    this.chartInstance.setOption(adaptOption)
    this.chartInstance.resize()
  }
}
</script>
<style scoped lang="scss">
.com-container {
  width: 100%;
  height: 50%;
  .com-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
