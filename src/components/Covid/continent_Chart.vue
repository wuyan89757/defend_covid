<template>
  <div class="continent-container">
    <div
      ref="continentchart_ref"
      class="continent-chart"
    >各大洲图</div>
  </div>
</template>

<script>
require('@/styles/echartstheme/vintage')
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
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.continentchart_ref, 'vintage')
      this.chartInstance.showLoading()
      const initOption = {
        title: {
          text: '▎世界各大洲现存确诊占比图',
          left: 20,
          top: 20
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: 'pie'
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    getData() {
      const data = [
        // 现存确诊
        { value: 9580190, name: '欧洲(EU)' },
        { value: 5411898, name: '亚洲(AS)' },
        { value: 5590079, name: '北美洲(NA)' },
        { value: 1760102, name: '南美洲(SA)' },
        { value: 547434, name: '大洋洲(OA)' },
        { value: 662058, name: '非洲(AF)' }
      ]
      this.updateChart(data)
    },
    updateChart(data) {
      let max = 0
      let sum = 0
      data.forEach(item => {
        sum += item.value
        if (item.value >= max) max = item.value
      })
      const number = Math.round(max * 0.5)
      const showData = data.map(item => {
        return {
          value: number + item.value,
          name: item.name
        }
      })
      // console.log(showData, '修数')
      const dataOption = {
        tooltip: {
          trigger: 'item',
          formatter: function(param) {
            return (
              param.name +
              ': ' +
              (param.value - number) +
              ' ' +
              (((param.value - number) / sum) * 100).toFixed(4) +
              '%'
            )
          }
        },
        series: [
          {
            name: '现存确诊人数',
            data: showData,
            startAngle: 178,
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              show: true,
              formatter: function(param) {
                return (
                  param.name + '占比: ' + (((param.value - number) / sum) * 100).toFixed(4) + '%'
                )
              }
            },
            emphasis: {
              // 选中的样式
              borderWidth: 1,
              focus: 'self',
              label: {
                show: true // 选中时显示数据标签
              },
              labelLine: {
                show: false
              }
            },
            labelLine: {
              length: 5,
              length2: 10,
              lineStyle: {
                color: 'red' // 修改引导线的颜色
              },
              labelLayout(params) {
                return {
                  fontSize: Math.max(params.rect.width / 10, 5)
                }
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
      this.chartInstance.hideLoading()
    }
  },
  screenAdapter() {
    const titleFontSize = (this.$refs.rankchart_ref.offsetWidth / 100) * 3
    const adaptOption = {
      title: {
        textStyle: { fontSize: titleFontSize / 2 }
      }
    }
    this.chartInstance.setOption(adaptOption)
    this.chartInstance.resize()
  }
}
</script>

<style>
.continent-container {
  margin: 0 auto;
  width: 800px;
  height: 650px;
}
.continent-chart {
  width: 100%;
  height: 90%;
  bottom: 0%;
  border: 1px;
}
</style>
