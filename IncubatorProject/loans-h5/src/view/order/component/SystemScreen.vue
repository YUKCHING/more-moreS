<template>
  <div class='SystemScreen'>
    <div class="panel">
      <van-field v-model="username" label="姓名" required :placeholder="isInit? '-' : '请输入姓名'" :readonly="isInit" />
      <van-field v-model="id_card_no" label="身份证号码" required :placeholder="isInit ? '-' : '请输入识别身份证'" readonly>
        <van-uploader
          slot="right-icon"
          class="uploader"
          :after-read="afterReadIdCard"
          :preview-image="false"
          v-show="!isInit"
        >
          <img src="@/assets/icon/icon-camera.png" style="width: 1.5rem;">
        </van-uploader>
      </van-field>
      <van-field v-model="mobile" label="联系电话" required :placeholder="isInit ? '-' : '请输入联系电话'" :readonly="isInit" type="number" />
      <van-field v-model="verify_code" label="动态验证码" required placeholder="请输入验证码" type="number" v-if="!isInit">
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
          :disabled="isInit"
        >
          <div class="content">
            <img class="real-img" :src="id_card_front_img_url" v-if="id_card_front_img_url">
            <img v-else src="@/assets/order/icon-screen-idcard1.png">
          </div>
          <p class="des">点击上传身份证正面</p>
        </van-uploader>
        <van-uploader
          :after-read="afterRead2"
          :preview-image="false"
          class="img-panel"
          :disabled="isInit"
        >
           <div class="content">
            <img class="real-img" :src="id_card_back_img_url" v-if="id_card_back_img_url">
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
          :disabled="isInit"
        >
          <div class="content">
            <img class="real-img" :src="vehicle_license_front_img_url" v-if="vehicle_license_front_img_url">
            <img v-else src="@/assets/order/icon-screen-car1.png">
          </div>
          <p class="des">点击上传行驶证首页</p>
        </van-uploader>
        <van-uploader
          :after-read="afterRead4"
          :preview-image="false"
          class="img-panel"
          :disabled="isInit"
        >
          <div class="content">
            <img class="real-img" :src="vehicle_license_duplicate_img_url" v-if="vehicle_license_duplicate_img_url">
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
      <div class="pop-block" id="content" ref="content">
        <div class="top">
          <div class="button">
            请扫码进行系统初筛
          </div>
        </div>
        <div class="qrcode-block">
          <img src="@/assets/order/share-bottom.png">
          <p class="exp">- 长按可保存图片 -</p>
          <img class="qrcode-img" :src="qrcode">
        </div>
        <img class="show-img" :src="dataURL">
      </div>

    </van-popup>
  </div>
</template>
<script>
import { createSystemScreenQrcode, uploadIdCard, postSystemScreen, sendVerifyCode, uploadImageRequest } from '@/apis/api.js'
import html2canvas from 'html2canvas'
import jrQrcode from 'jr-qrcode'
export default {
  data () {
    return {
      isInit: false,
      order_id: '',
      username: '',
      mobile: '',
      verify_code: '',
      id_card_no: '',
      id_card_front_img_url: '',
      id_card_back_img_url: '',
      vehicle_license_front_img_url: '',
      vehicle_license_duplicate_img_url: '',
      ocr_id: '',
      showQrcodePicker: false,
      qrcode: '',
      dataURL: '',
      timerSec: 0,
      timer: ''
    }
  },
  created () {
    this.isInit = this.$route.query.isInit === '1'
    this.order_id = this.$route.query.order_id
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    callButtonAction () {
      this.createQrcode()
    },
    submitAction () {
      if (this.username === '' || this.mobile === '' || this.verify_code === '') {
        this.toast('请填写基本信息')
        return
      }
      if (this.ocr_id === '') {
        this.toast('请上传身份证')
        return
      }
      if (this.id_card_front_img_url === '' || this.id_card_back_img_url === '' || this.vehicle_license_front_img_url === '' || this.vehicle_license_duplicate_img_url === '') {
        this.toast('请上传照片')
        return
      }
      let req = {
        order_id: this.order_id,
        username: this.username,
        mobile: this.mobile,
        verify_code: this.verify_code,
        id_card_no: this.id_card_no,
        id_card_front_img_url: this.id_card_front_img_url,
        id_card_back_img_url: this.id_card_back_img_url,
        vehicle_license_front_img_url: this.vehicle_license_front_img_url,
        vehicle_license_duplicate_img_url: this.vehicle_license_duplicate_img_url,
        ocr_id: this.ocr_id
      }
      this.tLoading()
      postSystemScreen(req).then(res => {
        console.log(res)
        this.tClear()
        if (res.code === 0) {
          this.$router.push({
            path: '/sucpage',
            query: {
              style: 1
            }
          })
        }
      })
    },
    getPhoneCodeAction () {
      if (this.timerSec > 0) return

      let req = {
        phone: this.mobile,
        scene: 'bind_phone'
      }

      sendVerifyCode(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tSuccess('获取成功')

          this.timerSec = 60
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.timerSec--
            if (this.timerSec <= 0) {
              clearInterval(this.timer)
            }
          }, 1000)
        }
      })
    },
    afterReadIdCard (file) {
      var formdata = new FormData()
      formdata.append('img', file.file)
      uploadIdCard(formdata).then(res => {
        if (res.code === 0) {
          this.ocr_id = res.data.ocr_id
          this.id_card_no = res.data.id_card_number
          this.username = res.data.name
        }
      })
    },
    afterRead1 (file) {
      var formdata = new FormData()
      formdata.append('picture', file.file)
      uploadImageRequest(formdata).then(res => {
        if (res.code === 0) {
          this.id_card_front_img_url = res.data.url
        }
      })
    },
    afterRead2 (file) {
      var formdata = new FormData()
      formdata.append('picture', file.file)
      uploadImageRequest(formdata).then(res => {
        if (res.code === 0) {
          this.id_card_back_img_url = res.data.url
        }
      })
    },
    afterRead3 (file) {
      var formdata = new FormData()
      formdata.append('picture', file.file)
      uploadImageRequest(formdata).then(res => {
        if (res.code === 0) {
          this.vehicle_license_front_img_url = res.data.url
        }
      })
    },
    afterRead4 (file) {
      var formdata = new FormData()
      formdata.append('picture', file.file)
      uploadImageRequest(formdata).then(res => {
        if (res.code === 0) {
          this.vehicle_license_duplicate_img_url = res.data.url
        }
      })
    },
    createQrcode () {
      let req = {
        order_id: this.order_id
      }
      this.tLoading()
      createSystemScreenQrcode(req).then(res => {
        if (res.code === 0) {
          let url = res.data.url
          this.getQrcodeImage(url)
        } else {
          this.tClear()
        }
      })
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
      this.showQrcodePicker = true
      setTimeout(() => {
        this.getHtmlImage()
      }, 2000)
    },
    getHtmlImage () {
      var scrollY = this.$refs['content'].scrollTop
      var scrollX = this.$refs['content'].scrollLeft
      console.log(scrollY)
      console.log(scrollX)
      html2canvas(document.querySelector('#content'), {
        async: true,
        scrollY: -scrollY,
        scrollX: -scrollX
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
  background #F2F3F5

  .pop-block
    position relative

    .top
      text-align center
      padding 5px 0

      .button
        display inline-block
        color #ffffff
        font-size 12px
        border-radius 5px
        padding 9px 19px
        background #EE5150

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

    .show-img
      position absolute
      top 0
      height 100%
      width 100%

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
