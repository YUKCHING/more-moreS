<template>
  <div class="car-popup">
    <div class="search-topbar">
      <van-field v-model="searchKey" :placeholder="searchPlaceholder" clearable>
        <van-icon slot="left-icon" color="#F9CFD0" name="search" />
        <span slot="button" class="search-button" @click="searchButtonAction">返回</span>
      </van-field>
    </div>
    <div class="content-block" id="first-content">
      <van-index-bar :index-list="brandIndexList" :sticky="false">
        <div v-for="(key, i) in brandIndexList" :key="key">
          <div v-if="i === 0 && (brandIndexList.length !== 1)">
            <van-index-anchor :index="key">最近浏览</van-index-anchor>
            <div class="recent-block">
              <span
                class="label"
                v-for="item in brandData[key]"
                :key="item.name"
                @click="selectBrandAction(item)"
                v-show="recentBrand.length > 0"
              >
                {{item.name}}
              </span>
              <span v-show="recentBrand.length === 0">
                无
              </span>
            </div>
          </div>
          <div v-else>
            <van-index-anchor :index="key" />
            <van-cell v-for="brand in brandData[key]" :key="brand.id" :title="brand.name" @click="selectBrandAction(brand)"/>
          </div>
          <!-- <div>
            <van-index-anchor :index="key" />
            <van-cell v-for="brand in brandData[key]" :key="brand.id" :title="brand.name" @click="selectBrandAction(brand)"/>
          </div> -->
        </div>
      </van-index-bar>
      <van-popup
        get-container="#first-content"
        v-model="showSeriesPopup"
        position="right"
        :close-on-click-overlay="false"
        :overlay="false"
        class="series-popup"
      > <!-- series展出层 -->
        <div class="series-panel">
          <div class="top" @click="seriesBackAction">
            <img src="@/assets/icon/icon-back.png" alt="">
            <span>收起</span>
          </div>
          <div class="series-content">
            <div v-for="item in seriesIndexList" :key="item">
              <van-index-anchor :index="item" />
              <van-cell v-for="series in seriesData[item]" :key="series.id" :title="series.name" is-link @click="selectSeriesAction(series)"/>
            </div>
          </div>
        </div>
      </van-popup>
      <van-popup
        get-container="#first-content"
        v-model="showModelPopup"
        position="right"
        :close-on-click-overlay="false"
        :overlay="false"
        class="model-popup"
      > <!-- model展出层 -->
        <div class="model-panel">
          <div class="top" @click="modelBackAction">
            <img src="@/assets/icon/icon-back.png" alt="">
            <span>收起</span>
          </div>
          <div class="model-content">
            <van-cell v-for="model in modelData" :key="model.id" :title="model.name" @click="selectModelAction(model)"/>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { evaluateBrandRequest, evaluateSeriesRequest, evaluateModelsRequest } from '@/apis/loansRequest.js'
