<template>
  <div class="popup-panel">
    <!-- <div class="local-city">
      <p class="line1">当前位置</p>
      <div class="text">
        <span v-if="localCity.id === ''" style="color: gray">定位中...</span>
        <div v-else class="button" @click="selectCityItem(localCity)">
          {{localCity.name}}
        </div>
      </div>
    </div> -->
    <van-cell-group>
      <van-field v-model="searchKey" placeholder="请输入搜索关键字" clearable>
        <van-icon slot="left-icon" name="search" />
        <span slot="button" class="search-button" @click="searchButtonAction">返回</span>
      </van-field>
    </van-cell-group>
    <div class="select-city">
      <van-index-bar :index-list="cityIndexList" :sticky="false">
        <div v-for="item in cityIndexList" :key="item">
          <van-index-anchor :index="item" />
          <van-cell v-for="city in cityData[item]" :key="city.id" :title="city.name" @click="selectCityItem(city)"/>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>
<script>
import { evaluateCityRequest } from '@/apis/api.js'
import py from '@/common/js/vue-py'
import commonJs from '@/common/js/public.js'
// import '@/common/base/geolocation.min.js'
export default {
  created () {
    this.loadCity()
  },
  mounted () {
    // this.getMyLocation()
  },
  watch: {
    'searchKey' () {
      if (this.searchKey.length === 0) {
        this.cityData = this.cityDataBackUp
        this.cityIndexList = this.cityIndexListBackUp
      } else {
        this.searchAction()
      }
    }
  },
  data () {
    return {
      cityIndexListBackUp: [],
      cityDataBackUp: {},
      cityIndexList: [],
      cityData: {},
      localCity: {
        name: '',
        id: ''
      },
      searchKey: ''
    }
  },
  methods: {
    searchAction: commonJs._debounce(function (_type, index, item) {
      if (this.searchKey) {
        if (this.cityData.length === 0) return
        this.searchDataAction()
      }
    }, 300),
    searchButtonAction () {
      this.$emit('select')
      this.searchKey = ''
    },
    searchDataAction () {
      let resultArr = this.cityArrData.filter(ele => ele.name.indexOf(this.searchKey) !== -1)
      this.cityData = {
        '': resultArr
      }
      this.cityIndexList = ['']
    },
    selectCityItem (item) {
      this.$emit('select', item)
      this.searchKey = ''
    },
    loadCity () {
      evaluateCityRequest({}).then(res => {
        if (res.code === 0) {
          this.cityIndexListBackUp = []
          this.cityArrData = []

          res.data.forEach(ele => {
            ele.citys.forEach(city => {
              this.cityIndexListBackUp.push(py.chineseToPinYinFirst(city.name))
            })
          })
          this.cityIndexListBackUp.sort()
          this.cityIndexListBackUp = Array.from(new Set(this.cityIndexListBackUp))

          this.cityDataBackUp = {}
          this.cityIndexListBackUp.forEach(ele => {
            this.cityDataBackUp[ele] = []
          })
          res.data.forEach(ele => {
            ele.citys.forEach(city => {
              let tag = py.chineseToPinYinFirst(city.name)
              this.cityDataBackUp[tag].push({
                ...city
              })
              this.cityArrData.push({...city})
            })
          })

          this.cityIndexList = this.cityIndexListBackUp
          console.log(this.cityIndexList)
          this.cityData = this.cityDataBackUp
          console.log(this.cityIndexList)
          console.log(this.cityData)
          console.log(this.cityArrData)
          // this.fixLocalCity()
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
.popup-panel {
  background: #ffffff;
  height: 100vh;

  .search-button {
    font-size: 16px;
    color: #00A7FF;
  }

  $localCityHeight: 45px;
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
</style>
