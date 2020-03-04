<template>
  <div :id="chartId"></div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: {
    data: {
      require: true,
      type: Object,
      default: () => {
        return {}
      }
    },
    chartId: {
      require: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      myChart: {}
    }
  },
  watch: {
    'data' () {
      this.setChartOption()
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById(this.chartId))
    this.myChart.setOption(this.getChartOption)
  },
  computed: {
    getChartOption () {
      return {
        title: [{
          show: true,
          text: '近几月估值价格',
          x: '50%',
          top: 10,
          textAlign: 'center',
          textStyle: {
            fontSize: 17,
            color: '#6C6C6C'
          }
        }, {
          show: true,
          x: '50%',
          top: 30,
          textAlign: 'center',
          textStyle: {
            fontSize: 13,
            color: '#BCBCBC'
          }
        }],
        tooltip: {
          show: true,
          formatter: '{b0}月<br />{c0} 万元',
          // formatter: '{b0}<br />{c0} 万元',
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            formatter: function (value, index) {
              return value + '月'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#BBBBBB'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 3,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#868686'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: true,
            margin: 0,
            padding: [18, 0, 0, 0],
            formatter: function (value, index) {
              return index > 0 ? index > 3 ? value + '(万)' : value : ''
            }
          }
        },
        series: []
      }
    }
  },
  methods: {
    setChartOption () {
      console.log(this.data)
      let yAxisData = this.data.yData
      let xAxisData = this.data.xData
      let year = this.data.year

      let series = [{
        type: 'line',
        data: yAxisData
      }]

      this.myChart.setOption({
        title: [{
          text: '近几月估值价格'
        }, {
          text: year
        }],
        xAxis: [
          {
            data: xAxisData
          }
        ],
        series: series
      })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
