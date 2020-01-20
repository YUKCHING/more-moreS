<template>
  <div class="car-model">
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
    <div class="bottom-bar" @click="backAction">
      <span>返回</span>
    </div>
  </div>
</template>
<script>
import { evaluateBrandRequest, evaluateSeriesRequest, evaluateModelsRequest } from '@/apis/loansRequest.js'
export default {
  data () {
    return {
      originData: [],
      state: 1,
      brandIndexList: [],
      brandData: {},
      seriesIndexList: [],
      seriesData: {},
      modelData: []
    }
  },
  created () {
    this.loadBrand()
  },
  methods: {
    loadBrand () {
      evaluateBrandRequest({}).then(res => {
        console.log(res)
        if (res.code === 0) {
          res.data.forEach(ele => {
            this.brandIndexList.push(ele.brandNamePinyin)
          })
          this.brandIndexList.sort()
          this.brandIndexList = Array.from(new Set(this.brandIndexList))

          this.brandData = {}
          this.brandIndexList.forEach(ele => {
            this.brandData[ele] = []
          })

          res.data.forEach(ele => {
            this.brandData[ele.brandNamePinyin].push({
              id: ele.id,
              name: ele.brandName
            })
          })
        }
      })
    },
    loadBrandSeries (brand) {
      let req = {
        brand_id: brand
      }
      evaluateSeriesRequest(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          res.data.forEach(ele => {
            this.seriesIndexList.push(ele.manufacturer)
          })
          this.seriesIndexList = Array.from(new Set(this.seriesIndexList))

          this.seriesData = {}
          this.seriesIndexList.forEach(ele => {
            this.seriesData[ele] = []
          })

          res.data.forEach(ele => {
            this.seriesData[ele.manufacturer].push({
              id: ele.id,
              name: ele.series
            })
          })
          this.state++
        }
      })
    },
    loadSeriesModels (series) {
      let req = {
        series_id: series
      }
      evaluateModelsRequest(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.modelData = res.data.map(ele => {
            return {
              id: ele.id,
              name: ele.model
            }
          })
          this.state++
        }
      })
    },
    selectItem (item) {
      this.originData.push(item)
      if (this.state === 1) {
        this.loadBrandSeries(item.id)
      } else if (this.state === 2) {
        this.loadSeriesModels(item.id)
      } else if (this.state === 3) {
        this.$emit('finish', this.originData)
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
      this.loadBrand()
    },
    backAction () {
      this.$emit('back')
      this.resetData()
    }
  }
}
</script>
<style lang='scss' scoped>
.car-model {
  height: 100%;

  .content {
    height: 94%;
    overflow: auto;
  }

  .bottom-bar {
    height: 6%;
    background: blue;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
