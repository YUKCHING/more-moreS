<template>
  <div class="index">
    <div class='content' v-if="isWeixinBrowser">
      获取code
    </div>
    <div class="ban-block" v-else>
      <span>请使用微信打开页面</span>
    </div>
  </div>
</template>
<script>
import VConsole from 'vconsole'
// eslint-disable-next-line
let vConsole = new VConsole()
export default {
  beforeRouteEnter (to, from, next) {
    console.log(from)
    if (from.path === '/') {
      next()
    } else {
      next()
    }
  },
  computed: {
    isWeixinBrowser () {
      return this.judgeWeixinBrowser()
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.checkInfo() // 正式 判断场景
      // this.getOpenId('021rrFV000hO8J1XZpZ00f0HV00rrFVG') // 调试 直接获取openId
    },
    checkInfo () {
      let query = this.$route.query
      console.log(query)
      const { code } = query
      if (!code) { // 没有code 判断浏览器
        if (this.isWeixinBrowser) {
          console.log('是微信浏览器')
          let indexUrl = this.getWeixinCodeUrlToTest()
          window.location.href = indexUrl
        } else {
          console.log('不是微信浏览器')
          this.toast('请使用微信打开')
        }
      } else {
        console.log('code')
        console.log(code)
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.index
  height 100%
  background #F3F3F3

  .content
    height 100%

    .panel
      height calc(100% - 50px)
      overflow auto
      -webkit-overflow-scrolling touch

  .ban-block
    height 100%
    display flex
    justify-content center
    align-items center
    font-size 1.5rem
</style>
