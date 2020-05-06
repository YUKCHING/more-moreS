<template>
  <div class="valuation-result">
    <div class="block1" id="test">
      <p class="line1">{{info.brand_name}} {{info.series_name}} {{info.model_name}}</p>
      <p class="line2">
        {{info.reg_date}}
        {{info.mile_age}}万公里 {{info.city_name}}</p>
      <div class="line3">
        <span>最新指导价：</span>
        <span>{{newcarGuidePrice}}</span>
        <span> 万元</span>
      </div>
      <!-- <p class="share-p" @click="showSharePictureAction" v-show="valId">分享估值</p> -->
    </div>
    <div class="block2">
      <van-tabs v-model="activeName" title-active-color="rgba(0,0,0,.85)" title-inactive-color="rgba(0,0,0,.25)">
        <van-tab title="一般" name="a">
          <div class="tab-block" v-if="evaluationVO[1]">
            <table border="1">
              <tr>
                <th></th>
                <th>最低</th>
                <th>中间</th>
                <th>最高</th>
              </tr>
              <tr>
                <th>经销商收购</th>
                <th>{{evaluationVO[1].general_acquisition_bottomprice}}</th>
                <th>{{evaluationVO[1].general_acquisition_price}}</th>
                <th>{{evaluationVO[1].general_acquisition_topprice}}</th>
              </tr>
              <tr>
                <th>经销商卖出</th>
                <th>{{evaluationVO[1].general_retail_bottomprice}}</th>
                <th>{{evaluationVO[1].general_retail_price}}</th>
                <th>{{evaluationVO[1].general_retail_topprice}}</th>
              </tr>
              <!-- <tr>
                <th>个人交易</th>
                <th>{{evaluationVO.general_personal_bottomprice}}</th>
                <th>{{evaluationVO.general_personal_price}}</th>
                <th>{{evaluationVO.general_personal_topprice}}</th>
              </tr> -->
            </table>
          </div>
        </van-tab>
        <van-tab title="良好" name="b">
          <div class="tab-block" v-if="evaluationVO[2]">
            <table border="1">
              <tr>
                <th></th>
                <th>最低</th>
                <th>中间</th>
                <th>最高</th>
              </tr>
              <tr>
                <th>经销商收购</th>
                <th>{{evaluationVO[2].good_acquisition_bottomprice}}</th>
                <th>{{evaluationVO[2].good_acquisition_price}}</th>
                <th>{{evaluationVO[2].good_acquisition_topprice}}</th>
              </tr>
              <tr>
                <th>经销商卖出</th>
                <th>{{evaluationVO[2].good_retail_bottomprice}}</th>
                <th>{{evaluationVO[2].good_retail_price}}</th>
                <th>{{evaluationVO[2].good_retail_topprice}}</th>
              </tr>
              <!-- <tr>
                <th>个人交易</th>
                <th>{{evaluationVO.good_personal_bottomprice}}</th>
                <th>{{evaluationVO.good_personal_price}}</th>
                <th>{{evaluationVO.good_personal_topprice}}</th>
              </tr> -->
            </table>
          </div>
        </van-tab>
        <van-tab title="优秀" name="c">
          <div class="tab-block" v-if="evaluationVO[0]">
            <table border="1">
              <tr>
                <th></th>
                <th>最低</th>
                <th>中间</th>
                <th>最高</th>
              </tr>
              <tr>
                <th>经销商收购</th>
                <th>{{evaluationVO[0].best_acquisition_bottomprice}}</th>
                <th>{{evaluationVO[0].best_acquisition_price}}</th>
                <th>{{evaluationVO[0].best_acquisition_topprice}}</th>
              </tr>
              <tr>
                <th>经销商卖出</th>
                <th>{{evaluationVO[0].best_retail_bottomprice}}</th>
                <th>{{evaluationVO[0].best_retail_price}}</th>
                <th>{{evaluationVO[0].best_retail_topprice}}</th>
              </tr>
              <!-- <tr>
                <th>个人交易</th>
                <th>{{evaluationVO.best_personal_bottomprice}}</th>
                <th>{{evaluationVO.best_personal_price}}</th>
                <th>{{evaluationVO.best_personal_topprice}}</th>
              </tr> -->
            </table>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="block3">
      <line-chart chartId="linechart" :data="chartData" style="height: 100%; width: 100%;"></line-chart>
    </div>
  </div>
