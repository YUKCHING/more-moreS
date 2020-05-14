<template>
  <div class='SuccssGrab'>
    <img src="@/assets/order/icon-gou.png">
    <div v-if="style === 1">
      <p>提交成功</p>
      <p><span @click="clickAction(2)">我的业务 >></span></p>
    </div>
    <div v-if="style === 2">
      <p>抢单成功，请在24小时内处理订单，</p>
      <p>否则订单将返回订单库重新抢单，</p>
      <p>进入 <span @click="clickAction(3)">我的业务 >></span></p>
    </div>
    <div v-if="style === 3">
      <p>订单已提交</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      style: 1
    }
  },
  created () {
    if (this.$route.query.style) {
      this.style = Number(this.$route.query.style)
    }
  },
  methods: {
    clickAction (tab) {
      this.$store.dispatch('setNowTab', {
        nowTab: tab
      }).then(() => {
        this.$router.push({
          path: '/index'
        })
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.SuccssGrab
  height 100%
  background #F2F3F5
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-weight 600
  font-size 20px
  box-sizing border-box
  padding-bottom 20vh
  text-align center

  img
    width 52px
    height 52px
    margin-bottom 14px

  p
    margin-bottom 5px

  span
    color #EE5B5A
    cursor pointer
</style>
