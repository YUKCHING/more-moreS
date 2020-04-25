<template>
  <van-overlay :show="showQrOverlay" class="qr-overlay">
    <div class="panel">
      <img class="bg" src="@/assets/imgs/img-qr-bg.png">
      <div class="bg-panel">
        <img class="code" :src="codeUrl" v-if="isHaveCode">
        <img class="code" src="@/assets/imgs/img-qrcode.png" v-else>
        <p>关注我，成为泰诺用户！</p>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import { createQrCode } from '@/apis/api.js'
import jrQrcode from 'jr-qrcode'
export default {
  computed: {
    isHaveCode () {
      return this.$store.getters.webInviteCode !== 'undefined'
    }
  },
  data () {
    return {
      showQrOverlay: false,
      codeUrl: ''
    }
  },
  created () {
    this.bus.$on('showQrOverlay', () => {
      if (this.isHaveCode) {
        this.getCode()
      }
      this.showQrOverlay = true
    })
  },
  destroyed () {
    this.bus.$off('showQrOverlay', () => {
    })
  },
  methods: {
    getCode () {
      let req = {
        invite_code: this.$store.getters.webInviteCode
      }
      console.log('getCode')
      console.log(req)
      createQrCode(req).then(res => {
        if (res.code === 0) {
          this.getQrcodeImage(res.data.url)
        }
      })
    },
    getQrcodeImage (url) {
      let option = {
        padding: 5,
        width: 120, // 二维码图片宽度（默认为256px）
        height: 120, // 二维码图片高度（默认为256px
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: '#ffffff', // 二维码背景颜色（默认白色）
        foreground: '#000000' // 二维码颜色（默认黑色
      }
      this.codeUrl = jrQrcode.getQrBase64(url, option)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.qr-overlay
  display flex
  justify-content center
  align-items center

  .panel
    width 80%
    position relative

    .bg
      width 100%

    .bg-panel
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      display flex
      flex-direction column
      justify-content flex-end
      align-items center

      .code
        width 50%

      p
        color #ffffff
        font-size 1.5rem
        font-weight 500
        margin .8rem 0 1.3rem
</style>