</template>
<script>
import { evaluateQuickRequest, evaluateRecordsDetailRequest } from '@/apis/api.js'
import ShareImage from './components/ShareImage'
import LineChart from './components/LineChart'
export default {
  components: {
    ShareImage, LineChart
  },
  data () {
    return {
      info: {},
      activeName: 'b',
      evaluationVO: {},
      cityPrice: [],
      monthsPrice: [],
      newcarGuidePrice: '',
      dataURL: '',
      valId: '',
      chartData: {
        year: '',
        yData: [],
        xData: []
      }
    }
  },
  mounted () {
    this.checkQuery()
  },
  computed: {
    isFromValId () {
      return !!this.$route.query.valuationid
    }
  },
  methods: {
    checkQuery () {
      this.valId = this.$route.query.valId
      this.getValuationById(this.$route.query.valId)
      // if (this.isFromValId) {
      // } else {
      //   this.info = this.$route.query
      //   console.log(this.info)
      //   this.evaluateAction()
      // }
    },
    setChartOption () {
      let yAxisData = []
      let xAxisData = []
      let year = ''

      this.monthsPrice.forEach(ele => {
        yAxisData.push(ele.price)
        xAxisData.push(ele.date.split('-')[1])
        if (!year) year = ele.date.split('-')[0]
      })

      this.chartData = {
        year: year,
        yData: yAxisData,
        xData: xAxisData
      }
    },
    evaluateAction () {
      let req = {
        evaluate_provider: 2,
        brand_id: this.info.brand_id,
        brand_name: this.info.brand_name,
        series_id: this.info.series_id,
        series_name: this.info.series_name,
        model_id: this.info.model_id,
        model_name: this.info.model_name,
        city_id: this.info.city_id,
        city_name: this.info.city_name,
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
          this.valId = String(res.data.id)

          this.setChartOption()
        }
      })
    },
    getValuationById (valId) {
      evaluateRecordsDetailRequest(valId).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.evaluationVO = res.data.evaluationVO
          this.cityPrice = res.data.cityPrice
          this.monthsPrice = res.data.monthsPrice
          this.newcarGuidePrice = res.data.newcarGuidePrice
          this.info = {
            city_name: res.data.city_name,
            brand_name: res.data.brand_name,
            series_name: res.data.series_name,
            model_name: res.data.model_name,
            reg_date: res.data.reg_date,
            mile_age: res.data.mile_age
          }
          this.setChartOption()
        }
      })
    },
    showSharePictureAction () {
      this.$router.push({
        path: '/valshare',
        query: {
          valId: this.valId,
          ...this.info
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.valuation-result /deep/ {
  background: #ffffff;

  .van-tabs--line .van-tabs__wrap {
    border-bottom: 1px solid rgba(246, 245, 245, 1);
    padding-bottom: 3px;
  }

  .block3 {
    height: 300px;
  }

  .block2 {
    text-align: center;
    border-bottom: 6px solid rgba(246, 245, 245, 1);

    $thWidth: calc(100vw - 40px);
    .tab-block {
      display: inline-block;
      box-sizing: border-box;
      padding: 4px 16px;
      width: 100%;
      color: #6b5959;
      border: none;

      th:nth-child(1) {
        width: calc(#{$thWidth} * 0.3);
        color: rgba(0, 0, 0, .5);
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
        border: 1px solid #ffffff;
        background: rgba(250, 250, 250, 1);
        font-size: 13px;
        line-height: 36px;
      }
      tr:nth-child(1) {
        color: rgba(0, 0, 0, .5);
        background: rgba(244, 244, 244, 1);
        font-size: 12px;
        border: 1px solid rgba(244, 244, 244, 1);
        border-bottom: 1px solid #ffffff;
        line-height: 28px;
      }
    }
  }

  .block1 {
    text-align: center;
    border-bottom: 8px solid rgba(246, 245, 245, 1);
    padding: 12px 0;
    position: relative;

    .line1 {
      color: rgba(0, 0, 0, .85);
      font-size: 15px;
    }

    .line2 {
      color: rgba(0, 0, 0, .25);
      font-size: 12px;
      transform: scale(.75);
    }

    .line3 {
      margin-top: 7px;
      color: rgba(0, 0, 0, .85);
      font-size: 12px;
      transform: scale(.92);
    }

    .share-p {
      display: inline-block;
      position: absolute;
      color: #CD5B68;
      top: 50%;
      left: 3%;
      background: #efefef;
      padding: 2px 7px;
      border-radius: 5px;
    }
  }
}
</style>
