<template>
  <div class='OrderSettlement'>
    <div class="title">
      <span style="color: red;">*</span>
      <span>审核意见</span>
    </div>
    <van-field v-model="reason" type="textarea" placeholder="请输入审核意见" >
    </van-field>
    <div class="buttonPanel">
      <van-button class="button1" @click="closeAction">关 闭</van-button>
      <van-button class="button2" @click="submitAction">提 交</van-button>
    </div>
  </div>
</template>
<script>
import { postBackSettle } from '@/apis/api.js'
export default {
  data () {
    return {
      orderId: '',
      reason: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.orderId = this.$route.query.order_id
    },
    closeAction () {
      this.$router.go(-1)
    },
    submitAction () {
      if (!this.reason) {
        this.toast('请输入审核意见')
        return
      }
      let req = {
        order_id: this.orderId,
        reason: this.reason
      }
      postBackSettle(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('提交成功').then(() => {
            this.$router.go(-1)
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderSettlement /deep/
  border-top 10px solid #F2F3F5
  background #F2F3F5
  height 100%

  .title
    display flex
    justify-content flex-start
    align-items center
    padding 6px 10px
    background #E8E9EB
    color rgba(0, 0, 0, .5)
    font-size 1rem
    font-weight 600

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
