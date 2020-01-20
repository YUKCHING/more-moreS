<template>
  <div class="valuation-result">
    <div class="block1">
      <p class="line1">{{info.brand_name}} {{info.series_name}} {{info.model_name}}</p>
      <p class="line2">{{info.reg_date}}
        {{info.mile_age}}万公里 {{info.city_name}}</p>
      <div class="line3">
        <span>最新指导价：</span>
        <span>{{newcarGuidePrice}}</span>
        <span> 万元</span>
      </div>
    </div>
    <div class="block2">
      <van-tabs v-model="activeName">
        <van-tab title="良好" name="a">
          <div class="tab-block">
            <table border="1">
              <tr>
                <th></th>
                <th>最低</th>
                <th>中间</th>
                <th>最高</th>
              </tr>
              <tr>
                <th>经销商收购</th>
                <th>{{evaluationVO.good_acquisition_bottomprice}}</th>
                <th>{{evaluationVO.good_acquisition_price}}</th>
                <th>{{evaluationVO.good_acquisition_topprice}}</th>
              </tr>
              <tr>
                <th>经销商卖出</th>
                <th>{{evaluationVO.good_retail_bottomprice}}</th>
                <th>{{evaluationVO.good_retail_price}}</th>
                <th>{{evaluationVO.good_retail_topprice}}</th>
              </tr>
              <tr>
                <th>个人交易</th>
                <th>{{evaluationVO.good_personal_bottomprice}}</th>
                <th>{{evaluationVO.good_personal_price}}</th>
                <th>{{evaluationVO.good_personal_topprice}}</th>
              </tr>
            </table>
          </div>
        </van-tab>
        <van-tab title="一般" name="b">
          <div class="tab-block">
            <table border="1">
              <tr>
                <th></th>
                <th>最低</th>
                <th>中间</th>
                <th>最高</th>
              </tr>
              <tr>
                <th>经销商收购</th>
                <th>{{evaluationVO.general_acquisition_bottomprice}}</th>
                <th>{{evaluationVO.general_acquisition_price}}</th>
                <th>{{evaluationVO.general_acquisition_topprice}}</th>
              </tr>
              <tr>
                <th>经销商卖出</th>
                <th>{{evaluationVO.general_retail_bottomprice}}</th>
                <th>{{evaluationVO.general_retail_price}}</th>
                <th>{{evaluationVO.general_retail_topprice}}</th>
              </tr>
              <tr>
                <th>个人交易</th>
                <th>{{evaluationVO.general_personal_bottomprice}}</th>
                <th>{{evaluationVO.general_personal_price}}</th>
                <th>{{evaluationVO.general_personal_topprice}}</th>
              </tr>
            </table>
          </div>
        </van-tab>
        <van-tab title="优秀" name="c">
          <div class="tab-block">
            <table border="1">
              <tr>
                <th></th>
                <th>最低</th>
                <th>中间</th>
                <th>最高</th>
              </tr>
              <tr>
                <th>经销商收购</th>
                <th>{{evaluationVO.best_acquisition_bottomprice}}</th>
                <th>{{evaluationVO.best_acquisition_price}}</th>
                <th>{{evaluationVO.best_acquisition_topprice}}</th>
              </tr>
              <tr>
                <th>经销商卖出</th>
                <th>{{evaluationVO.best_retail_bottomprice}}</th>
                <th>{{evaluationVO.best_retail_price}}</th>
                <th>{{evaluationVO.best_retail_topprice}}</th>
              </tr>
              <tr>
                <th>个人交易</th>
                <th>{{evaluationVO.best_personal_bottomprice}}</th>
                <th>{{evaluationVO.best_personal_price}}</th>
                <th>{{evaluationVO.best_personal_topprice}}</th>
              </tr>
            </table>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="block3">
      <div id="linechart" style="height: 100%; width: 100%;"></div>
    </div>
  </div>
</template>
<script>
import { evaluateQuickRequest } from '@/apis/loansRequest.js'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data () {
    return {
      info: this.$route.query,
      activeName: 'b',
      evaluationVO: {},
      cityPrice: [],
      monthsPrice: [],
      newcarGuidePrice: '',
      lineChart: {}
    }
  },
  created () {
    this.evaluateAction()
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.lineChart = echarts.init(document.getElementById('linechart'))
    this.drawLine()
  },
  computed: {
    getChartOption () {
      return {
        title: {
          show: true,
          text: '近几月估值价格',
          x: '50%',
          top: 15,
          textAlign: 'center',
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          show: true,
          formatter: '{b0}<br />{c0} 万元',
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0
          },
          axisLine: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: []
      }
    }
  },
  methods: {
    drawLine () {
      // 绘制图表
      this.lineChart.setOption(this.getChartOption)
    },
    setChartOption () {
      let yAxisData = []
      let xAxisData = []

      this.monthsPrice.forEach(ele => {
        yAxisData.push(ele.price)
        xAxisData.push(ele.date)
      })

      let series = [{
        type: 'line',
        data: yAxisData
      }]

      this.lineChart.setOption({
        xAxis: [
          {
            data: xAxisData
          }
        ],
        series: series
      })
    },
    evaluateAction () {
      let req = {
        brand_id: this.info.brand_id,
        series_id: this.info.series_id,
        model_id: this.info.model_id,
        city_id: this.info.city_id,
        reg_date: this.info.reg_date,
        mile_age: this.info.mile_age
      }
      evaluateQuickRequest(req).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.evaluationVO = res.data.evaluationVO
          this.cityPrice = res.data.cityPrice
          this.monthsPrice = res.data.monthsPrice
          this.newcarGuidePrice = res.data.newcarGuidePrice

          this.setChartOption()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.valuation-result {
  background: #ffffff;

  .block3 {
    height: 300px;
    border-bottom: 6px solid rgba(246, 245, 245, 1);
  }

  .block2 {
    text-align: center;
    border-bottom: 6px solid rgba(246, 245, 245, 1);

    $thWidth: calc(100vw - 40px);
    .tab-block {
      display: inline-block;
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      color: #6b5959;

      th:nth-child(1) {
        width: calc(#{$thWidth} * 0.3);
        color: #000000;
      }
      th:nth-child(2) {
        width: calc(#{$thWidth} * 0.23);
      }
      th:nth-child(3) {
        width: calc(#{$thWidth} * 0.23);
      }
      th:nth-child(4) {
        width: calc(#{$thWidth} * 0.23);
      }

      tr {
        height: 30px;
      }
      tr:nth-child(1) {
        color: #000000;
      }
    }
  }

  .block1 {
    text-align: center;
    border-bottom: 6px solid rgba(246, 245, 245, 1);
    padding: 15px 0;

    .line1 {
      color: #030303;
      font-size: 17px;
    }

    .line2 {
      color: #979797;
      font-size: 12px;
      line-height: 20px;
    }

    .line3 {
      display: inline-flex;
      align-items: flex-end;
      justify-content: center;
      margin-top: 10px;
      font-size: 13px;

      span:nth-child(2) {
        display: inline-block;
        margin: 0 5px 0 0;
        font-size: 22px;
        color: red;
      }
    }
  }
}
</style>
