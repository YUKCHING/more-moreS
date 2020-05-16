<template>
  <div class='OrderSettlement'>
    <div class="info-block">
      订单将产生总佣金：{{splitMonet(totalCommission)}}元，确认结算吗？
    </div>
    <div class="buttonPanel">
      <van-button class="button1" @click="closeAction">关 闭</van-button>
      <van-button class="button2" @click="submitAction">提 交</van-button>
    </div>
  </div>
</template>
<script>
import { getCommissionAssign, postPassSettle } from '@/apis/api.js'
export default {
  data () {
    return {
      orderId: '',
      totalCommission: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.orderId = this.$route.query.order_id
      this.getCommission()
    },
    getCommission () {
      let req = {
        order_id: this.orderId
      }
      getCommissionAssign(req).then(res => {
        if (res.code === 0) {
          if (res.data.commissions.length > 0) {
            console.log(res)
            res.data.commissions.forEach(ele => {
              this.totalCommission = this.totalCommission + Number(ele.commission)
            })
            console.log(this.totalCommission)
          }
        }
      })
    },
    closeAction () {
      this.$router.go(-1)
    },
    submitAction () {
      this.dConfirm('确定通过结算吗？').then(val => {
        if (val) {
          let req = {
            order_id: this.order_id
          }
          postPassSettle(req).then(res => {
            if (res.code === 0) {
              this.tSuccess('结算成功').then(() => {
                this.$router.go(-1)
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderSettlement /deep/
  background #F2F3F5
  height 100%
  position relative

  .info-block
    position absolute
    top 20%
    width calc(100% - 30px)
    padding 24px 22px
    background-color rgba(255, 255, 255, 1)
    box-shadow 0px 2px 4px 0px rgba(0, 0, 0, 0.25)
    box-sizing border-box
    margin 0 15px
    color rgba(0, 0, 0, .85)
    font-size 16px

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    padding 40px 0
    position fixed
    width 100%
    bottom 0px

    .van-button
      width 40%
      border-rdius 4px

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150
      color #ffffff
</style>
