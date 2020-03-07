<template>
  <div class="car-popup">
    <van-cell-group>
      <van-field v-model="searchKey" :placeholder="searchPlaceholder" clearable>
        <van-icon slot="left-icon" name="search" />
        <span slot="button" class="search-button" @click="searchButtonAction">{{state === 1 ? '返回' : '上一级'}}</span>
      </van-field>
    </van-cell-group>
    <div class="content">
      <div v-show="state === 1">
        <van-index-bar :index-list="brandIndexList">
          <div v-for="item in brandIndexList" :key="item">
            <van-index-anchor :index="item" />
            <van-cell v-for="brand in brandData[item]" :key="brand.id" :title="brand.name" @click="selectItem(brand)"/>
          </div>
        </van-index-bar>
      </div>
      <div v-show="state === 2">
        <div v-for="item in seriesIndexList" :key="item">
          <van-index-anchor :index="item" />
          <van-cell v-for="series in seriesData[item]" :key="series.id" :title="series.name" is-link @click="selectItem(series)"/>
        </div>
      </div>
      <div v-show="state === 3">
        <van-cell v-for="model in modelData" :key="model.id" :title="model.name" is-link @click="selectItem(model)"/>
      </div>
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
      searchKey: ''
    }
  },
  created () {
    this.loadBrand()
  },
  methods: {
    searchAction: commonJs._debounce(function (_type, index, item) {
      if (this.searchKey) {
        this.searchDataAction()
      }
    }, 300),
    searchButtonAction () {
      // if (this.searchKey) {
      //   this.searchDataAction()
      // } else {
      //   this.$emit('select')
      //   this.resetData()
      // }
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

          res.data.forEach(ele => {
            this.brandIndexListBackup.push(ele.brandNamePinyin)
          })
          this.brandIndexListBackup.sort()
          this.brandIndexListBackup = Array.from(new Set(this.brandIndexListBackup))

          this.brandDataBackup = {}
          this.brandIndexListBackup.forEach(ele => {
            this.brandDataBackup[ele] = []
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
      evaluateSeriesRequest(req).then(res => {
        if (res.code === 0) {
          res.data.forEach(ele => {
            this.seriesIndexListBackup.push(ele.manufacturer)
          })
          this.seriesIndexListBackup = Array.from(new Set(this.seriesIndexListBackup))

          this.seriesDataBackup = {}
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
        }
      })
    },
    loadSeriesModels (series) {
      let req = {
        series_id: series
      }
      evaluateModelsRequest(req).then(res => {
        if (res.code === 0) {
          this.modelDataBackup = res.data.map(ele => {
            return {
              id: ele.id,
              name: ele.model
            }
          }).sort((a, b) => {
            return b.name.localeCompare(a.name)
          })
          this.state++
          console.log(this.modelDataBackup)
          this.modelData = this.modelDataBackup
        }
      })
    },
    selectItem (item) {
      this.searchKey = ''
      this.originData.push(item)
      if (this.state === 1) {
        this.loadBrandSeries(item.id)
      } else if (this.state === 2) {
        this.loadSeriesModels(item.id)
      } else if (this.state === 3) {
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
      this.loadBrand()
    }
  }
}
</script>
<style lang='scss' scoped>
.car-popup /deep/ {
  height: 100vh;

  $searchCarHeight: 45px;
  .search-button {
    font-size: 16px;
    color: #00A7FF;
  }

  .content {
    height: calc(100% - #{$searchCarHeight});
    overflow: auto;
  }

  .van-index-anchor {
    background: rgb(239, 240, 242);
  }
}
</style>
