<template>
  <div class="popup-panel">
    <div class="search-topbar">
      <van-field v-model="searchKey" placeholder="请输入城市名搜索" clearable>
        <van-icon slot="left-icon" color="#F9CFD0" name="search" />
        <span slot="button" class="search-button" @click="searchButtonAction">返回</span>
      </van-field>
    </div>
    <div class="select-city" v-if="filterArr.length === 0">
      <van-index-bar :index-list="proIndexList" :sticky="false">
        <div v-for="(key, i) in proIndexList" :key="key">
          <div v-if="i === 0">
            <div v-show="recentCity.length > 0">
              <van-index-anchor :index="key">最近选择</van-index-anchor>
              <div class="recent-block">
                <span
                  v-for="item in proData[key]"
                  :key="item.name"
                  @click="selectRecent(item)"
                >{{item.name}}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <van-index-anchor :index="key" />
            <van-cell
              v-for="item in proData[key]"
              :key="item.name"
              :title="item.name"
              @click="selectProvinceItem(item)"
            />
          </div>
        </div>
      </van-index-bar>
    </div>
    <div class="select-city" v-else>
      <van-index-anchor :index="''" />
      <van-cell
        v-for="item in filterArr"
        :key="item.name"
        :title="item.name"
        @click="selectAction(item)"
      />
    </div>
    <van-popup
      v-model="showPopup"
      position="right"
      :close-on-click-overlay="false"
      :style="{ height: '100%', width: '60%' }"
    >
      <city-sec-popup :info="selectPro" @back="backAction" @select="selectAction"></city-sec-popup>
    </van-popup>
  </div>
</template>
<script>
import { evaluateCityRequest } from '@/apis/api.js'
import CitySecPopup from './CitySecPopup'
import py from '@/common/js/vue-py'
import commonJs from '@/common/js/public.js'
export default {
  components: {
    CitySecPopup
  },
  watch: {
    'searchKey' () {
      if (this.searchKey.length === 0) {
        this.filterArr = []
      } else {
        this.searchAction()
      }
    }
  },
  created () {
    this.init()
  },
  data () {
    return {
      showPopup: false,
      proIndexList: [],
      proData: {},
      cityArrData: [],
      selectPro: {},
      recentCity: [],
      searchKey: '',
      filterArr: []
    }
  },
  methods: {
    searchAction: commonJs._debounce(function (_type, index, item) {
      if (this.searchKey) {
        this.searchDataAction()
      }
    }, 300),
    searchDataAction () {
      this.filterArr = this.cityArrData.filter(ele => {
        let pass = false
        if (ele.name.indexOf(this.searchKey) !== -1) {
          pass = true
        }
        return pass
      })
      console.log(this.filterArr)
    },
    init () {
      if (this.$store.getters.recentCity) {
        this.recentCity = JSON.parse(this.$store.getters.recentCity)
      }
      this.loadCity()
    },
    selectProvinceItem (item) {
      this.showPopup = true
      this.selectPro = item
    },
    loadCity () {
      evaluateCityRequest({
        evaluate_provider: 2
      }).then(res => {
        if (res.code === 0) {
          let arr = res.data.map(ele => {
            return py.chineseToPinYinFirst(ele.name)
          })
          this.proIndexList = Array.from(new Set(arr)).sort()
          this.proIndexList.unshift('最')
          this.proIndexList.forEach((ele, index) => {
            if (index === 0) {
              this.proData[ele] = this.recentCity
            } else {
              this.proData[ele] = []
            }
          })

          res.data.forEach((ele, index) => {
            let first = py.chineseToPinYinFirst(ele.name)
            this.proData[first].push({
              name: ele.name,
              children: ele.citys
            })
            this.cityArrData = this.cityArrData.concat(ele.citys)
          })

          Object.keys(this.proData).forEach(key => {
            this.proData[key].sort((a, b) => {
              return a.name.localeCompare(b.name)
            })
          })
        }
      })
    },
    backAction () {
      this.showPopup = false
      this.selectPro = {}
    },
    resetData () {
      this.filterArr = []
      this.searchKey = ''
    },
    selectAction (item) {
      if (this.recentCity.filter(ele => ele.name === item.name).length === 0) {
        this.recentCity.unshift(item)
        if (this.recentCity.length > 5) this.recentCity.pop()
        console.log(this.recentCity)
        this.$store.dispatch('setRecentCity', {
          recentCity: JSON.stringify(this.recentCity)
        })
      }

      this.backAction()
      this.$emit('select', item)
      this.resetData()
    },
    selectRecent (item) {
      this.backAction()
      this.$emit('select', item)
      this.resetData()
    },
    searchButtonAction () {
      this.$emit('select')
      this.resetData()
    }
  }
}
</script>
<style lang='scss' scoped>
.popup-panel /deep/ {
  background: #ffffff;
  height: 100vh;

  .van-index-anchor {
    background: rgb(239, 240, 242);
  }

  .van-cell:not(:last-child)::after {
    left: 0;
  }

  $searchBarHeight: 48px;
  .search-topbar {
    background: #E02020;
    padding: 7px 8px;

    .van-cell {
      padding: 0;
    }

    .van-field {
      display: inline-flex;
      width: 100%;
      padding: 5px 7px 5px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, .5);
    }

    input::-webkit-input-placeholder {
      color: rgba(255, 255, 255, .6);
    }

    .search-button {
      color: rgba(255, 255, 255, .6);
    }
  }

  .select-city {
    height: calc(100% - #{$searchBarHeight});
    overflow: auto;
    position: relative;
  }

  .recent-block {
    padding: 11px 20px 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    span {
      border-radius: 2px;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 5px 17px;
      left: 36.5px;
      color: rgba(157, 157, 157, 1);
      font-size: 11px;
      font-family: PingFangSC-Regular;
      margin: 5px 10px 0px 0px;
    }
  }
}
</style>
