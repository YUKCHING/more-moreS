<template>
  <div class="valuation">
    <!-- <div class="search-bar" @click="searchBrandAction">
      <van-icon name="search" size="10px"/>
      搜索车型
    </div> -->
    <van-cell-group style="width: 100%;">
      <van-field
        v-model="info.brand"
        label="品牌车型"
        right-icon="arrow"
        placeholder="请选择品牌车型"
        readonly
        @click="showBrandPicker = true"
      />
      <van-field
        v-model="info.time"
        label="上牌时间"
        right-icon="arrow"
        placeholder="请选择上牌时间"
        readonly
        @click="showDatePicker = true"
      />
      <van-field
        v-model="info.mileage"
        label="行驶里数"
        placeholder="请输入行驶里数"
        type="number"
      >
        <p slot="button"><span style="color: #323233; font-weight: 600;">万</span>公里</p>
      </van-field>
      <van-field
        v-model="info.city"
        label="所在城市"
        right-icon="arrow"
        placeholder="请选择所在城市"
        readonly
        @click="showCityPicker = true"
      />
    </van-cell-group>
    <div class="valuation-button" @click="evaluateAction">快速估值</div>
    <p class="record-button" @click="valuationRecordAction">估值记录</p>
    <van-popup
      v-model="showBrandPicker"
      position="bottom"
    >
      <car-popup @select="selectCarModel"></car-popup>
    </van-popup>
    <van-popup
      v-model="showDatePicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="carTime"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="onDateCancel"
        @confirm="onDateConfirm"
      />
    </van-popup>
    <van-popup
      v-model="showCityPicker"
      position="bottom"
    >
      <city-popup @select="selectCityItem"></city-popup>
    </van-popup>
    <qr-overlay></qr-overlay>
    <back-home />
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import CarPopup from './components/CarPopup'
import CityPopup from './components/CityPopup'
import initLoginCheckInfo from '@/common/js/login.js'
import QrOverlay from '@/components/QrOverlay'
import BackHome from '@/components/BackHome'
export default {
  components: {
    CarPopup, CityPopup, QrOverlay, BackHome
  },
  data () {
    return {
      info: {
        brand: '',
        time: '',
        mileage: '',
        city: ''
      },
      cityArrData: [],
      selectCity: {},
      selectCarInfo: [],
      selectTime: '',
      minDate: new Date(2006, 1, 1),
      maxDate: new Date(),
      showBrandPicker: false,
      showDatePicker: false,
      showCityPicker: false,
      carTime: new Date(),
      evaResult: {}
    }
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (process.env.NODE_ENV === 'production') {
        let title = '泰诺汽车平台-快速估值'
        let des = '基于海量真实成交记录，采用人工智能和大数据，保证估值的真实可靠性。'
        if (!window.isReady) {
          initLoginCheckInfo(this.$route).then(info => {
            if (info && info.code === -1000104) {
              this.bus.$emit('showQrOverlay')
              return
            }
            // 分享设置
            let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
            this.initWxShare(window.shareUrl, title, des, shareLink)
            window.isReady = true
            this.$store.dispatch('setIsFirstVisit', {
              isFirstVisit: info.showBack
            })

            this.getStoreInfo()
          })
        } else {
        // 分享设置
          let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
          this.initWxShare(window.shareUrl, title, des, shareLink)

          this.getStoreInfo()
        }
      } else {
        this.getStoreInfo()
      }
    },
    getStoreInfo () {
      let valinfo = this.$store.getters.valinfo
      if (valinfo) {
        this.selectCarInfo = valinfo.selectCarInfo
        this.selectCity = valinfo.selectCity
        this.selectTime = valinfo.selectTime
        this.info = valinfo.info
      }
    },
    searchBrandAction () {
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    onDateCancel () {
      this.showDatePicker = false
    },
    onDateConfirm (value) {
      this.carTime = value
      this.showDatePicker = false
      var year = value.getFullYear()
      var month = value.getMonth() + 1
      if (String(month).length <= 1) {
        month = '0' + String(month)
      }
      this.info.time = year + ' 年' + month + ' 月'
      this.selectTime = year + '-' + month
    },
    valuationRecordAction () {
      this.$router.push('/valrecord')
    },
    selectCityItem (item) {
      this.showCityPicker = false
      if (item) {
        this.selectCity = item
        this.info.city = item.name
      }
    },
    selectCarModel (items) {
      console.log(items)
      this.showBrandPicker = false
      if (items) {
        this.selectCarInfo = items
        this.info.brand = items[0].name + ' ' + items[2].name
      }
    },
    evaluateAction () {
      if (this.selectCarInfo.length !== 3) {
        Toast('请选择品牌车型')
        return
      }
      if (!this.selectTime) {
        Toast('请选择上牌时间')
        return
      }
      if (this.info.mileage.length === 0) {
        Toast('请输入行驶里数')
        return
      }
      if (!this.selectCity.id) {
        Toast('请选择所在城市')
        return
      }
      let req = {
        brand_id: this.selectCarInfo[0].id,
        brand_name: this.selectCarInfo[0].name,
        series_id: this.selectCarInfo[1].id,
        series_name: this.selectCarInfo[1].name,
        model_id: this.selectCarInfo[2].id,
        model_name: this.selectCarInfo[2].name,
        city_id: this.selectCity.id,
        city_name: this.selectCity.name,
        reg_date: this.selectTime,
        mile_age: this.info.mileage
      }
      let saveData = {
        'selectCarInfo': this.selectCarInfo,
        'selectCity': this.selectCity,
        'selectTime': this.selectTime,
        'info': this.info
      }
      this.$store.dispatch('setValInfo', {
        valinfo: JSON.stringify(saveData)
      }).then(() => {
        this.$router.push({
          path: '/valresult',
          query: {
            ...req
          }
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.valuation /deep/ {
  width: 100vw;

  .search-bar {
    background: #f8f8f8;
    border-radius: 16px;
    height: 33px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    color: #030303;
    font-size: 11px;
    font-family: 'PingFangSC-Regular';
  }

  .valuation-button {
    height: 44px;
    margin: 28px 20px 0;
    width: calc(100% - 40px);
    color: #ffffff;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    background: linear-gradient(to right, #FF7952 0%, #FE3525 100%);
    box-sizing: border-box;
    border-radius: 22px;
  }

  .record-button {
    color: #346CFF;
    font-size: 13px;
    text-align: center;
    margin-top: 15px;
  }
}
</style>
