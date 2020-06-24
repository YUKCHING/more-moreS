<template>
  <div class='OrderDetail'>
    <div class="panel">
      <p class="title">订单信息</p>
      <div class="content">
        <div class="info-label">
          <span class="label">订单状态</span>
          <span class="status" v-show="String(info.status) === '0'">
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
        <van-button class="button" type="danger" @click="recordDetailAction">交易记录详情</van-button>
        <order-loan-block></order-loan-block>
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
        <div class="right" @click="screenAction" v-if="isManager">
          进入系统初筛
          <img src="@/assets/icon/icon-arrow-right2.png">
        </div>
      </div>
      <div class="content">
        <div class="certificates">
          <div class="part">
            <p>身份证</p>
            <div class="imageBlock">
              <div class="image"></div>
              <div class="image"></div>
            </div>
          </div>
          <div class="part">
            <p>行驶证</p>
            <div class="imageBlock">
              <div class="image"></div>
              <div class="image"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonPanel" v-if="grade === 4 || grade === 3">
      <van-button class="button4" type="danger" @click="cancelOrderActin">取消订单</van-button>
    </div>
  </div>
</template>
<script>
import OrderLoanBlock from '@/components/order/OrderLoanBlock'
import { getLoanOrderInfo, cancelPublicOrder } from '@/apis/api.js'
export default {
  components: {
    OrderLoanBlock
  },
  data () {
    return {
      info: {},
      otherCost: '',
      order_id: '',
      isManager: false,
      grade: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.isManager = this.$route.query.isManager === '1'
      this.order_id = this.$route.query.order_id
      this.grade = this.$store.getters.userInfo.grade
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
          if (String(h).length < 2) {
            h = '0' + h
          }
          let mm = Math.abs(date3) % 60// 计算相差小时后余下的分钟
          if (String(mm).length < 2) {
            mm = '0' + mm
          }
          this.info = {
            ...res.data,
            expire_time: h + ':' + mm,
            overtime: date3 < 0
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
        path: '/systemscreen',
        query: {
          isInit: '1',
          order_id: this.$route.query.order_id
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
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderDetail
  height 100%
  background #F2F3F5

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    padding 40px 0

    .van-button
      width 40%

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

      .certificates
        display flex
        justify-content space-between
        font-size 12px

        .part
          width 45%

          .imageBlock
            display flex
            align-items center
            margin-top 10px

            imageWidth = 18vw
            .image
              display inline-block
              background #D8D8D8
              width imageWidth
              height imageWidth
              border-radius 5px
              margin-right 10px
</style>
