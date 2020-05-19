<template>
  <div class='OrderDetail'>
    <div class="panel">
      <div class="title">
        <span>订单信息</span>
        <div class="right2" @click="addChildOrderAction" v-show="childOrderShowStatus">
          + 添加子订单
        </div>
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
          <span class="value time" v-show="info.status && info.status !== 1">
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
          @select="loansSelectAction"
          >
        </order-loan-block>
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
        <div v-if="!isSetProduct" class="right" @click="screenAction()">
          审核系统初筛
          <img src="@/assets/icon/icon-arrow-right2.png">
        </div>
        <div v-else class="right" style="color: #78797A" @click="screenAction()">
          查看
          <img src="@/assets/icon/icon-arrow-right3.png">
        </div>
      </div>
      <screen-info-preview
        :screenInfo="screenInfo"
        :showImages="showImages"
      ></screen-info-preview>
    </div>
    <!-- 佣金分配
     -->
    <div class="panel" v-if="Object.keys(commission).length > 0">
      <!-- 财务 -->
      <div v-if="isFinance">
        <!-- 11订单待支出 12订单已支出 -->
        <div v-if="info.status === 11 || info.status === 12">
          <commission-detail :orderId="String(order_id)"></commission-detail>
        </div>
      </div>
      <!-- 4 总代理 3 一级代理  -->
      <div v-else-if="grade === 4 || grade === 3">
        <!-- 9订单待结算-申请中 -->
        <div v-if="info.status === 9 && settle.status === '0'">
          <commission-detail :orderId="String(order_id)"></commission-detail>
        </div>
      </div>
      <!-- 2 高级会员——业务 -->
      <div v-else-if="grade === 2">
        <!-- 1订单待提交 3订单待批复 13订单退审核 14订单已被拒绝 -->
        <div v-if="info.status === 1 || info.status === 3 || info.status === 13 || info.status === 14">
          <commission-block :productId="String(product.id)"></commission-block>
        </div>
        <!-- 5订单待签约 7订单待放款 9订单待结算-未申请/申请中 11待支持 12已支出 -->
        <div v-else-if="info.status === 5 || info.status === 7 || (info.status === 9 && settle.status !== '-1') || info.status === 11 || info.status === 12">
          <commission-block2 :orderId="String(order_id)"></commission-block2>
        </div>
        <!-- 9订单待结算-退回 -->
        <div v-else-if="info.status === 9 && settle.status === '-1'">
          <commission-detail-back :orderId="String(order_id)" :settle="settle"></commission-detail-back>
        </div>
      </div>
    </div>
    <!-- 财务
    -->
    <div v-if="isFinance">
      <!-- 11订单待支出 -->
      <div class="buttonPanel" v-if="info.status === 11">
        <van-button class="button4" type="danger" @click="expendAction">支 出</van-button>
      </div>
      <!-- 其它 -->
      <div class="buttonPanel" v-else>
        <van-button class="button3" @click="goBackAction">返 回</van-button>
      </div>
    </div>
    <!-- 内控
    -->
    <div v-else-if="isInternalControl">
      <!-- 3订单待批复 14订单已被拒绝 -->
      <div class="buttonPanel" v-if="info.status === 3 || info.status === 14">
        <van-button class="button1" @click="replyAction(2)">退审批</van-button>
        <van-button class="button2" type="danger" @click="replyAction(1)">批 复</van-button>
      </div>
      <!-- 13订单退审核 -->
      <div class="buttonPanel" v-else-if="info.status === 13">
        <van-button class="button4" type="danger" @click="submitReApproval">提 交</van-button>
      </div>
      <!-- 5订单待签约 -->
      <div class="buttonPanel" v-else-if="info.status === 5">
        <van-button class="button1" @click="signingAction(2)">退审批</van-button>
        <van-button class="button2" type="danger" @click="signingAction(1)">签 约</van-button>
      </div>
      <!-- 7订单待放款 -->
      <div class="buttonPanel" v-else-if="info.status === 7">
        <van-button class="button1" @click="makeLoanAction(2)">退审批</van-button>
        <van-button class="button2" type="danger" @click="makeLoanAction(1)">放 款</van-button>
      </div>
      <!-- 8订单已放款 -->
      <div class="buttonPanel" v-else>
        <van-button class="button3" @click="goBackAction">返 回</van-button>
      </div>
    </div>
    <!-- 4 总代理 3 一级代理
    -->
    <div v-else-if="grade === 4 || grade === 3">
      <!-- 0订单初始化 -->
      <div class="buttonPanel" v-if="info.status === 0">
        <van-button class="button4" type="danger" @click="cancelOrderActin">取消订单</van-button>
      </div>
      <!-- 9订单待结算-已申请 -->
      <div class="buttonPanel" v-else-if="info.status === 9 && settle.status === '0'">
        <van-button class="button1" @click="backSettlementAction">退 回</van-button>
        <van-button class="button2" type="danger" @click="passSettlementAction">通 过</van-button>
      </div>
      <div class="buttonPanel" v-else>
        <van-button class="button3" @click="goBackAction">返 回</van-button>
      </div>
    </div>
    <!-- 2 高级会员——业务
    -->
    <div v-else-if="grade === 2">
      <!-- 1订单待提交 14订单已被拒绝 -->
      <div class="buttonPanel" v-if="info.status === 1 || info.status === 14">
        <van-button class="button1" :disabled="!isSetProduct" @click="assignControl">指派内控</van-button>
        <van-button class="button2" :disabled="!isSetProduct || !handler_id" type="danger" @click="submitIncomming">提交进件</van-button>
      </div>
      <!-- 9订单待结算 -->
      <div class="buttonPanel" v-else-if="info.status === 9 && settle.status === ''">
        <van-button class="button4" type="danger" @click="applySettlementAction">申请结算</van-button>
      </div>
      <!-- 9订单待结算-已申请 -->
      <div class="buttonPanel" v-else-if="info.status === 9 && settle.status === '0'">
        <van-button class="button4" type="danger" @click="urgingSettlementAction" :icon="require('@/assets/icon/icon-bell-ring.png')">催 办</van-button>
      </div>
      <!-- 9订单待结算-已退回 -->
      <div v-else-if="info.status === 9 && settle.status === '-1'">
      </div>
      <!-- 3订单待批复 5订单待签约 7订单待放款 13订单退审核 -->
      <div class="buttonPanel" v-else>
        <van-button class="button3" @click="goBackAction">返 回</van-button>
      </div>
    </div>
    <!-- 其它
    -->
    <div v-else>
      <div class="buttonPanel">
        <van-button class="button3" @click="goBackAction">返 回</van-button>
      </div>
    </div>
    <van-popup v-model="showGeneralPopup" position="bottom" class="popup-class">
      <internal-list @select="getHandlerIdAction"></internal-list>
    </van-popup>
  </div>
