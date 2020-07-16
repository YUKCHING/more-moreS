<template>
  <div class='OrderDetail'>
    <div class="panel">
      <div class="title">
        <span>订单信息</span>
      </div>
      <div class="content">
        <div class="info-label">
          <span class="label">订单类型</span>
          <p class="value">子订单</p>
        </div>
        <!-- <div class="info-label">
          <span class="label">订单状态</span>
          <span class="status" v-show="info.status">
            {{getOrderStatusName(info.status)}}
          </span>
          <span class="value time" v-show="String(info.status) === '0' && !info.overtime">
            计时{{info.expire_time}}
          </span>
        </div> -->
        <div class="info-label">
          <span class="label">客户名称</span>
          <p class="value">{{info.user_name}}</p>
        </div>
        <div class="info-label">
          <span class="label">客户身份证号</span>
          <p class="value">{{info.id_card_no || '-'}}</p>
        </div>
        <div class="info-label">
          <span class="label">联系电话</span>
          <p class="value">{{info.mobile || '-'}}</p>
        </div>
        <van-button class="button" @click="recordDetailAction">交易记录详情</van-button>
        <order-loan-block
          :product="product"
          :audit="audit"
          :info="info"
          @select="loansSelectAction"
          :isOpen="true"
          >
        </order-loan-block>
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
      </div>
      <screen-info-preview :screenInfo="screenInfo"
        :showImages="showImages" />
    </div>
    <div class="buttonPanel">
      <van-button class="button1" :disabled="!isSetProduct" @click="assignControl">指派内控</van-button>
      <van-button class="button2" :disabled="!isSetProduct || !handler_id" type="danger" @click="submitIncomming">提交</van-button>
    </div>
    <van-popup v-model="showGeneralPopup" position="bottom" class="popup-class">
      <internal-list @select="getHandlerIdAction"></internal-list>
    </van-popup>
  </div>
</template>
<script>
import { getLoanOrderInfo, getCommissionByProduct, postLoadSubOrder } from '@/apis/api.js'
import InternalList from './InternalList'
import OrderLoanBlock from '@/components/order/OrderLoanBlock'
import ScreenInfoPreview from '@/components/order/ScreenInfoPreview'

export default {
  components: {
    InternalList, OrderLoanBlock, ScreenInfoPreview
  },
  data () {
    return {
      grade: '',
      order_id: '',
      info: {},
      product: {},
      commission: {},
      audit: {},
      screenInfo: {},
      showImages: [],
      showGeneralPopup: false,
      hasChangeProduct: false,
      handler_id: '',
      settle: {
        status: ''
      },
      isManager: false
    }
  },
  computed: {
    isSetProduct () {
      return this.product.product_name
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.order_id = this.$route.query.order_id
      this.isManager = this.$route.query.isManager === '1'
      this.grade = Number(this.$store.getters.userInfo.grade)

      this.getInfo()
    },
    getInfo () {
      let req = {
        order_id: this.order_id
      }
      getLoanOrderInfo(req).then(res => {
        if (res.code === 0) {
          let date1 = this.moment(res.data.expire_in * 1000)
          let date2 = this.moment(new Date())
          let date3 = date1.diff(date2, 'minute')// 计算相差的分钟数
          let h = Math.floor(date3 / 60)// 相差的小时数
          let mm = Math.abs(date3) % 60// 计算相差小时后余下的分钟
          if (String(h).length < 2) {
            h = '0' + h
          }
          if (String(mm).length < 2) {
            mm = '0' + mm
          }
          this.info = {
            ...res.data,
            expire_time: h + ':' + mm,
            overtime: date3 < 0
          }

          this.audit = res.data.audit
          this.screenInfo = res.data.screen_info
          this.showImages = [
            this.screenInfo.id_card_front_img_url,
            this.screenInfo.id_card_back_img_url,
            this.screenInfo.vehicle_license_front_img_url,
            this.screenInfo.vehicle_license_duplicate_img_url
          ]
          console.dir(this.screenInfo)
          if (res.data.hasOwnProperty('settle')) {
            this.settle = {
              ...res.data.settle,
              status: String(res.data.settle.status)
            }
          }
        }
      })
    },
    recordDetailAction () {
      this.$router.push({
        path: '/recordprocess',
        query: {
          order_id: this.info.order_id
        }
      })
    },
    assignControl () {
      this.showGeneralPopup = true
    },
    // 提交进件
    submitIncomming () {
      let req = {
        order_id: this.order_id,
        product_id: this.product.id,
        internal_control_id: this.handler_id
      }
      this.tLoading()
      postLoadSubOrder(req).then(res => {
        this.tClear()
        if (res.code === 0) {
          this.tSuccess('子订单已提交').then(() => {
            this.$router.go(-1)
          })
        }
      })
    },
    loansSelectAction (item) {
      this.hasChangeProduct = true
      this.product = item
      this.getCommissionByProduct()
    },
    getHandlerIdAction (item) {
      this.handler_id = item.puid
      this.showGeneralPopup = false
    },
    // 返回
    goBackAction () {
      this.$router.go(-1)
    },
    // 根据产品获取佣金配置
    getCommissionByProduct () {
      let req = {
        product_id: this.product.id
      }
      getCommissionByProduct(req).then(res => {
        if (res.code === 0) {
          if (res.data.length !== 0) {
            this.commission = res.data
          }
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderDetail
  height 100%
  background #F2F3F5
  overflow auto

  .popup-class
    height 100%

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    padding 40px 0

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150

    .button3
      color #EE5150
      border 1px solid #EE5150
      width 70%

    .button4
      background #EE5150
      width 70%

  .panel
    border-top 10px solid #F2F3F5
    background #ffffff

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

    .content
      padding .8rem

      .info-label
        display flex
        align-items center
        color #000000
        font-size 1.1rem
        margin-bottom 2rem

        .label
          width 25%
          color rgba(0, 0, 0, .5)

        .value
          flex-grow 1

        .status
          border 1px solid #E02020
          color #E02020
          padding 2px 10px
          font-size 12px

        .time
          color #E11B1B
          margin-left 20px

      .button
        display inline-block
        background #EE5150
        color #FFFFFF
        padding 8px 15px
        border-radius 5px
        font-size 12px
        margin-bottom .8rem
        height 32px
        line-height 12px

</style>
