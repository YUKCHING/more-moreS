<template>
  <div class='OrderDetail'>
    <div class="panel">
      <div class="title">
        <span>订单信息</span>
      </div>
      <div class="content">
        <div v-if="info.status > 0">
          <order-step :status="info.status"></order-step>
        </div>
        <div class="info-label">
          <span class="label">订单状态</span>
          <span class="status" v-show="info.status">
            {{getOrderStatusName(info.status)}}
          </span>
          <span class="value time" v-show="String(info.status) === '0' && !info.overtime">
            计时{{info.expire_time}}
          </span>
        </div>
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
          :identity="curIdentity"
          @select="loansSelectAction"
          :hiddenButton="true"
          >
        </order-loan-block>
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
        <div class="right" style="color: #78797A" @click="screenAction()">
          查看
          <img src="@/assets/icon/icon-arrow-right3.png">
        </div>
      </div>
      <screen-info-preview
        :screenInfo="screenInfo"
        :showImages="showImages"
      ></screen-info-preview>
    </div>
    <div class="buttonPanel">
      <van-button class="button3" @click="goBackAction">返 回</van-button>
    </div>
  </div>
</template>
<script>
import { getLoanOrderInfo, postLoanCommit, getCommissionByProduct, postLoanReApproval, cancelPublicOrder, getLoanUrge, getLoanExpenditure } from '@/apis/api.js'
import OrderStep from '@/components/order/OrderStep'
import OrderLoanBlock from '@/components/order/OrderLoanBlock'
import ScreenInfoPreview from '@/components/order/ScreenInfoPreview'

