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
        <span slot="button">万公里</span>
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
      <div class="popup-panel">
        <car-model @finish="selectCarModel" @back="showBrandPicker=false"></car-model>
      </div>
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
      <div class="popup-panel">
        <div class="local-city">
          <p class="line1">当前位置</p>
          <div class="text">
            <span v-if="localCity.id === ''" style="color: gray">定位中...</span>
            <div v-else class="button" @click="selectCityItem(localCity)">
              {{localCity.name}}
            </div>
          </div>
        </div>
        <div class="select-city">
          <van-index-bar :index-list="cityIndexList" :sticky="false">
            <div v-for="item in cityIndexList" :key="item">
              <van-index-anchor :index="item" />
              <van-cell v-for="city in cityData[item]" :key="city.id" :title="city.name" @click="selectCityItem(city)"/>
            </div>
          </van-index-bar>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { evaluateCityRequest, refreshToken } from '@/apis/loansRequest.js'
import { Toast } from 'mint-ui'
import py from '@/common/js/vue-py'
import CarModel from './components/CarModel'
import '@/common/base/geolocation.min.js'
export default {
  components: {
    CarModel
  },
  data () {
    return {
      info: {
        brand: '',
        time: '',
        mileage: '',
        city: ''
      },
      cityIndexList: [],
      cityData: {},
      cityArrData: [],
      selectCity: {},
      selectCarInfo: [],
      selectTime: '',
      minDate: new Date(2006, 1, 1),
      maxDate: new Date(),
      showBrandPicker: false,
      showDatePicker: false,
      showCityPicker: false,
      carTime: '',
      evaResult: {},
      localCity: {
        name: '',
        id: ''
      }
    }
  },
  created () {
    // this.refreshTokenAction()
    this.loadCity()
  },
  mounted () {
    this.getMyLocation()
  },
  methods: {
    refreshTokenAction () {
      let req = {
        token: 'eyJpdiI6ImNEbE9KeXZ4RlVReFFOS1JmRXJIRlE9PSIsInZhbHVlIjoiSFMyQ1BZWVwvQ0lMdXR4ME0wbmdpMUV4V081dVNkK01cL1FlaUU3aFM0QnRvPSIsIm1hYyI6IjUxYWFiYTJmNWFlNWEyYjE5ZTIzOTNkMGUxZjM5YzEyMGYyMjY3MDcxNjdlNDc4NzEwNWMzNmNhNzNhNjljZWEifQ=='
      }
      refreshToken(req).then(res => {
        console.log(res)
      })
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
      this.info.time = year + ' 年' + month + ' 月'
      this.selectTime = year + '-' + month
    },
    valuationRecordAction () {
      this.$router.push('/valrecord')
    },
    loadCity () {
      evaluateCityRequest({}).then(res => {
        if (res.code === 0) {
          this.cityIndexList = []
          this.cityArrData = []
          res.data.forEach(ele => {
            ele.citys.forEach(city => {
              this.cityIndexList.push(py.chineseToPinYinFirst(city.name))
            })
          })
          this.cityIndexList.sort()
          this.cityIndexList = Array.from(new Set(this.cityIndexList))

          this.cityData = {}
          this.cityIndexList.forEach(ele => {
            this.cityData[ele] = []
          })

          res.data.forEach(ele => {
            ele.citys.forEach(city => {
              let tag = py.chineseToPinYinFirst(city.name)
              this.cityData[tag].push({
                ...city
              })
              this.cityArrData.push({...city})
            })
          })
          this.fixLocalCity()
        }
      })
    },
    selectCityItem (item) {
      this.showCityPicker = false
      this.selectCity = item
      this.info.city = item.name
    },
    selectCarModel (items) {
      console.log(items)
      this.showBrandPicker = false
      this.selectCarInfo = items
      this.info.brand = items[0].name + ' ' + items[2].name
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

      this.$router.push({
        path: '/valresult',
        query: {
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
      })
    },
    getMyLocation () {
      var geolocation = new window.qq.maps.Geolocation('GM3BZ-PSDLW-MWFR7-R6CFC-D2QO6-6QFXM', 'loansh5')
      geolocation.getIpLocation(this.showPosition, this.showErr)
    },
    showPosition (position) {
      this.localCity.name = position.city
      this.fixLocalCity()
    },
    showErr () {
      this.getMyLocation() // 定位失败再请求定位，测试使用
    },
    fixLocalCity () {
      if (this.localCity.name === '') return
      if (this.cityArrData.length === 0) return
      for (let i = 0; i < this.cityArrData.length; i++) {
        if (this.localCity.name.indexOf(this.cityArrData[i].name) !== -1) {
          this.localCity.name = this.cityArrData[i].name
          this.localCity.id = this.cityArrData[i].id
          break
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.valuation {
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

  .popup-panel {
    background: #ffffff;
    height: 100vh;

    $localCityHeight: 10%;
    .local-city {
      height: $localCityHeight;
      box-sizing: border-box;
      padding: 10px 15px;

      .line1 {
        font-weight: 500;

      }

      .text {
        font-size: 14px;
        margin: 5px;

        .button {
          display: inline-block;
          line-height: 20px;
          border-radius: 3px;
          background-color: rgba(246, 246, 246, 1);
          text-align: center;
          border: 1px solid rgba(255, 0, 0, 0);
          padding: 5px 10px;
        }
      }
    }

    .select-city {
      height: calc(100% - #{$localCityHeight});
      overflow: auto;
    }
  }
}
</style>