</template>
<script>
import { getLoanOrderInfo, postLoanCommit, getCommissionByProduct, postLoanReApproval, cancelPublicOrder, getLoanUrge, getLoanExpenditure } from '@/apis/api.js'
import InternalList from './InternalList'
import OrderStep from './component/OrderStep'
import OrderLoanBlock from './component/OrderLoanBlock'
import CommissionBlock from './component/CommissionBlock'
import CommissionBlock2 from './component/CommissionBlock2'
import CommissionDetail from './component/CommissionDetail'
import CommissionDetailBack from './component/CommissionDetailBack'
import ScreenInfoPreview from './component/ScreenInfoPreview'

export default {
  components: {
    InternalList, OrderStep, OrderLoanBlock, CommissionBlock, CommissionBlock2, CommissionDetail, CommissionDetailBack, ScreenInfoPreview
  },
  data () {
    return {
      isFinance: false,
      isInternalControl: false,
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
      settle: {}
    }
  },
  computed: {
    isSetProduct () {
      return this.product.product_name
    },
    childOrderShowStatus () {
      return (this.info.status === 1 || this.info.status === 2 || this.info.status === 3 || this.info.status === 4 || this.info.status === 5 || this.info.status === 6) && this.grade === 2
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.isFinance = Boolean(this.$store.getters.userInfo.is_finance_staff)
      this.isInternalControl = Boolean(this.$store.getters.userInfo.is_internal_control)
      this.grade = Number(this.$store.getters.userInfo.grade)
      this.order_id = this.$route.query.order_id
      this.getInfo()
      // 测试
      if (process.env.NODE_ENV !== 'production') {
        // this.isInternalControl = true
        // this.isFinance = true
        // this.grade = 2
      }
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
        path: '/systemscreen2',
        query: {
          order_id: this.info.order_id
        }
      })
    },
    addChildOrderAction () {
      console.log('添加子订单')
    },
    assignControl () {
      this.showGeneralPopup = true
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
    getHandlerIdAction (item) {
      this.handler_id = item.id
      this.showGeneralPopup = false
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
