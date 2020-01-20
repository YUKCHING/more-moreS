<template>
  <div class="valuation-record">
    <div v-for="item in records" :key="item.id" class="card">
      <p class="line1">{{item.evaluated_time}}</p>
      <p class="line2">{{item.brand_name}} {{item.series_name}} {{item.model_name}}</p>
      <div class="bottom">
        <div class="left">
          参考价格
          <span style="font-size: 17px; margin-left: 10px; color: #FF4949;">{{item.refer_price}}</span>
          <span style="margin-left: 3px; color: #FF4949;">万</span>
        </div>
        <div class="right">
          <span style="margin-right: 8px">{{item.city_name}}</span>
          <span>{{item.mile_age}}.00</span>
          万公里
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { evaluateRecordsRequest, evaluateRecordsDetailRequest } from '@/apis/loansRequest.js'
export default {
  data () {
    return {
      records: []
    }
  },
  created () {
    this.loadRecord()
  },
  methods: {
    loadRecord () {
      let req = {
        page: 0,
        limit: 10000
      }
      evaluateRecordsRequest(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.records = res.data.list
        }
      })
    },
    loadDetail (itemId) {
      evaluateRecordsDetailRequest(itemId).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.valuation-record {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.card {
  margin: 0 13px;
  padding: 7px 0 10px;
  border-bottom: 1px solid #BBBBBB;
  color: #101010;
  font-family: PingFangSC-regular;
  font-size: 12px;
  box-sizing: border-box;

  .line1 {
    line-height: 30px;
  }

  .line2 {
    font-size: 14px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;

    .left {
      display: inline-flex;
      align-items: center;
    }

    .right {
      display: inline-flex;
      // font-size: 12px;
      margin-right: 5px;
    }
  }
}
</style>
