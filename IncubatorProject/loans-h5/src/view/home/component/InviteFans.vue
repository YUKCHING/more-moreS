<template>
  <div class='InviteFans'>
    <div class="panel" id="content">
      <div class="top">
        <img src="https://tainuocar.oss-cn-zhangjiakou.aliyuncs.com/my-share/image/17ANSQDUykOdkrW69G.png">
        <div class="line"></div>
        <span class="banner">
          做车贷  找泰诺
        </span>
      </div>
      <div class="content">
        <p class="p1">分享海报</p>
        <p class="p2">超10款车贷产品，总有一款适合您！</p>
        <p class="p2">咱们做车贷找泰诺！</p>
        <div class="img-block">
          <img :src="imgUrl">
          <van-uploader
            class="uploader"
            :after-read="afterRead"
            :preview-image="false"
          />
        </div>
        <div class="edit-block">
          <div class="left">
            <van-field
              v-model="writing"
              type="textarea"
              autosize
              clearable
              placeholder="请在此输入您的分享文案"
            />
            <div class="info">
              <img :src="userInfo.avatar" alt="">
              <span>{{userInfo.username}}</span>
            </div>
          </div>
          <img class="right" :src="codeUrl">
        </div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="bottom1" @click="shareAction">
        <img src="@/assets/icon/icon-share.png" alt="">
        点击分享
      </div>
      <div class="bottom2" @click="createImgAction">
        <img src="@/assets/icon/icon-download.png" alt="">
        生成照片
      </div>
    </div>
    <van-image-preview v-model="showPreview" :images="[shareUrl]">
    </van-image-preview>
    <!-- <img :src="shareUrl" style="width: 100%"> -->
  </div>
</template>
<script>
import { createQrCode, shareUploadImage } from '@/apis/api.js'
// import imgProcessor from '@/common/js/ImageProcessor.js'
import jrQrcode from 'jr-qrcode'
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      imgUrl: 'https://tainuocar.oss-cn-zhangjiakou.aliyuncs.com/my-share/image/17bFj3QLUhkoKOtYF7.png',
      codeUrl: '',
      shareUrl: '',
      userInfo: this.$store.getters.userInfo,
      writing: '',
      showPreview: false
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    shareAction () {

    },
    createImgAction () {
      this.getHtmlImage()
    },
    getCode () {
      let req = {
        invite_code: this.userInfo.invite_code
      }
      createQrCode(req).then(res => {
        if (res.code === 0) {
          this.getQrcodeImage(res.data.url)
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
      this.codeUrl = jrQrcode.getQrBase64(url, option)

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
    afterRead (file) {
      let item = file.file
      item.name = 'picture'
      console.log(item)
      // imgProcessor.uploadImage(file).then(formData => {
      //   console.log('123123')
      //   this.uploadShareImage(formData)
      // })
      // let fileItem = new File([file], file.name)
      // console.log(typeof (fileItem))
      // this.uploadShareImage(fileItem)
    },
    uploadShareImage (file) {
      let req = {
        picture: file
      }
      console.log(req)
      shareUploadImage(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.imgUrl = res.data.url
        }
      })
    },
    getHtmlImage () {
      html2canvas(document.querySelector('#content'), {
        async: true,
        useCORS: true
      }).then(canvas => {
        this.shareUrl = canvas.toDataURL('image/png')
        this.showPreview = true
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.InviteFans /deep/
  height 100%
  padding 3px 2rem
  box-sizing border-box

  .van-cell
    padding 0

  .panel
    background linear-gradient(to bottom, #FC7550 0%, #FC3726 100%)
    border-radius 0.83rem
    padding-bottom .7rem

    .top
      display flex
      align-items center
      justify-content space-between
      padding 1rem

      img
        height 2.5rem

      .line
        width 0.08rem
        background #ffffff
        height 1.33rem

      .banner
        display inline-block
        color #ffffff
        letter-spacing 3px
        font-size 1.25rem

    .content
      background #ffffff
      border-radius .67rem
      box-sizing border-box
      margin 0 .7rem
      padding 1rem .8rem

      .p1
        color #000000
        font-size 1.33rem
        font-weight 600

      .p2
        font-size 1.1rem
        margin-top .2rem
        color rgba(0, 0, 0, .8)

      .img-block
        width 100%
        margin-top .8rem
        position relative

        .uploader
          position absolute
          left calc(50% - 30px)
          top calc(50% - 30px)

        .van-uploader__upload
          width 60px
          height 60px

        img
          width 100%

      .edit-block
        display flex

        .left
          flex-grow 1
          display inline-flex
          flex-direction column

          .info
            display flex
            align-items center
            font-size 1.08rem

            img
              width 2rem
              height 2rem
              border-radius 50%
              margin-right 5px

        .right
          width 6.33rem
          height 6.33rem
          margin-left .5rem

  .bottom-block
    margin-top 2rem
    display flex
    justify-content space-around
    align-items center
    color #ffffff

    .bottom1
      display inline-flex
      background linear-gradient(to right, #FC7550 0%, #FC3726 100%)
      align-items center
      justify-content space-around
      font-size 1.25rem
      letter-spacing 3px
      padding 1rem 2rem
      border-radius 22px

      img
        width 1.23rem
        margin-right 10px

    .bottom2
      display inline-flex
      flex-direction column
      justify-content center
      align-items center
      background #338AFF
      border-radius 22px
      font-size 1rem
      padding .6rem 1.5rem

      img
        width 1.23rem

</style>
