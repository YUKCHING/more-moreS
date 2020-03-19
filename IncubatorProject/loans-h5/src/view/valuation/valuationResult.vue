<template>
  <div class="valuation-result">
    <div class="block1">
      {{info.brand_name}} {{info.model_name}}
    </div>
    <div class="block2">
      <share-card title="所在城市" :value="info.city_name"></share-card>
      <share-card title="上牌日期" :value="info.reg_date"></share-card>
      <share-card title="行程里程" :value="info.mile_age + '万公里'"></share-card>
    </div>
    <div class="block3">
      <div class="part1">
        <p>可贷款额度</p>
        <p>
          {{loansPriceMin}}~{{loansPriceMax}}
          <span> 万</span>
        </p>
        <div class="share-button" @click="clickShareAction" v-show="valId">
          <img src="@/assets/imgs/icon-share.png">
          <span>分享</span>
        </div>
      </div>
      <div class="part2">
        <select-button v-for="item in tabInfo" :key="item.value" :info="item" @select="selectTabAction"></select-button>
      </div>
      <div class="part3">
        <div class="line1">
          <div class="left">
            <p>估值(万)</p>
            <p>{{sliderValue}}</p>
          </div>
          <div class="line"></div>
          <div class="right">
            <span class="button" @click="selectLoanAction">
              选择产品
            </span>
            <p>超<span style="color: #EE5150;">10款</span>产品可选</p>
          </div>
        </div>
        <div class="line2">
          <div class="panel left">
            <van-slider
              class="slider"
              v-model="sliderRed"
              active-color="#E6E9EC"
              :step="0.05"
              :min="curSliderInfo.minRed"
              :max="curSliderInfo.maxRed"
            >
              <img slot="button" src="@/assets/valuation/slider-red.png" class="slider-icon" />
            </van-slider>
            <p style="margin-top: 6px;">车辆估值价</p>
          </div>

          <div class="panel right">
            <van-slider
              class="slider"
              v-model="sliderBlue"
              active-color="#E6E9EC"
              :step="0.05"
              :min="curSliderInfo.minBlue"
              :max="curSliderInfo.maxBlue"
            >
              <img slot="button" src="@/assets/valuation/slider-blue.png" class="slider-icon" />
            </van-slider>
            <p style="margin-top: 6px;">个人估值价</p>
          </div>
        </div>
        <div class="line3">
          <div class="panel">
            <span>{{curSliderInfo.minRed}}</span>
            <span>{{curSliderInfo.midRed}}</span>
            <span>{{curSliderInfo.maxRed}}</span>
          </div>
          <div class="panel">
            <span>{{curSliderInfo.minBlue}}</span>
            <span>{{curSliderInfo.midBlue}}</span>
            <span>{{curSliderInfo.maxBlue}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="block4">
      新车指导价：{{newcarGuidePrice}}万
    </div>
    <div class="block5" @click="showValDetailAction">
      <p>
        <span>点击查看详细数据</span>
        <img src="@/assets/imgs/icon-arrow-right.png">
      </p>
      <img src="@/assets/valuation/price-img.png" class="price-img">
    </div>
  </div>
</template>
<script>
import { evaluateQuickRequest, evaluateRecordsDetailRequest } from '@/apis/api.js'
import ShareCard from '@/components/card/ShareCard'
import SelectButton from './components/SelectButton'
export default {
  components: {
    ShareCard, SelectButton
  },
  computed: {
    isFromValId () {
      return !!this.$route.query.valuationid
    },
    sliderValue () {
      if (this.sliderRed) {
        return String(Number(this.sliderRed).toFixed(2))
      } else {
        return ''
      }
    },
    loansPriceMin () {
      if (this.sliderRed) {
        return String((Number(this.sliderRed) * 0.8).toFixed(2))
      } else {
        return ''
      }
    },
    loansPriceMax () {
      if (this.sliderRed) {
        return String((Number(this.sliderRed) * 1.2).toFixed(2))
      } else {
        return ''
      }
    }
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
      tabInfo: [
        {title: '车况普通', value: '1', select: false},
        {title: '车况良好', value: '2', select: true},
        {title: '车况优秀', value: '3', select: false}
      ],
      curTab: {},
      sliderInfo: {
        '1': {minRed: 0, midRed: 0, maxRed: 0, minBlue: 0, midBlue: 0, maxBlue: 0},
        '2': {minRed: 0, midRed: 0, maxRed: 0, minBlue: 0, midBlue: 0, maxBlue: 0},
        '3': {minRed: 0, midRed: 0, maxRed: 0, minBlue: 0, midBlue: 0, maxBlue: 0}
      },
      sliderRed: 0,
      sliderBlue: 0,
      curSliderInfo: {minRed: 0, midRed: 0, maxRed: 0, minBlue: 0, midBlue: 0, maxBlue: 0}
    }
  },
  mounted () {
    this.curTab = this.tabInfo[1]
    this.checkQuery()
  },
  methods: {
    checkQuery () {
      if (this.isFromValId) {
        this.valId = this.$route.query.valuationid
        this.getValuationById(this.$route.query.valuationid)
      } else {
        this.info = this.$route.query
        this.evaluateAction()
      }
    },
    evaluateAction () {
      let req = {
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

          let obj = res.data.evaluationVO
          this.sliderInfo = {
            '1': { // 一般
              minRed: obj.general_retail_bottomprice, // 经销商卖出
              midRed: obj.general_retail_price,
              maxRed: obj.general_retail_topprice,
              minBlue: obj.general_personal_bottomprice, // 个人交易
              midBlue: obj.general_personal_price,
              maxBlue: obj.general_personal_topprice},
            '2': { // 良好
              minRed: obj.good_retail_bottomprice, // 经销商卖出
              midRed: obj.good_retail_price,
              maxRed: obj.good_retail_topprice,
              minBlue: obj.good_personal_bottomprice, // 个人交易
              midBlue: obj.good_personal_price,
              maxBlue: obj.good_personal_topprice},
            '3': { // 优秀
              minRed: obj.best_retail_bottomprice, // 经销商卖出
              midRed: obj.best_retail_price,
              maxRed: obj.best_retail_topprice,
              minBlue: obj.best_personal_bottomprice, // 个人交易
              midBlue: obj.best_personal_price,
              maxBlue: obj.best_personal_topprice}
          }
          this.curSliderInfo = {
            minRed: Number(Number(this.sliderInfo['2'].minRed).toFixed(2)),
            midRed: Number(Number(this.sliderInfo['2'].midRed).toFixed(2)),
            maxRed: Number(Number(this.sliderInfo['2'].maxRed).toFixed(2)),
            minBlue: Number(Number(this.sliderInfo['2'].minBlue).toFixed(2)),
            midBlue: Number(Number(this.sliderInfo['2'].midBlue).toFixed(2)),
            maxBlue: Number(Number(this.sliderInfo['2'].maxRed).toFixed(2))
          }
          let midRed = (Number(this.sliderInfo['2'].minRed) + Number(this.sliderInfo['2'].maxRed)) / 2.0
          this.sliderRed = Number(midRed.toFixed(2))
          let midBlue = (Number(this.sliderInfo['2'].minBlue) + Number(this.sliderInfo['2'].maxBlue)) / 2.0
          this.sliderBlue = Number(midBlue.toFixed(2))
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

          let obj = res.data.evaluationVO
          this.sliderInfo = {
            '1': { // 一般
              minRed: obj.general_retail_bottomprice, // 经销商卖出
              midRed: obj.general_retail_price,
              maxRed: obj.general_retail_topprice,
              minBlue: obj.general_personal_bottomprice, // 个人交易
              midBlue: obj.general_personal_price,
              maxBlue: obj.general_personal_topprice},
            '2': { // 良好
              minRed: obj.good_retail_bottomprice, // 经销商卖出
              midRed: obj.good_retail_price,
              maxRed: obj.good_retail_topprice,
              minBlue: obj.good_personal_bottomprice, // 个人交易
              midBlue: obj.good_personal_price,
              maxBlue: obj.good_personal_topprice},
            '3': { // 优秀
              minRed: obj.best_retail_bottomprice, // 经销商卖出
              midRed: obj.best_retail_price,
              maxRed: obj.best_retail_topprice,
              minBlue: obj.best_personal_bottomprice, // 个人交易
              midBlue: obj.best_personal_price,
              maxBlue: obj.best_personal_topprice}
          }
          this.curSliderInfo = {
            minRed: Number(Number(this.sliderInfo['2'].minRed).toFixed(2)),
            midRed: Number(Number(this.sliderInfo['2'].midRed).toFixed(2)),
            maxRed: Number(Number(this.sliderInfo['2'].maxRed).toFixed(2)),
            minBlue: Number(Number(this.sliderInfo['2'].minBlue).toFixed(2)),
            midBlue: Number(Number(this.sliderInfo['2'].midBlue).toFixed(2)),
            maxBlue: Number(Number(this.sliderInfo['2'].minBlue).toFixed(2))
          }
          let midRed = (Number(this.sliderInfo['2'].minRed) + Number(this.sliderInfo['2'].maxRed)) / 2.0
          this.sliderRed = Number(midRed.toFixed(2))
          let midBlue = (Number(this.sliderInfo['2'].minBlue) + Number(this.sliderInfo['2'].maxBlue)) / 2.0
          this.sliderBlue = Number(midBlue.toFixed(2))
        }
      })
    },
    clickShareAction () {
      this.$router.push({
        path: '/valshare',
        query: {
          valId: this.valId,
          loanMin: this.loansPriceMin,
          loanMax: this.loansPriceMax,
          tabValue: this.curTab.value,
          ...this.info
        }
      })
    },
    showValDetailAction () {
      this.$router.push({
        path: '/valdetail',
        query: {
          valId: this.valId,
          ...this.info
        }
      })
    },
    selectTabAction (item) {
      this.curTab = item
      this.tabInfo.forEach(ele => {
        ele.select = ele.value === item.value
      })
      this.curSliderInfo = this.sliderInfo[item.value]
      let midRed = (Number(this.sliderInfo[item.value].minRed) + Number(this.sliderInfo[item.value].maxRed)) / 2.0
      this.sliderRed = Number(midRed.toFixed(2))
      let midBlue = (Number(this.sliderInfo[item.value].minBlue) + Number(this.sliderInfo[item.value].maxBlue)) / 2.0
      this.sliderBlue = Number(midBlue.toFixed(2))
    },
    selectLoanAction () {
      this.$router.push('/loanslist')
    }
  }
}
</script>
<style lang='scss' scoped>
.valuation-result /deep/ {
  background: #F2F3F4;
  width: 100%;
  height: 100%;

  .van-tabs--line .van-tabs__wrap {
    border-bottom: 1px solid rgba(246, 245, 245, 1);
    padding-bottom: 3px;
  }

  .block5 {
    background: #ffffff;
    position: relative;
    padding: 45px 24px 24px;

    p {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, .85);

      img {
        width: 18px;
        height: 16px;
        margin-left: 5px;
      }
    }

    .price-img {
      display: inline-block;
      position: absolute;
      width: 67px;
      height: 65px;
      bottom: 10px;
      right: 24px;
      box-shadow: 0px 3px 5px 0px rgba(191, 192, 197, 0.5);
    }
  }

  .block4 {
    background: #ffffff;
    border-bottom: 8px solid #F2F3F4;
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
    font-size: 11px;
    padding: 10px 0;
  }

  .block3 {
    background: #ffffff;
    border-bottom: 2px solid #F2F3F4;
    text-align: center;

    .part1 {
      position: relative;
      padding: 18px 0;

      p:nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
        font-size: 17px;
        font-family: PingFangSC-Medium;
      }

      p:nth-child(2) {
        margin-top: 10px;
        color: rgba(238, 81, 80, 1);
        font-size: 24px;
        line-height: 24px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        span {
          display: inline-block;
          font-size: 15px;
          line-height: 15px;
          padding-bottom: 2px;
        }
      }

      .share-button {
        position: absolute;
        top: 18px;
        right: 7%;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #efefef;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        color: rgba(146, 146, 146, 1);

        img {
          width: 12px;
          height: 12px;
          margin-right: 6px;
        }
      }
    }

    .part2 {
      display: flex;
      justify-content: space-between;
      padding: 0 38px;
    }

    .part3 {
      box-sizing: border-box;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.02) , rgba(0, 0, 0, 0.04));
      border-radius: 4px;
      margin: 16px;

      .line1 {
        display: flex;
        justify-content: center;
        align-items: center;

        .line {
          margin: 0 29px;
          width: 1px;
          height: 50px;
          background: rgba($color: #000000, $alpha: .1);
        }

        $lrWidth: 25%;
        .left {
          width: $lrWidth;
          padding: 18px 0;
          text-align: center;

          p:nth-child(1) {
            color: rgba(0, 0, 0, 0.5);
            font-size: 11px;
            text-align: center;
            font-family: PingFangSC-Medium;
          }
          p:nth-child(2) {
            margin-top: 6px;
            left: 91px;
            color: rgba(238, 81, 80, 1);
            font-size: 24px;
            font-family: PingFangSC-Medium;
          }
        }

        .right {
          text-align: center;
          width: $lrWidth;
          padding: 18px 0;
          display: inline-flex;
          flex-direction: column;
          align-items: center;

          .button {
            display: inline-block;
            border: 1.6px solid #EE5150;
            border-radius: 20px;
            font-size: 13px;
            color: rgba(238, 81, 80, 1);
            padding: 5px 10px;
          }

          p {
            margin-top: 5px;
            color: rgba(0, 0, 0, 0.5);
            font-size: 11px;
            text-align: center;
            font-family: PingFangSC-Medium;
          }
        }
      }

      .line2 {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .slider-icon {
          width: 14px;
          height: 16px;
        }

        .panel {
          width: 40%;
          left: 50px;
          background-color: rgba(255, 255, 255, 1);
          border: 0.5px solid rgba(0, 0, 0, 0.1);
          padding: 11px 0;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);

          .van-slider {
            width: 100%;
            margin-top: -12px;
          }
        }
      }

      .line3 {
        display: flex;
        justify-content: space-between;
        padding: 3px 0 6px;

        .panel {
          width: 48%;
          display: inline-flex;
          justify-content: space-between;

          span {
            display: inline-block;
            font-size: 12px;
            transform: scale(.9);
            color: rgba(0, 0, 0, .5);
          }
        }
      }
    }
  }

  .block2 {
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 8px solid #F2F3F4;
  }

  .block1 {
    background: #ffffff;
    padding: 14px;
    color: #000;
    font-size: 15px;
    border-bottom: 2px solid #F2F3F4;
    text-align: center;
  }
}
</style>