export default {
  components: {
    OrderStep, OrderLoanBlock, ScreenInfoPreview
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
      hasChangeProduct: false,
      handler_id: '',
      settle: {
        status: ''
      },
      identityList: [],
      curIdentity: -1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.identityList = this.analyseIdentity()
      this.curIdentity = this.identityList[0].value

      this.grade = Number(this.$store.getters.userInfo.grade)
      this.order_id = this.$route.query.order_id
      this.getInfo()
      // 测试
      if (process.env.NODE_ENV !== 'production') {
      }
    },
    analyseIdentity () {
      /**
       * 0-粉丝 1-会员 2-高级会员 3-一级代理 4-总代理 8-内控 9-财务
       */
      let arr = []
      arr.unshift({
        text: this.getGradeStatusName(this.$store.getters.userInfo.grade),
        value: Number(this.$store.getters.userInfo.grade)
      })
      if (this.$store.getters.userInfo.is_internal_control) {
        arr.unshift({
          text: '内控',
          value: 8
        })
      }
      if (this.$store.getters.userInfo.is_finance_staff) {
        arr.unshift({
          text: '财务',
          value: 9
        })
      }
      return arr
    },
    sortIdentity () {
      let lastIndex = this.identityList.length - 1
      let isInternal = this.$store.getters.userInfo.is_internal_control
      let isFinance = this.$store.getters.userInfo.is_finance_staff
      switch (this.info.status) {
        case 0: // 初始化
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 1: // 待提交
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 2: // 已提交
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 3: // 待批复
          if (isInternal) {
            this.curIdentity = 8
          }
          break
        case 4: // 已批复
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 5: // 待签约
          if (isInternal) {
            this.curIdentity = 8
          }
          break
        case 6: // 已签约
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 7: // 待放款
          if (isInternal) {
            this.curIdentity = 8
          }
          break
        case 8: // 已放款
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 9: // 待结算
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 10: // 已结算
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 11: // 待支出
          if (isFinance) {
            this.curIdentity = 8
          }
          break
        case 12: // 已支出
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 13: // 退审核
          if (isInternal) {
            this.curIdentity = 8
          }
          break
        case 14: // 已被拒绝
          this.curIdentity = this.identityList[lastIndex].value
          break
        case 15: // 超时未处理
          this.curIdentity = this.identityList[lastIndex].value
          break

        default:
          break
      }
    },
    changeIdentityAction (item) {
      this.curIdentity = item.value
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
            expire_time: h + ':' + mm
          }
          this.sortIdentity()
          this.product = res.data.product
          this.commission = res.data.product.commission
          this.audit = res.data.audit
          this.screenInfo = res.data.screen_info
          this.showImages = [
            this.screenInfo.id_card_front_img_url,
            this.screenInfo.id_card_back_img_url,
            this.screenInfo.vehicle_license_front_img_url,
            this.screenInfo.vehicle_license_duplicate_img_url
          ]
          if (res.data.handler_id) {
            this.handler_id = res.data.handler_id
          }
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
    screenAction () {
      this.$router.push({
        path: '/myloanssystemscreen',
        query: {
          order_id: this.info.order_id
        }
      })
    },
    cancelOrderActin () {
      this.dConfirm('取消订单，订单将回到订单库，由高级会员抢单，确认取消吗？').then(res => {
        if (res) {
          let req = {
            order_id: this.order_id
          }
          cancelPublicOrder(req).then(res => {
            if (res.code === 0) {
              this.tSuccess('取消成功').then(() => {
                this.$store.dispatch('setNowTab', {
                  nowTab: 3
                }).then(() => {
                  this.$router.push({
                    path: '/index'
                  })
                })
              })
            }
          })
        }
      })
    },
    // 提交进件
    submitIncomming () {
      let req = {
        order_id: this.order_id,
        product_id: this.product.id,
        handler_id: this.handler_id
      }
      this.tLoading()
      postLoanCommit(req).then(res => {
        this.tClear()
        if (res.code === 0) {
          this.tSuccess('订单已提交').then(() => {
            this.$store.dispatch('setNowTab', {
              nowTab: 3
            }).then(() => {
              this.$router.push({
                path: '/index'
              })
            })
          })
        }
      })
    },
    submitReApproval () {
      let req = {
        order_id: this.order_id,
        product_id: this.product.id
      }
      this.tLoading()
      postLoanReApproval(req).then(res => {
        this.tClear()
        if (res.code === 0) {
          this.tSuccess('订单已提交').then(() => {
            this.$store.dispatch('setNowTab', {
              nowTab: 3
            }).then(() => {
              this.$router.push({
                path: '/index'
              })
            })
          })
        }
      })
    },
    loansSelectAction (item) {
      this.hasChangeProduct = true
      this.product = item
      this.getCommissionByProduct()
    },
    // 申请结算
    applySettlementAction () {
      this.$router.push({
        path: '/ordersettlement',
        query: {
          order_id: this.order_id
        }
      })
    },
    // 催办结算
    urgingSettlementAction () {
      let req = {
        order_id: this.order_id
      }
      getLoanUrge(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('催办成功')
        }
      })
    },
    // 退回结算
    backSettlementAction () {
      this.$router.push({
        path: '/ordersettlementback',
        query: {
          order_id: this.order_id
        }
      })
    },
    // 通过结算
    passSettlementAction () {
      this.$router.push({
        path: '/ordersettlementpass',
        query: {
          order_id: this.order_id
        }
      })
    },
    // 订单批复
    replyAction (val) {
      this.$router.push({
        path: '/approvalreply',
        query: {
          reply: val,
          orderId: this.order_id,
          productId: this.product.id
        }
      })
    },
    // 订单签约
    signingAction (val) {
      this.$router.push({
        path: '/approvalsigning',
        query: {
          reply: val,
          orderId: this.order_id,
          productId: this.product.id
        }
      })
    },
    // 订单放款
    makeLoanAction (val) {
      this.$router.push({
        path: '/approvalloan',
        query: {
          reply: val,
          orderId: this.order_id,
          productId: this.product.id
        }
      })
    },
    // 订单支出
    expendAction () {
      this.dConfirm('确认支出吗？').then(res => {
        if (res) {
          let req = {
            order_id: this.order_id
          }
          getLoanExpenditure(req).then(res => {
            if (res.code === 0) {
              this.tSuccess('支出成功').then(() => {
                this.$store.dispatch('setNowTab', {
                  nowTab: 3
                }).then(() => {
                  this.$router.push({
                    path: '/index'
                  })
                })
              })
            }
          })
        }
      })
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
