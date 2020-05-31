<template>
  <div class='SystemScreen'>
    <div class="loansBlock">
      <div class="loansTitle">
        <span>{{product.product_name || '-'}}</span>
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
        <p class="p1">{{vehicleInfo.model || '-'}}</p>
        <div class="div-info">
          <span>所在城市</span>
          <span>{{vehicleInfo.city || '-'}}</span>
        </div>
        <div class="div-info">
          <span>新车价</span>
          <span>-</span>
        </div>
        <div class="div-info">
          <span>车牌号</span>
          <span>{{vehicleInfo.plate_no || '-'}}</span>
        </div>
        <div class="div-info">
          <span>注册日期</span>
          <span>{{vehicleInfo.register_date || '-'}}</span>
        </div>
        <div class="div-info">
          <span>发证日期</span>
          <span>{{vehicleInfo.issue_date || '-'}}</span>
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
    <div class="buttonPanel">
      <van-button class="button1" @click="backAction">返回</van-button>
    </div>
    <van-image-preview v-model="showPreview" :images="showImages" :startPosition="previewIndex" @change="onChange">
      <template v-slot:index>第{{ previewIndex + 1 }}页</template>
    </van-image-preview>
    <van-popup v-model="showProductPopup" position="bottom" class="product-popup">
      <loans-list :select="true" @select="loansSelectAction"></loans-list>
    </van-popup>
  </div>
</template>
<script>
import { getLoanOrderInfo, postLoanPassScreen } from '@/apis/api.js'
import LoansList from '@/view/loans/LoansList'
export default {
  components: {
    LoansList
  },
  data () {
    return {
      otherCost: '',
      timerSec: 0,
      timer: '',
      info: {},
      product: {
        product_name: ''
      },
      audit: {},
      screenInfo: {},
      vehicleInfo: {},
      showPreview: false,
      showImages: [],
      previewIndex: 0,
      showProductPopup: false,
      isSetProduct: false
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
          if (this.product.product_name) {
            this.isSetProduct = true
          }
          this.audit = res.data.audit
          this.screenInfo = res.data.screen_info
          if (res.data.vehicle_info) {
            this.vehicleInfo = res.data.vehicle_info
          }
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
        product_id: this.product.id
      }
      postLoanPassScreen(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('选择成功').then(res => {
            this.$router.go(-1)
          })
        }
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
      this.product.id = item.id
      this.product.product_name = item.product_name
    },
    backAction () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.SystemScreen /deep/
  height 100%
  background #F2F3F5
  padding-top 12px
  box-sizing border-box
  overflow auto

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
      height 42px

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
        font-size 15px
        background #ffffff
        font-weight 600

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
        font-size 14px
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
    padding 20px 0 20px

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150
</style>
