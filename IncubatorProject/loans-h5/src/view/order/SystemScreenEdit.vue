<template>
  <div class='SystemScreen'>
    <div class="panel">
      <van-field v-model="username" label="姓名" required placeholder="请输入姓名" :disabled="!isVerity" />
      <van-field v-model="id_card_no" label="身份证号码" required placeholder="请输入识别身份证" :disabled="!isVerity">
        <van-uploader
          slot="right-icon"
          class="uploader"
          :after-read="afterReadIdCard"
          :preview-image="false"
          v-show="isVerity"
        >
          <img src="@/assets/icon/icon-camera.png" style="width: 1.5rem;">
        </van-uploader>
      </van-field>
      <van-field v-model="mobile" label="联系电话" required placeholder="请输入联系电话" :disabled="!isVerity" type="number" />
      <van-field v-model="verify_code" label="动态验证码" required placeholder="请输入验证码" type="number">
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
          :disabled="!isVerity"
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
          :disabled="!isVerity"
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
          :disabled="!isVerity"
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
          :disabled="!isVerity"
        >
          <div class="content">
            <img class="real-img" :src="vehicle_license_duplicate_img_url" v-if="vehicle_license_duplicate_img_url">
            <img v-else src="@/assets/order/icon-screen-car2.png">
          </div>
          <p class="des">点击上传行驶证副页</p>
        </van-uploader>
      </div>
    </div>
    <div class="button-block">
      <div class="button" @click="submitAction" style="width: 50%">{{isVerity ? '提 交' : '验 证'}}</div>
    </div>
  </div>
</template>
<script>
import { uploadIdCard, postSystemScreen, sendVerifyCode, uploadImageRequest, getLoanOrderInfo, checkVerifyCode } from '@/apis/api.js'
export default {
  data () {
    return {
      isVerity: false,
      order_id: '',
      username: '',
      mobile: '',
      verify_code: '',
      id_card_no: '',
      id_card_front_img_url: '',
      id_card_back_img_url: '',
      vehicle_license_front_img_url: '',
      vehicle_license_duplicate_img_url: '',
      idcard_ocr_id: '',
      qrcode: '',
      dataURL: '',
      timerSec: 0,
      timer: ''
    }
  },
  created () {
    this.order_id = this.$route.query.order_id
    this.getInfo()
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    getInfo () {
      let req = {
        order_id: this.$route.query.order_id
      }
      getLoanOrderInfo(req).then(res => {
        if (res.code === 0) {
          this.username = res.data.user_name
          this.mobile = res.data.mobile
          this.id_card_no = res.data.id_car_no
          this.id_card_front_img_url = res.data.screen_info.id_card_front_img_url
          this.id_card_back_img_url = res.data.screen_info.id_card_back_img_url
          this.vehicle_license_front_img_url = res.data.screen_info.vehicle_license_front_img_url
          this.vehicle_license_duplicate_img_url = res.data.screen_info.vehicle_license_duplicate_img_url
          this.idcard_ocr_id = res.data.screen_info.id_card_ocr_id
        }
      })
    },
    callButtonAction () {
      this.createQrcode()
    },
    submitAction () {
      if (!this.isVerity) {
        let req = {
          mobile: this.mobile,
          verify_code: this.verify_code,
          scene: 'bind_phone'
        }
        checkVerifyCode(req).then(res => {
          if (res.code === 0) {
            this.tSuccess('验证成功').then(() => {
              this.isVerity = true
            })
          }
        })
      } else {
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
          ocr_id: this.idcard_ocr_id
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
      }
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
          this.idcard_ocr_id = res.data.ocr_id
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
