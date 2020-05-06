<template>
  <div class="car-popup">
    <div class="search-topbar">
      <van-field v-model="searchKey" :placeholder="searchPlaceholder" @focus="searchBarFocus" clearable>
        <van-icon slot="left-icon" color="#F9CFD0" name="search" />
        <span slot="button" class="search-button" @click="searchButtonAction" v-show="!searchState">返回</span>
      </van-field>
      <span class="cancel" v-show="searchState" @click="cancelSearchState">取消</span>
    </div>
    <div class="content-block" id="first-content">
      <van-index-bar :index-list="brandIndexList" :sticky="false" v-show="!searchState">
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
          <div v-else-if="i === 1 && (brandIndexList.length !== 1)">
            <van-index-anchor :index="key">热门</van-index-anchor>
            <div class="hot-block">
              <div
                class="hot-item"
                v-for="item in brandData[key]"
                :key="item.name"
                @click="selectBrandAction(item)">
                <img :src="item.picurl">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <van-index-anchor :index="key" />
            <van-cell v-for="brand in brandData[key]" :key="brand.id" :title="brand.name" @click="selectBrandAction(brand)">
              <img slot="icon" :src="brand.picurl" style="width: 30px;  height: 30px; margin-right: 10px" />
            </van-cell>
          </div>
        </div>
      </van-index-bar>
      <div class="search-state-content" v-show="searchState">
        <div v-show="searchResults.length === 0">
          <div class="search-hot-block">
            <p class="title">热门搜索</p>
            <div class="hot-content">
              <span
                class="hot-item"
                v-for="(item, index) in hotSearch"
                :key="index"
                @click="selectHistoryItem(item)"
              >{{item}}</span>
            </div>
          </div>
          <div class="search-history-block">
            <p class="title">
              历史搜索
              <img class="delete" src="@/assets/icon/icon-rubbish.png" @click="deleteHistorySearch">
            </p>
            <van-cell v-for="(item, index) in searchHistory" :key="index" :title="item" @click="selectHistoryItem(item)">
            </van-cell>
          </div>
        </div>
        <div v-show="searchResults.length > 0">
          <van-cell v-for="item in searchResults" :key="item.id" :title="item.name" @click="selectSearchItem(item)">
            <img v-if="item.type === 'brand'" slot="icon" :src="item.picurl" style="width: 30px; height: 30px; margin-right: 10px" />
          </van-cell>
        </div>
      </div>
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
            <div v-for="item in modelIndexList" :key="item">
              <van-index-anchor :index="item" />
              <van-cell v-for="model in modelData[item]" :key="model.id" :title="model.name" @click="selectModelAction(model)"/>
            </div>
            <!-- <van-cell v-for="model in modelData" :key="model.id" :title="model.name" @click="selectModelAction(model)"/> -->
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { evaluateBrandRequest, evaluateSeriesRequest, evaluateModelsRequest, evaluationSearchGlobal, evaluationHotSearch } from '@/apis/api.js'
import commonJs from '@/common/js/public.js'
export default {
  computed: {
    searchPlaceholder () {
      let key = ''
      if (this.state === 1) {
        key = ''
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
      modelIndexListBackup: [],
      modelDataBackup: {},
      modelArrData: [],
      brandIndexList: [],
      brandData: {},
      seriesIndexList: [],
      seriesData: {},
      modelIndexList: [],
      modelData: {},
      searchKey: '',
      recentBrand: [],
      showSeriesPopup: false,
      showModelPopup: false,
      hotSearch: [],
      searchHistory: [],
      searchResults: [],
      searchState: false
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
    }, 1000),
    init () {
      if (this.$store.getters.recentBrand) {
        this.recentBrand = JSON.parse(this.$store.getters.recentBrand)
      }
      if (this.$store.getters.carSearchInfo) {
        this.searchHistory = this.$store.getters.carSearchInfo
      }
      this.loadBrand()
      this.loadHotSearch()
    },
    searchButtonAction () {
      if (this.state === 1) {
        this.$emit('select')
        this.resetData()
      } else if (this.state === 2) {
        this.showSeriesPopup = false
        this.state = 1
      } else {
        this.showModelPopup = false
        this.state = this.showSeriesPopup ? 2 : 1
      }
    },
    searchDataAction () {
      if (this.searchState) {
        this.searchGlobal()
        return
      }
      let keys = this.searchKey.split(' ').filter(ele => ele !== '')
      if (this.state === 1) {
        this.searchBrand(keys)
      } else if (this.state === 2) {
        this.searchSeries(keys)
      } else if (this.state === 3) {
        this.searchModel(keys)
      }
    },
    cancelSearchState () {
      this.searchState = false
      this.searchResults = []
      this.showSeriesPopup = false
      this.showModelPopup = false
      this.originData = []
      this.state = 1
    },
    searchGlobal () {
      let newIndex = this.searchHistory.findIndex(ele => ele === this.searchKey)

      if (newIndex === -1) {
        this.searchHistory.unshift(this.searchKey)
        this.$store.dispatch('setCarSearchInfo', {
          carSearchInfo: JSON.stringify(this.searchHistory)
        }).then(() => {
          this.searchHistory = this.$store.getters.carSearchInfo
        })
      }

      let req = {
        evaluate_provider: 2,
        keyword: this.searchKey
      }
      this.searchResults = []
      evaluationSearchGlobal(req).then(res => {
        if (res.code === 0) {
          if (res.data.brands) {
            res.data.brands.forEach(brand => {
              this.searchResults.push({
                id: brand.id,
                name: brand.name,
                picurl: brand.picurl || '',
                type: 'brand'
              })
              if (brand.series.length > 0) {
                brand.series.forEach(series => {
                  this.searchResults.push({
                    id: series.id,
                    name: series.name,
                    type: 'series',
                    brandId: brand.id,
                    brandName: brand.name
                  })
                })
              }
            })
          }
        }
      })
    },
    selectHistoryItem (item) {
      this.searchKey = item
    },
    selectSearchItem (item) {
      if (this.state !== 1) {
        return
      }
      if (item.type === 'brand') {
        this.state = 1
        this.tLoading()
        this.selectBrandAction(item)
      } else if (item.type === 'series') {
        this.state = 2
        this.originData.push({
          id: item.brandId,
          name: item.brandName
        })
        this.tLoading()
        this.selectSeriesAction(item)
      }
    },
    searchBrand (keys) {
      if (this.brandArrData.length === 0) return
      let resultArr = this.brandArrData.filter(ele => {
        let pass = true
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (ele.brandName.indexOf(key) === -1) {
            pass = false
            break
          }
        }
        return pass
      })
      this.brandData = {
        '': resultArr.map(ele => {
          return {
            ...ele
          }
        })
      }
      this.brandIndexList = ['']
    },
    searchSeries (keys) {
      if (this.seriesArrData.length === 0) return
      let resultArr = this.seriesArrData.filter(ele => {
        let pass = true
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (ele.series.indexOf(key) === -1) {
            pass = false
            break
          }
        }
        return pass
      })
      this.seriesData = {
        '': resultArr.map(ele => {
          return {
            id: ele.id,
            name: ele.series
          }
        })
      }
      this.seriesIndexList = ['']
    },
    searchModel (keys) {
      if (this.modelArrData.length === 0) return
      let resultArr = this.modelArrData.filter(ele => {
        let pass = true
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (ele.model.indexOf(key) === -1) {
            pass = false
            break
          }
        }
        return pass
      })
      this.modelData = {
        '': resultArr.map(ele => {
          return {
            id: ele.id,
            name: ele.model
          }
        })
      }
      this.modelIndexList = ['']
    },
    searchBarFocus (event) {
      if (this.state === 1) {
        this.searchState = true
      }
    },
    deleteHistorySearch () {
      this.$store.dispatch('setCarSearchInfo', {
        carSearchInfo: '[]'
      }).then(() => {
        this.searchHistory = this.$store.getters.carSearchInfo
      })
    },
    loadBrand () {
      this.brandIndexListBackup = []
      this.brandDataBackup = {}
      this.brandArrData = []
      this.brandIndexList = []
      this.brandData = {}
      evaluateBrandRequest({
        evaluate_provider: 2
      }).then(res => {
        if (res.code === 0) {
          let arr = res.data.map(ele => {
            return ele.brandNamePinyin
          })

          this.brandIndexListBackup = Array.from(new Set(arr)).sort()
          this.brandIndexListBackup.unshift('热')
          this.brandIndexListBackup.unshift('最')

          this.brandIndexListBackup.forEach((ele, index) => {
            if (index === 0) {
              this.brandDataBackup[ele] = this.recentBrand
            } else {
              this.brandDataBackup[ele] = []
            }
          })

          let hotBrand = ['大众', '丰田', '本田', '奥迪', '宝马', '奔驰']
          res.data.forEach(ele => {
            let item = {
              id: ele.id,
              name: ele.brandName,
              picurl: ele.picurl
            }
            if (hotBrand.indexOf(ele.brandName) !== -1) {
              this.brandDataBackup['热'].push(item)
            }

            this.brandDataBackup[ele.brandNamePinyin].push(item)
            this.brandArrData.push({
              ...ele,
              ...item
            })
          })

          this.brandIndexList = this.brandIndexListBackup
          this.brandData = this.brandDataBackup
        }
      })
    },
    loadBrandSeries (brand) {
      let req = {
        evaluate_provider: 2,
        brand_id: brand
      }
      this.seriesIndexListBackup = []
      this.seriesDataBackup = {}
      this.seriesArrData = []
      this.seriesIndexList = []
      this.seriesData = {}
      evaluateSeriesRequest(req).then(res => {
        this.tClear()
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

          this.state = 2

          this.seriesIndexList = this.seriesIndexListBackup
          this.seriesData = this.seriesDataBackup

          this.showSeriesPopup = true
        }
      })
    },
    loadSeriesModels (series) {
      let req = {
        evaluate_provider: 2,
        series_id: series
      }
      this.modelIndexListBackup = []
      this.modelDataBackup = {}
      this.modelArrData = []
      this.modelIndexList = []
      this.modelData = {}
      evaluateModelsRequest(req).then(res => {
        this.modelIndexListBackup = []
        this.modelDataBackup = {}
        this.modelArrData = []
        this.tClear()
        if (res.code === 0) {
          let yearArr = res.data.map(ele => {
            // let text = ele.model
            // let index = text.indexOf('款')
            // let key = index === -1 ? '其它款' : text.slice(index - 4, index + 1)
            // return key
            return ele.makeyear
          })
          this.modelIndexListBackup = Array.from(new Set(yearArr)).sort((a, b) => a - b)
          this.modelDataBackup = {}
          this.modelIndexListBackup.forEach((ele, index) => {
            this.modelDataBackup[ele] = []
          })

          res.data.forEach(ele => {
            // let text = ele.model
            // let index = text.indexOf('款')
            // let key = index === -1 ? '其它款' : text.slice(index - 4, index + 1)
            let key = ele.makeyear
            this.modelDataBackup[key].push({
              id: ele.id,
              name: ele.model
            })
            this.modelArrData.push({...ele})
          })

          this.modelIndexList = this.modelIndexListBackup
          this.modelData = this.modelDataBackup

          this.state = 3
          this.showModelPopup = true
        }
      })
    },
    loadHotSearch () {
      evaluationHotSearch({
        evaluate_provider: 2
      }).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.hotSearch = res.data.map(ele => {
              return ele.type_name
            })
          }
        }
      })
    },
    seriesBackAction () {
      if (this.state === 2) {
        this.state = 1
        this.showSeriesPopup = false
        this.searchKey = ''
        this.originData.splice(-1, 1)
      }
    },
    modelBackAction () {
      if (this.state === 3) {
        this.state--
        if (this.showSeriesPopup) {
          this.state = 2
          this.originData.splice(-2, 2)
        } else {
          this.state = 1
          this.originData.splice(-1, 1)
        }
        this.showModelPopup = false
        this.searchKey = ''
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
      this.searchState = false
      this.searchResults = []
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
    display: flex;
    align-items: center;

    .van-cell {
      padding: 0;
    }

    .van-field {
      display: inline-flex;
      flex-grow: 1;
      padding: 5px 7px 5px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, .5);
    }

    .van-cell:not(:last-child)::after {
      display: none;
    }

    input::-webkit-input-placeholder {
      color: rgba(255, 255, 255, .6);
    }

    .search-button {
      color: rgba(255, 255, 255, .6);
    }

    .cancel {
      color: #ffffff;
      font-size: 16px;
      display: inline-block;
      width: 13%;
      margin-left: 10px;
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

    .hot-block {
      display: flex;

      align-items: center;
      flex-wrap: nowrap;
      box-sizing: border-box;
      padding: 10px 15px;

      .hot-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin-right: 15px;

        img {
          width: 36px;
        }
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

    .search-state-content {
      height: 100%;
      overflow: auto;

      .search-hot-block {
        padding: 24px 12px 0;

        .title {
          font-size: 16px;
          font-weight: 600;
        }

        .hot-content {
          padding: 8px 0px 16px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          color: rgba(100, 100, 100, 1);
          font-size: 11px;

          .hot-item {
            border-radius: 2px;
            background-color: rgba(0, 0, 0, 0.1);
            padding: 5px 17px;
            margin: 8px 10px 0px 0px;
          }
        }
      }

      .search-history-block {
        border-top: 10px solid #F2F3F5;

        .title {
          font-size: 16px;
          font-weight: 600;
          padding: 8px 12px;
          border-bottom: 2px solid #F2F3F5;
          display: flex;
          align-items: center;

          .delete {
            width: 20px;
            margin-left: auto;
          }
        }
      }
    }
  }

  .van-index-anchor {
    background: rgb(239, 240, 242);
  }
}
</style>
