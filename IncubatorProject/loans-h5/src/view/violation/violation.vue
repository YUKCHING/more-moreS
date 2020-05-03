<template>
  <div class="violation">
    <div class="top-block">
      <p>有违章 早知道</p>
      <p class="p2">免费查询，官方同步</p>
    </div>
    <div class="content-block">
      <van-form @submit="onSubmit">
        <p class="label">VIN码</p>
        <van-field
          v-model="vin"
          placeholder="请输入17位VIN码"
          :rules="[{ required: false, message: '请输入17位VIN码', trigger: 'onBlur' }]"
          class="border-bottom"
          clearable
        >
          <van-uploader
            slot="right-icon"
            class="uploader"
            :after-read="afterRead"
            :preview-image="false"
          >
            <img src="@/assets/icon/icon-camera.png" style="width: 1.5rem;">
          </van-uploader>
        </van-field>
        <p class="label">发动机号</p>
        <van-field
          v-model="engine_no"
          placeholder="请输入发动机号"
          :rules="[{ required: false, message: '请输入发动机号' }]"
          class="border-bottom"
          clearable
        >
          <van-uploader
            slot="right-icon"
            class="uploader"
            :after-read="afterRead"
            :preview-image="false"
          >
            <img src="@/assets/icon/icon-camera.png" style="width: 1.5rem;">
          </van-uploader>
        </van-field>
        <p class="label">车牌号码</p>
        <div class="plate-block border-bottom">
          <p class="plate-select" @click="showPicker = true">
            <span style="color: #FF2323;">{{plate_first}}</span>
            <img src="@/assets/icon/icon-arrow-down.png" />
          </p>
          <van-field
            v-model="plate_show"
            placeholder="请输入车牌号码"
            :rules="[{ required: true, message: '请输入车牌号码' }]"
            class="plate-field"
            clearable
          />
        </div>
        <div style="margin: 4rem;">
          <van-button round block type="info" native-type="submit" style="background: linear-gradient(to right, #FF7952 0%, #FE3525 100%); border: none">
            查询
          </van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onPickerConfirm"
      />
    </van-popup>
    <qr-overlay></qr-overlay>
  </div>
</template>
<script>
import { uploadDriverLicense } from '@/apis/api'
import initLoginCheckInfo from '@/common/js/login.js'
// import imgProcessor from '@/common/js/ImageProcessor.js'
import QrOverlay from '@/components/QrOverlay'
export default {
  components: {
    QrOverlay
  },
  data () {
    return {
      vin: '',
      engine_no: '',
      plate_show: '',
      plate_first: '粤',
      ocr_id: '',
      columns: ['粤', '京', '沪', '津', '渝', '鲁', '冀', '晋', '蒙', '辽', '吉', '黑', '苏', '浙', '皖', '闽', '赣', '豫', '湘', '鄂', '桂', '琼', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台'],
      showPicker: false
    }
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let title = '泰诺汽车平台-违章查询'
      let des = '一键识别，有违章，早知道，免费查询，官方同步。'
      if (!window.isReady) {
        initLoginCheckInfo(this.$route).then(info => {
          if (info && info.code === -1000104) {
            this.bus.$emit('showQrOverlay')
            return
          }
          // 分享设置
          let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
          this.initWxShare(window.shareUrl, title, des, shareLink)
          window.isReady = true
        })
      } else {
        // 分享设置
        let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
        this.initWxShare(window.shareUrl, title, des, shareLink)
      }

      if (this.$store.getters.violationInfo) {
        let item = this.$store.getters.violationInfo
        this.vin = item.vin
        this.engine_no = item.engine_no
        this.plate_first = item.plate_first
        this.plate_show = item.plate_show
        this.ocr_id = item.ocr_id
      }
    },
    onSubmit (values) {
      this.createAction()
    },
    onPickerConfirm (value) {
      this.plate_first = value
      this.showPicker = false
    },
    afterRead (file) {
      console.log(file)
      this.uploadDriverImage(file.file)
      // imgProcessor.uploadOrigin(file, 'license_img').then(formData => {
      //   this.uploadDriverImage(formData)
      // })
    },
    uploadDriverImage (file) {
      var formdata = new FormData()
      formdata.append('license_img', file)
      uploadDriverLicense(formdata).then(res => {
        if (res.code === 0) {
          this.vin = res.data.vin
          this.engine_no = res.data.engine_no
          this.plate_first = res.data.plate_no.slice(0, 1)
          this.plate_show = res.data.plate_no.slice(1)
          this.ocr_id = res.data.ocr_id
        }
      })
    },
    createAction () {
      this.$store.dispatch('setViolationInfo', {
        violationInfo: JSON.stringify({
          vin: this.vin,
          engine_no: this.engine_no,
          plate_first: this.plate_first,
          plate_show: this.plate_show,
          ocr_id: this.ocr_id
        })
      })
      this.$router.push({
        path: '/violationdetail',
        query: {
          vin: this.vin,
          engine_no: this.engine_no,
          license_no: this.plate_first + this.plate_show,
          ocr_id: this.ocr_id
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.violation /deep/
  height 100%
  padding 2rem 1.5rem 0
  box-sizing border-box

  .top-block
    text-align center
    font-size 1.67rem
    color #030303

    .p2
      font-size 1.17rem

  .content-block
    margin-top 4rem

    .label
      font-size 1.17rem
      color #000000
      margin 1rem 0

    .van-cell
      padding 0

      // .van-field__error-message
      //   display none

    .van-cell:not(:last-child)::after
      display none

    .border-bottom
      padding-bottom .5rem
      border-bottom 1px solid #ebedf0

    .plate-block
      display flex
      align-items center

      .plate-select
        display inline-flex
        align-items center

        span
          color #ff2323

        img
          width 1.2rem
          margin 0 .5rem

      .plate-field
        display inline
        flex-grow 1
</style>
