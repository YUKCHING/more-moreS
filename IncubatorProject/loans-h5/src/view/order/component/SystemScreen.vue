<template>
  <div class='SystemScreen'>
    <div class="panel">
      <van-field v-model="form.name" label="姓名" required placeholder="请输入姓名" />
      <van-field v-model="form.idcard" label="身份证号码" required placeholder="请输入身份证号码">
        <van-uploader
          slot="right-icon"
          class="uploader"
          :after-read="afterReadIdCard"
          :preview-image="false"
        >
          <img src="@/assets/icon/icon-camera.png" style="width: 1.5rem;">
        </van-uploader>
      </van-field>
      <van-field v-model="form.phone" label="联系电话" required placeholder="请输入联系电话" />
      <van-field v-model="form.phone" label="动态验证码" required placeholder="请输入验证码" v-if="!isInit">
        <template #button>
          <span :style="{color: timerSec > 0 ? 'rgba(0,0,0,.5)' : '#298CF7'}" @click="getPhoneCodeAction">{{timerSec > 0 ? '重发 ' + timerSec + 's' : '发送验证码'}}</span>
        </template>
      </van-field>
    </div>
    <div class="panel">
      <van-field label="拍摄身份证" required readonly/>
      <div class="img-content">
        <van-uploader
          :after-read="afterRead1"
          :preview-image="false"
          class="img-panel"
        >
          <div class="content">
            <img class="real-img" :src="imgIdcard1" v-if="imgIdcard1">
            <img v-else src="@/assets/order/icon-screen-idcard1.png">
          </div>
          <p class="des">点击上传身份证正面</p>
        </van-uploader>
        <van-uploader
          :after-read="afterRead2"
          :preview-image="false"
          class="img-panel"
        >
           <div class="content">
            <img class="real-img" :src="imgIdcard2" v-if="imgIdcard2">
            <img v-else src="@/assets/order/icon-screen-idcard2.png">
          </div>
          <p class="des">点击上传身份证背面</p>
        </van-uploader>
      </div>
    </div>
    <div class="panel">
      <van-field label="拍摄行驶证" required readonly/>
      <div class="img-content">
        <van-uploader
          :after-read="afterRead3"
          :preview-image="false"
          class="img-panel"
        >
          <div class="content">
            <img class="real-img" :src="imgCar1" v-if="imgCar1">
            <img v-else src="@/assets/order/icon-screen-car1.png">
          </div>
          <p class="des">点击上传行驶证首页</p>
        </van-uploader>
        <van-uploader
          :after-read="afterRead4"
          :preview-image="false"
          class="img-panel"
        >
          <div class="content">
            <img class="real-img" :src="imgCar2" v-if="imgCar2">
            <img v-else src="@/assets/order/icon-screen-car2.png">
          </div>
          <p class="des">点击上传行驶证副页</p>
        </van-uploader>
      </div>
    </div>
    <div class="button-block" v-if="isInit">
      <div class="button" @click="callButtonAction">通知客户系统初筛</div>
    </div>
    <div class="button-block" v-if="!isInit">
      <div class="button" @click="submitAction" style="width: 50%">提交</div>
    </div>
    <van-popup v-model="showQrcodePicker" position="bottom">
      <div class="qrcode-block">
        <img src="@/assets/order/share-bottom.png">
        <p class="exp">- 长按可保存图片 -</p>
        <img class="qrcode-img" :src="qrcode">
      </div>
    </van-popup>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import jrQrcode from 'jr-qrcode'
export default {
  data () {
    return {
      isInit: false,
      form: {},
      imgIdcard1: '',
      imgIdcard2: '',
      imgCar1: '',
      imgCar2: '',
      showQrcodePicker: false,
      qrcode: '',
      timerSec: 0,
      timer: ''
    }
  },
  mounted () {
    this.createQrcode()
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    callButtonAction () {
      this.showQrcodePicker = true
    },
    submitAction () {
      this.$router.push({
        path: '/sucpage',
        query: {
          style: 1
        }
      })
    },
    getPhoneCodeAction () {
      if (this.timerSec > 0) return
      this.timerSec = 60
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.timerSec--
        if (this.timerSec <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    afterReadIdCard (file) {
      console.log(file)
    },
    afterRead1 (file) {
      console.log(file)
    },
    afterRead2 (file) {
      console.log(file)
    },
    afterRead3 (file) {
      console.log(file)
    },
    afterRead4 (file) {
      console.log(file)
    },
    createQrcode () {
      // this.tLoading('请稍等...')
      // let req = {
      //   valuation_id: this.valId
      // }
      // createValQrcode(req).then(res => {
      //   this.tClear()
      //   if (res.code === 0) {
      //     let url = res.data.url
      //     this.getQrcodeImage(url)
      //   }
      // })
    },
    getQrcodeImage (url) {
      let option = {
        padding: 0,
        width: 80, // 二维码图片宽度（默认为256px）
        height: 80, // 二维码图片高度（默认为256px
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: '#ffffff', // 二维码背景颜色（默认白色）
        foreground: '#000000' // 二维码颜色（默认黑色
      }
      this.qrcode = jrQrcode.getQrBase64(url, option)

      // var timer = null
      // timer = setInterval(() => {
      //   let img1Height = window.getComputedStyle(this.$refs.img1).height
      //   let img2Height = window.getComputedStyle(this.$refs.img2).height
      //   console.log('setInterval')
      //   if (img1Height !== '0px' && img2Height !== '0px') {
      //     console.log('getHtmlImage')
      //     this.contentHeight = window.getComputedStyle(this.$refs.content).height
      //     clearInterval(timer)
      //     this.getHtmlImage()
      //   }
      // }, 100)
    },
    getHtmlImage () {
      html2canvas(document.querySelector('#content'), {
        async: true
      }).then(canvas => {
        let dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
        this.tClear()
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.SystemScreen /deep/
  height 100%
  background #F2F3F5

  .qrcode-block
    position relative

    .exp
      position absolute
      bottom 15%
      left 5%
      font-weight 550

    img
      width 100%

    .qrcode-img
      display inline-block
      position absolute
      right 3%
      top 12%
      width 80px
      height 80px

  .button-block
    text-align center
    padding 3rem 0 1rem

    .button
      display inline-block
      color #ffffff
      font-size 18px
      background #EE5150
      padding .7rem 50px
      border-radius 4px

  .panel
    border-top 10px solid #F2F3F5
    background #ffffff

    .van-field__label
      color rgba(0, 0, 0, .85)

    .img-content
      padding 1rem
      display flex
      justify-content space-between

      .van-uploader__input-wrapper
        width 100%

      .img-panel
        width 47%

        .content
          background #F6F6F6
          width 100%
          height 106px
          border-radius 5px
          display flex
          justify-content center
          align-items center
          overflow hidden

          .real-img
            width 100%
            height 100%

        .des
          text-align center
          color rgba(0, 0, 0, .25)
          font-size 1rem
          margin-top .5rem
</style>
