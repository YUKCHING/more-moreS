<template>
  <div class='OrderRecordDetail'>
    <div class="content">
      <p class="title">订单信息</p>
      <div class="labelBlock">
        <span class="label" style="border-bottom: none">
          客户名称
        </span>
        <span class="value" style="border-bottom: none">
          {{info.user_name}}
        </span>
      </div>
      <div class="labelBlock">
        <span class="label">
          产品名称
        </span>
        <span class="value">
          {{product.product_name || '-'}}
        </span>
      </div>
    </div>
    <order-step2 :list="record"></order-step2>
  </div>
</template>
<script>
import { getLoanOrderRecord, getLoanOrderInfo } from '@/apis/api.js'
import OrderStep2 from './component/OrderStep2'
export default {
  components: {
    OrderStep2
  },
  data () {
    return {
      record: [],
      info: {},
      product: {}
    }
  },
  created () {
    this.getInfo()
    this.getDetail()
  },
  methods: {
    getInfo () {
      let req = {
        order_id: this.$route.query.order_id
      }
      getLoanOrderInfo(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.info = {
            ...res.data
          }
          this.product = res.data.product
        }
      })
    },
    getDetail () {
      let req = {
        order_id: this.$route.query.order_id
      }
      getLoanOrderRecord(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.record = res.data.map(ele => {
              return {
                ...ele
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderRecordDetail
  height 100%
  background #F2F3F5
  padding 10px 0

  .content
    background #ffffff

    .title
      font-size 14px
      font-weight 600
      padding 5px 8px

    .labelBlock
      display flex
      align-items center

      span
        display inline-block
        font-size 12px
        box-sizing border-box
        padding 10px 8px
        border-top .5px solid rgba(0, 0, 0, .1)
        border-bottom .5px solid rgba(0, 0, 0, .1)

        &:nth-child(2)
          border-left .5px solid rgba(0, 0, 0, .1)

      .label
        width 25%
        background #F7F8F9
        color rgba(0, 0, 0, .5)

      .value
        flex-grow 1
</style>
