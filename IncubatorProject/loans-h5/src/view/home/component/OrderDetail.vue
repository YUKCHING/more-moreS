<template>
  <div class='OrderDetail'>
    <div class="block1">
      <img class="goodimg" :src="goods.thumb_url" alt="">
      <div class="info">
        <p>{{goods.name}}</p>
        <p class="price">￥{{goods.price}}</p>
      </div>
    </div>
    <div class="block2">
      <p>
        <span>优惠券：</span>
        <span>￥{{info.coupon_price}}</span>
      </p>
      <p>
        <span>运费：</span>
        <span>￥{{info.freight}}</span>
      </p>
      <p>
        <span>需付款：</span>
        <span>￥{{info.pay_amount}}</span>
      </p>
    </div>
    <div class="block3">
      <p>
        <span>订单编号：</span>
        <span>{{info.vin}}</span>
      </p>
      <p>
        <span>下单时间：</span>
        <span>{{info.order_time}}</span>
      </p>
      <p>
        <span>支付方式：</span>
        <span>{{info.payment_method === 1 ? '微信' : '其它'}}</span>
      </p>
    </div>
    <div class="bottom-block">
      <div class="button cancel-button">
        取消订单
      </div>
      <div class="button pay-button">
        去支付
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderDetail } from '@/apis/api.js'
export default {
  data () {
    return {
      orderId: this.$route.query.id,
      info: {},
      goods: {}
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let req = {
        token: this.$store.getters.token,
        order_id: this.orderId
      }
      getOrderDetail(req).then(res => {
        if (res.code === 0) {
          this.info = res.data
          this.goods = res.data.goods
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderDetail
  height 100%
  background #F6F5F5
  position relative

  .block1
    padding 1rem
    border-top 7px solid #F6F5F5
    display flex
    align-items center
    background #ffffff

    .goodimg
      width 6rem

    .info
      flex-grow 1

      .price
        color #FE3525
        margin-top 10px

  .block2
    padding 1rem 1rem .7rem
    border-top 7px solid #F6F5F5
    background #ffffff

    p
      display flex
      justify-content space-between
      align-items center
      font-size 1.17rem
      color #030303
      margin-bottom .3rem

      span:nth-child(2)
        color #FE3525

  .block3
    padding 1rem 1rem .7rem
    border-top 7px solid #F6F5F5
    background #ffffff

    p
      font-size 1.17rem
      color #030303
      margin-bottom .3rem

  .bottom-block
    background #ffffff
    position absolute
    bottom 0
    display inline-flex
    justify-content flex-end
    align-items center
    padding .8rem 1rem
    width 100%
    box-sizing border-box
    font-size 1.1rem

    .button
      padding .2rem 1rem
      box-sizing border-box
      margin-left 1rem
      border-radius 13.5px

    .cancel-button
      color #666464
      border 1px solid #666464

    .pay-button
      color #FE3525
      border 1px solid #FE3525

</style>
