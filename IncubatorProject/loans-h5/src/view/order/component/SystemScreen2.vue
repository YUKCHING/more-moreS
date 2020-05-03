<template>
  <div class='SystemScreen'>
    <div class="loansBlock">
      <div class="loansTitle">
        <span>产品标题</span>
        <div class="button">选择产品</div>
      </div>
      <div class="loansInfo">
        <div class="item">
          <p>-</p>
          <p>审批额度</p>
        </div>
        <div class="item">
          <p>-</p>
          <p>月利率</p>
        </div>
        <div class="item">
          <p>-</p>
          <p>申请期限</p>
        </div>
      </div>
      <div class="other">
        <van-field v-model="otherCost" type="number" label="其他费用：" placeholder="请输入" />
      </div>
    </div>
    <div class="panel">
      <van-field v-model="form.name" label="姓名" readonly />
      <van-field v-model="form.idcard" label="身份证号码" readonly />
      <van-field v-model="form.phone" label="联系电话" readonly />
    </div>
    <div class="panel panel2">
      <div class="title">
        <span>车辆信息</span>
      </div>
      <div class="car-panel">
        <p class="p1">2018款 奔驰C级(进口) C 180 旅行轿车</p>
        <div class="base-info">
          <div class="card">{{form.city}}</div>
          <div class="line"></div>
          <div class="card">{{form.licensingDate}}</div>
          <div class="line"></div>
          <div class="card">{{form.mileage}}万公里</div>
          <div class="line"></div>
          <div class="card">{{form.standard}}</div>
        </div>
        <div class="base-info" style="margin-bottom: 22px;">
          <div class="card">所在城市</div>
          <div class="line"></div>
          <div class="card">上牌日期</div>
          <div class="line"></div>
          <div class="card">行程里数</div>
          <div class="line"></div>
          <div class="card">排放标准</div>
        </div>
        <div class="div-info">
          <span>车牌号</span>
          <span>粤B 34567</span>
        </div>
        <div class="div-info">
          <span>注册日期</span>
          <span>2017-01-10</span>
        </div>
        <div class="div-info">
          <span>发证日期</span>
          <span>2017-01-10</span>
        </div>
      </div>
    </div>
    <div class="panel panel2">
      <div class="title">
        <span>上传资料</span>
      </div>
      <van-field class="title-field" label="身份证" readonly/>
      <div class="img-content">
        <div class="img-panel">
          <div class="content">
            <img class="real-img" :src="imgIdcard1">
          </div>
        </div>
        <div class="img-panel">
          <div class="content">
            <img class="real-img" :src="imgIdcard2">
          </div>
        </div>
      </div>
      <div class="remark">
        备注：
      </div>
      <van-field class="title-field" label="行驶证" readonly/>
      <div class="img-content">
        <div class="img-panel">
          <div class="content">
            <img class="real-img" :src="imgCar1">
          </div>
        </div>
        <div class="img-panel">
          <div class="content">
            <img class="real-img" :src="imgCar2">
          </div>
        </div>
      </div>
      <div class="remark">
        备注：
      </div>
    </div>
    <div class="buttonPanel">
      <van-button class="button1" @click="callCustomerAction">通知客人修改</van-button>
      <van-button class="button2" type="danger" @click="submitAction">确定OK</van-button>
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
      otherCost: '',
      form: {
        name: '张三',
        idcard: '440307199405180710',
        phone: '13713697967',
        carNo: '粤B 34567',
        city: '深圳',
        licensingDate: '2017-01-02',
        mileage: '10.0',
        standard: '国5'
      },
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
    callCustomerAction () {
    },
    submitAction () {
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
  padding-top 12px

  .loansBlock
    border .6px solid rgba(0, 0, 0, .25)
    box-shadow 0px 2px 4px 0px rgba(0, 0, 0, .1)
    padding .8rem .8rem 0rem
    box-sizing border-box
    margin 0 10px 0px

    .button
      display inline-block
      background #EE5150
      color #FFFFFF
      padding 8px 15px
      border-radius 5px
      font-size 12px
      margin-bottom .8rem

    .other
      .van-cell
        background rgba(0, 0, 0, .1)
        padding 6px 8px
        margin .5rem 0
        font-size 12px

    .loansTitle
      display flex
      justify-content space-between
      align-items center
      font-size 14px

    .loansInfo
      display flex
      justify-content space-around
      align-items center

      .item
        width 30%
        display inline-flex
        flex-direction column
        align-items center
        font-size 12px

        p
          &:nth-child(2)
            color rgba(0, 0, 0, .25)
            font-size 12px
            transform scale(.9)
            margin-top 1rem

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

  .panel2
    .van-cell:not(:last-child)::after
      border-bottom 1px solid rgba(0, 0, 0, .06)

    .remark
      color rgba(0, 0, 0, .5)
      font-size 12px
      padding 0 12px 12px
      box-sizing border-box
      background #F2F3F5
      border-bottom 1px solid rgba(0, 0, 0, .06)

    .car-panel
      background #ffffff
      padding 15px 14px
      box-sizing border-box
      color rgba(0, 0, 0, .85)

      .p1
        font-size 14px
        background #ffffff

      .base-info
        display flex
        justify-content space-around
        align-items center
        color rgba(0, 0, 0, .85)
        font-size 12px
        text-align center
        margin-top 22px

        .card
          width 24%

        .line
          background rgba(0, 0, 0, .1)
          width 1px
          height 21px

      .div-info
        display flex
        align-content center
        color rgba(0, 0, 0, .85)
        font-size 15px
        margin 15px 0

        &:last-child
          margin-bottom 0

        span
          display inline-block
          &:nth-child(1)
            width 30%

          &:nth-child(2)
            flex-grow 1

  .panel
    border-top 10px solid #F2F3F5
    background #ffffff

    .title-field
      background #F2F3F5

    .title
      display flex
      justify-content space-between
      align-items center
      padding 6px 10px
      background #E8E9EB
      color rgba(0, 0, 0, .5)
      font-size .5rem

      .right
        display inline-flex
        align-items center
        color #6DD400

        img
          width 15px

      .right2
        color rgba(0, 0, 0, .85)

    .van-field__label
      color rgba(0, 0, 0, .85)

    .img-content
      padding 1rem
      display flex
      justify-content space-between
      background #F2F3F5

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

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    margin 30px 0 20px

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150
</style>
