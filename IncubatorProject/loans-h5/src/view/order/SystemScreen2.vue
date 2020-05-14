<template>
  <div class='SystemScreen'>
    <div class="loansBlock">
      <div class="loansTitle">
        <span>{{product.product_name || '-'}}</span>
        <div class="button" @click="selectProductAction" v-if="!isSetProduct">选择产品</div>
      </div>
      <div class="loansInfo">
        <div class="item">
          <p>{{audit.amount ? audit.amount : '-'}}</p>
          <p>审批额度</p>
        </div>
        <div class="item">
          <p>{{audit.monthly_rate ? audit.monthly_rate : '-'}}</p>
          <p>月利率</p>
        </div>
        <div class="item">
          <p>{{audit.time_limit || '-'}}</p>
          <p>申请期限</p>
        </div>
      </div>
      <div class="other">
        <van-field v-model="otherCost" type="number" label="其他费用：" placeholder="请输入" />
      </div>
    </div>
    <div class="panel">
      <van-field v-model="info.user_name" label="姓名" readonly />
      <van-field v-model="info.id_card_no" label="身份证号码" readonly />
      <van-field v-model="info.mobile" label="联系电话" readonly />
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
            <img class="real-img" @click="showImagePreview(0)" :src="screenInfo.id_card_front_img_url">
          </div>
        </div>
        <div class="img-panel">
          <div class="content">
            <img class="real-img" @click="showImagePreview(1)" :src="screenInfo.id_card_back_img_url">
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
            <img class="real-img" @click="showImagePreview(2)" :src="screenInfo.vehicle_license_front_img_url">
          </div>
        </div>
        <div class="img-panel">
          <div class="content">
            <img class="real-img" @click="showImagePreview(3)" :src="screenInfo.vehicle_license_duplicate_img_url">
          </div>
        </div>
      </div>
      <div class="remark">
        备注：
      </div>
    </div>
    <div class="buttonPanel" v-if="!isSetProduct">
      <van-button class="button1" @click="noticeModifyAction">通知客人修改</van-button>
      <van-button class="button2" type="danger" :disabled="!isSetProduct" @click="submitAction">确定OK</van-button>
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
    <van-image-preview v-model="showPreview" :images="showImages" :startPosition="previewIndex" @change="onChange">
      <template v-slot:index>第{{ previewIndex + 1 }}页</template>
    </van-image-preview>
    <van-popup v-model="showProductPopup" position="bottom" class="product-popup">
      <loans-list :select="true" @select="loansSelectAction"></loans-list>
    </van-popup>
  </div>
</template>
<script>
import { getLoanOrderInfo, createSystemScreenQrcode, postLoanPassScreen, noticeModifyScreen } from '@/apis/api.js'
import html2canvas from 'html2canvas'
import jrQrcode from 'jr-qrcode'
import LoansList from '@/view/loans/LoansList'
export default {
  components: {
    LoansList
  },
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
      dataURL: '',
      showQrcodePicker: false,
      qrcode: '',
      timerSec: 0,
      timer: '',
      info: {},
      product: {},
      audit: {},
      screenInfo: {},
      showPreview: false,
      showImages: '',
      previewIndex: 0,
      showProductPopup: false
    }
  },
  computed: {
    isSetProduct () {
      return this.product.product_name
    }
  },
  created () {
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
          let date1 = this.moment(res.data.expire_in * 1000)
          let date2 = this.moment(new Date())
          let date3 = date1.diff(date2, 'minute')// 计算相差的分钟数
          let h = Math.floor(date3 / 60)// 相差的小时数
          let mm = date3 % 60// 计算相差小时后余下的分钟
          this.info = {
            ...res.data,
            expire_time: h + ':' + mm
          }
          this.product = res.data.product
          this.audit = res.data.audit
          this.screenInfo = res.data.screen_info
          this.showImages = [
            this.screenInfo.id_card_front_img_url,
            this.screenInfo.id_card_back_img_url,
            this.screenInfo.vehicle_license_front_img_url,
            this.screenInfo.vehicle_license_duplicate_img_url
          ]
        }
      })
    },
    submitAction () {
      let req = {
        screen_id: this.screenInfo.screen_id,
        product_id: this.audit.id
      }
      postLoanPassScreen(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('选择成功').then(res => {
            this.$router.go(-1)
          })
        }
      })
    },
    createQrcode () {
      let req = {
        order_id: this.$route.query.order_id
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
      html2canvas(document.querySelector('#content'), {
        async: true,
        scrollY: -scrollY,
        scrollX: -scrollX
      }).then(canvas => {
        let dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
        this.tClear()
      })
    },
    showImagePreview (index) {
      this.previewIndex = index
      this.showPreview = true
    },
    onChange (index) {
      this.previewIndex = index
    },
    selectProductAction () {
      this.showProductPopup = true
    },
    loansSelectAction (item) {
      console.log(item)
      this.showProductPopup = false
      this.audit.id = item.id
      this.audit.amount = item.amount
      this.audit.monthly_rate = item.monthly_rate
      this.product.product_name = item.product_name
    },
    noticeModifyAction () {
      let req = {
        screen_id: this.screenInfo.screen_id
      }
      noticeModifyScreen(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('通知成功')
        }
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
      font-size 1rem
      font-weight 600

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
