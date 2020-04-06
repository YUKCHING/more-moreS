<template>
  <div class='CashWithdrawal'>
    <div class="panel">
      <div class="top">
        <span>提现方式</span>
        <div class="wechat">
          <img src="@/assets/icon/icon-wechat.png">
          <span>微信</span>
        </div>
      </div>
      <div class="middle">
        <p>提现金额</p>
        <div class="input">
          ￥<van-field v-model="withMoney" placeholder="输入提现金额" type="number"/>
        </div>
      </div>
      <div class="bottom">
        可提现￥{{maxMoney}}，
        <span class="tag" @click="allWithdrawalAction">全部提现</span>
      </div>
    </div>
    <div class="confirm" @click="withAction">提现</div>
  </div>
</template>
<script>
import { getWithdraw } from '@/apis/api.js'
export default {
  data () {
    return {
      maxMoney: Number(this.$route.query.money),
      withMoney: ''
    }
  },
  methods: {
    allWithdrawalAction () {
      this.withMoney = this.maxMoney
    },
    withAction () {
      let req = {
        amount: this.withMoney
      }
      getWithdraw(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('提现成功')
          this.$router.push({
            path: '/homepage'
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.CashWithdrawal
  height 100%
  background #FAFAFA
  padding 2rem
  box-sizing border-box

  .panel
    background #ffffff
    border-radius 5px
    font-size 1.17rem

    .top
      padding 1rem
      display flex
      justify-content space-between
      align-items center

      .wechat
        display inline-flex
        align-items center

        img
          width 1.92rem
          margin-right .5rem

    .middle
      padding 1rem
      border-top 1px solid rgba(151, 151, 151, .1)
      border-bottom 1px solid rgba(151, 151, 151, .1)

      .input
        display flex
        align-items flex-end
        margin-top 1rem
        font-size 2rem

      .van-cell
        padding 0
        display inline-block
        width calc(100% - 20px)
        font-size 2rem

    .bottom
      display flex
      align-items center
      padding 1rem 1rem
      font-size .2rem

      .tag
        color #FF2F2F
        cursor pointer

  .confirm
    margin-top 5rem
    text-align center
    padding 1rem 0
    color #ffffff
    letter-spacing 5px
    background linear-gradient(to right, #FF7952 0%, #FE3525 100%)
    border-radius 22.5px
</style>