import commonJs from '@/common/js/public.js'
export default {
  computed: {
    searchPlaceholder () {
      let key = ''
      if (this.state === 1) {
        key = '品牌'
      } else if (this.state === 2) {
        key = '系列'
      } else {
        key = '车型'
      }
      let text = '请输入' + key + '关键字搜索'
      return text
    }
  },
  watch: {
    'searchKey' () {
      if (this.searchKey.length === 0) {
        if (this.state === 1) {
          this.brandIndexList = this.brandIndexListBackup
          this.brandData = this.brandDataBackup
        } else if (this.state === 2) {
          this.seriesIndexList = this.seriesIndexListBackup
          this.seriesData = this.seriesDataBackup
        } else {
          this.modelData = this.modelDataBackup
        }
      } else {
        this.searchAction()
      }
    }
  },
  data () {
    return {
      originData: [],
      state: 1,
      brandIndexListBackup: [],
      brandDataBackup: {},
      brandArrData: [],
      seriesIndexListBackup: [],
      seriesDataBackup: {},
      seriesArrData: [],
      modelDataBackup: [],
      brandIndexList: [],
      brandData: {},
      seriesIndexList: [],
      seriesData: {},
      modelData: [],
      searchKey: '',
      recentBrand: [],
      showSeriesPopup: false,
      showModelPopup: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    searchAction: commonJs._debounce(function (_type, index, item) {
      if (this.searchKey) {
        this.searchDataAction()
      }
    }, 300),
    init () {
      if (this.$store.getters.recentBrand) {
        this.recentBrand = JSON.parse(this.$store.getters.recentBrand)
      }
      this.loadBrand()
    },
    searchButtonAction () {
      if (this.state === 1) {
        this.$emit('select')
        this.resetData()
      } else {
        this.state--
      }
    },
    searchDataAction () {
      if (this.state === 1) {
        if (this.brandArrData.length === 0) return
        let resultArr = this.brandArrData.filter(ele => ele.brandName.indexOf(this.searchKey) !== -1)
        this.brandData = {
          '': resultArr.map(ele => {
            return {
              id: ele.id,
              name: ele.brandName
            }
          })
        }
        this.brandIndexList = ['']
      } else if (this.state === 2) {
        if (this.seriesArrData.length === 0) return
        let resultArr = this.seriesArrData.filter(ele => ele.series.indexOf(this.searchKey) !== -1)
        this.seriesData = {
          '': resultArr.map(ele => {
            return {
              id: ele.id,
              name: ele.series
            }
          })
        }
        this.seriesIndexList = ['']
      } else {
        let resultArr = this.modelDataBackup.filter(ele => ele.name.indexOf(this.searchKey) !== -1)
        this.modelData = resultArr
      }
    },
    loadBrand () {
      evaluateBrandRequest({}).then(res => {
        if (res.code === 0) {
          this.brandArrData = []

          let arr = res.data.map(ele => {
            return ele.brandNamePinyin
          })

          this.brandIndexListBackup = Array.from(new Set(arr)).sort()
          this.brandIndexListBackup.unshift('最')

          this.brandDataBackup = {}
          this.brandIndexListBackup.forEach((ele, index) => {
            if (index === 0) {
              this.brandDataBackup[ele] = this.recentBrand
            } else {
              this.brandDataBackup[ele] = []
            }
          })

          res.data.forEach(ele => {
            this.brandDataBackup[ele.brandNamePinyin].push({
              id: ele.id,
              name: ele.brandName
            })
            this.brandArrData.push({...ele})
          })

          this.brandIndexList = this.brandIndexListBackup
          this.brandData = this.brandDataBackup
        }
      })
    },
    loadBrandSeries (brand) {
      let req = {
        brand_id: brand
      }
      this.tLoading()
      evaluateSeriesRequest(req).then(res => {
        this.tClear()
        this.seriesIndexListBackup = []
        this.seriesDataBackup = {}
        if (res.code === 0) {
          res.data.forEach(ele => {
            this.seriesIndexListBackup.push(ele.manufacturer)
          })
          this.seriesIndexListBackup = Array.from(new Set(this.seriesIndexListBackup))

          this.seriesIndexListBackup.forEach(ele => {
            this.seriesDataBackup[ele] = []
          })

          res.data.forEach(ele => {
            this.seriesDataBackup[ele.manufacturer].push({
              id: ele.id,
              name: ele.series
            })
            this.seriesArrData.push({...ele})
          })

          for (const key in this.seriesDataBackup) {
            this.seriesDataBackup[key] = this.seriesDataBackup[key].sort((a, b) => {
              return a.name.localeCompare(b.name)
            })
          }

          this.state++

          this.seriesIndexList = this.seriesIndexListBackup
          this.seriesData = this.seriesDataBackup

          this.showSeriesPopup = true
        }
      })
    },
    loadSeriesModels (series) {
      let req = {
        series_id: series
      }
      evaluateModelsRequest(req).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.modelDataBackup = res.data.map(ele => {
            return {
              id: ele.id,
              name: ele.model
            }
          }).sort((a, b) => {
            return b.name.localeCompare(a.name)
          })
          this.state++

          this.modelData = this.modelDataBackup
          this.showModelPopup = true
        }
      })
    },
    seriesBackAction () {
      if (this.state === 2) {
        this.state--
        this.showSeriesPopup = false
      }
    },
    modelBackAction () {
      if (this.state === 3) {
        this.state--
        this.showModelPopup = false
      }
    },
    selectBrandAction (item) {
      if (this.state === 1) {
        if (this.recentBrand.filter(ele => ele.name === item.name).length === 0) {
          this.recentBrand.unshift(item)
          if (this.recentBrand.length > 5) this.recentBrand.pop()
          this.$store.dispatch('setRecentBrand', {
            recentBrand: JSON.stringify(this.recentBrand)
          })
        }

        this.searchKey = ''
        this.originData.push(item)
        this.loadBrandSeries(item.id)
      }
    },
    selectSeriesAction (item) {
      if (this.state === 2) {
        this.searchKey = ''
        this.originData.push(item)
        this.loadSeriesModels(item.id)
      }
    },
    selectModelAction (item) {
      if (this.state === 3) {
        this.searchKey = ''
        this.originData.push(item)
        this.$emit('select', this.originData)
        this.resetData()
      }
    },
    resetData () {
      this.state = 1
      this.originData = []
      this.brandIndexList = []
      this.brandData = {}
      this.seriesIndexList = []
      this.seriesData = {}
      this.modelData = []
      this.searchKey = ''
      this.showSeriesPopup = false
      this.showModelPopup = false
      this.loadBrand()
    }
  }
}
</script>
<style lang='scss' scoped>
.car-popup /deep/ {
  height: 100vh;

  ::-webkit-scrollbar {
    display:none;
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

  .content-block {
    height: calc(100% - #{$searchBarHeight});
    overflow: auto;
    position: relative;

    .recent-block {
      padding: 11px 20px 16px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: rgba(100, 100, 100, 1);
      font-size: 11px;
      font-family: PingFangSC-Regular;

      .label {
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 5px 17px;
        margin: 5px 10px 0px 0px;
      }
    }

    .van-cell:not(:last-child)::after {
      left: 0;
    }

    .top {
      display: flex;
      align-items: center;
      padding: 12px 10px;
      font-size: 13px;
      color: rgba(0, 0, 0, .85);

      img {
        width: 16px;
        height: 16px;
        transform: rotate(180deg);
        margin-right: 6px;
      }
    }

    .series-popup {
      height: calc(100% - #{$searchBarHeight});
      width: 80%;
      top: calc(50% + calc(#{$searchBarHeight} / 2.0));
      bottom: 0;

      .series-panel {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        border-left: 1px solid rgba(228, 229, 230, 1);

        .series-content {
          height: calc(100% - 42px);
          overflow: auto;
        }

      }
    }

    .model-popup {
      height: calc(100% - #{$searchBarHeight});
      width: 60%;
      top: calc(50% + calc(#{$searchBarHeight} / 2.0));
      bottom: 0;

      .model-panel {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        border-left: 1px solid rgba(228, 229, 230, 1);

        .model-content {
          height: calc(100% - 42px);
          overflow: auto;
        }

      }
    }
  }

  .van-index-anchor {
    background: rgb(239, 240, 242);
  }
}
</style>
