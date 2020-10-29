<template>
  <div class='signUp'>
    <van-swipe :style="{ height: swipeHeight }" :autoplay="8000" indicator-color="white">
      <van-swipe-item>
        <div class="bannar">
          <img class="bg" src="@/assets/order/img-signup-bg.png" alt="">
          <div class="info">
            <p>累计放款金额（元）</p>
            <p>{{splitMonet(total)}}</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="middle">
      <van-field v-model="username" clearable placeholder="您的姓名"/>
      <van-field v-model="mobile" clearable placeholder="手机号码"/>
      <van-field v-model="verify_code" clearable placeholder="请输入验证码">
        <template #button>
          <van-button size="small" type="danger" @click="getCodeAction"
          :style="{
            borderRadius: '15px',
            background: codeTime > 0 ? 'rgba(0,0,0,.3)' : '#F15F2A',
            border: 'none'
          }">{{codeTime > 0 ? '(' + codeTime + ')s' : '获取验证码'}}</van-button>
        </template>
      </van-field>
      <van-field v-model="amount" clearable placeholder="期望金额(万元)">
        <template #button>
          <span style="color: #C0C0C0; font-size: 1rem">最高70万元</span>
        </template>
      </van-field>
      <van-button size="big" type="danger" style="border-radius: 22px; width: 100%;margin-top: 1.5rem;background: #F15F2A" @click="loanAction">我要预约</van-button>
    </div>
    <div class="middle">
      <p class="title">贷款流程</p>
      <div class="tagInfo">
        <img src="@/assets/order/icon-sign-1.png" alt="">
        <img class="arrow" src="@/assets/icon/icon-doublearrow-right.png">
        <img src="@/assets/order/icon-sign-2.png" alt="">
        <img class="arrow" src="@/assets/icon/icon-doublearrow-right.png">
        <img src="@/assets/order/icon-sign-3.png" alt="">
        <img class="arrow" src="@/assets/icon/icon-doublearrow-right.png">
        <img src="@/assets/order/icon-sign-4.png" alt="">
      </div>
      <div class="tagInfo" style="margin-top: .5rem">
        <div class="info">
          <p>10秒在线</p>
          <p>快速申请</p>
        </div>
        <div class="emipt"></div>
        <div class="info">
          <p>专属客服</p>
          <p>电话联系</p>
        </div>
        <div class="emipt"></div>
        <div class="info">
          <p>现场验车</p>
          <p>风控审核</p>
        </div>
        <div class="emipt"></div>
        <div class="info">
          <p>审核通过</p>
          <p>放款成功</p>
        </div>
      </div>
    </div>
    <div class="middle" style="border-top: .83rem solid #F7F7F7; padding-top: 1rem">
      <p class="title">成交记录</p>
      <div class="scroll-block" ref="scollBlock" id="scollBlock">
        <div class="item" v-for="(item, index) in record" :key="index">
          <p>{{item.title}}</p>
          <p>{{item.phone}}</p>
          <p>
            成功贷款<span style="color: #FC9D75">{{item.num}}</span>万
          </p>
        </div>
      </div>
    </div>
    <qr-overlay />
    <back-home />
  </div>
</template>
<script>
import $ from 'jquery'
import { postLoanApply, sendVerifyCode, getDealLoanList } from '@/apis/api.js'
import initLoginCheckInfo from '@/common/js/login.js'
import QrOverlay from '@/components/QrOverlay'
import BackHome from '@/components/BackHome'
export default {
  components: {
    BackHome, QrOverlay
  },
  data () {
    return {
      total: 300000000,
      record: [],
      scrollTimer: '',
      codeTimer: '',
      codeTime: 0,
      swipeHeight: '0px',
      username: '',
      mobile: '',
      amount: '',
      verify_code: '',
      invite_code: ''
    }
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  created () {
    this.init()
  },
  destroyed () {
    clearInterval(this.scrollTimer)
    clearInterval(this.codeTimer)
  },
  mounted () {
    this.scrollAction()
  },
  methods: {
    init () {
      if (process.env.NODE_ENV === 'production' && !process.env.ISAPPLET) {
        let title = '汽车平台-预约贷款'
        let des = '一站式汽车金融服务\r\n做车贷，找77汽车！'
        if (!window.isReady) {
          initLoginCheckInfo(this.$route).then(info => {
            if (info && info.code === -1000104) {
              this.bus.$emit('showQrOverlay')
              return
            }
            // 分享设置
            let shareLink = 'http://77car-api.shanshuijv.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
            this.initWxShare(window.shareUrl, title, des, shareLink)
            window.isReady = true
            this.$store.dispatch('setIsFirstVisit', {
              isFirstVisit: info.showBack
            })

            this.initDeal()
          })
        } else {
        // 分享设置
          let shareLink = 'http://77car-api.shanshuijv.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
          this.initWxShare(window.shareUrl, title, des, shareLink)

          this.initDeal()
        }
      } else {
        this.initDeal()
      }
    },
    initDeal () {
      let screenWidth = window.screen.availWidth
      let sHeight = (screenWidth * 156.0) / 375.0
      this.swipeHeight = sHeight + 'px'
      this.getDealList()
    },
    scrollAction () {
      clearInterval(this.scrollTimer)
      this.scrollTimer = setInterval(() => {
        let isBottom = this.$refs['scollBlock'].scrollTop + this.$refs['scollBlock'].offsetHeight >= this.$refs['scollBlock'].scrollHeight
        let srollTop = 0
        if (!isBottom) {
          srollTop = $('#scollBlock').scrollTop() + 28
        }
        $('#scollBlock').animate({scrollTop: srollTop + 'px'}, 500)
      }, 1500)
    },
    animationTotal (target) {
      let timePool = 2000
      let timeStep = 100
      let count = Math.ceil(timePool / timeStep)
      let distance = (target / count).toFixed(0)
      let timer = setInterval(() => {
        if (timePool <= 0) {
          clearInterval(timer)
          timer = null
          return
        }
        this.total = this.total + Number(distance)
        timePool = timePool - 100
      }, timeStep)
    },
    getCodeAction () {
      if (this.codeTime > 0) {
        return
      }
      let req = {
        phone: this.mobile,
        scene: 'bind_phone'
      }

      sendVerifyCode(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tSuccess('获取成功')
          this.codeTime = 60
          this.codeTimer = setInterval(() => {
            this.codeTime--
            if (this.codeTime <= 0) {
              clearInterval(this.codeTimer)
            }
          }, 1000)
        }
      })
    },
    getDealList () {
      getDealLoanList({}).then(res => {
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.record = res.data.list.map(ele => {
              return {
                title: ele.city,
                phone: ele.hidden_tel,
                num: ele.deal_amount
              }
            })
          }
          let sumDealMoney = res.data.sum_deal_amount
          this.animationTotal(sumDealMoney)
        }
      })
    },
    loanAction () {
      let req = {
        username: this.username,
        mobile: this.mobile,
        amount: Number(this.amount) * 10000,
        invite_code: this.$store.getters.webInviteCode,
        verify_code: this.verify_code
      }
      postLoanApply(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tSuccess('预约成功')
          this.$router.push({
            path: '/myloans'
          })
          // this.$store.dispatch('setNowTab', {
          //   nowTab: 3
          // }).then(() => {
          //   this.$router.push({
          //     path: '/index'
          //   })
          // })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.signUp /deep/
  background #ffffff

  .middle
    padding 0 1.5rem 1.5rem

    .van-cell:not(:last-child)::after
      border-bottom none

    .van-cell
      border-bottom 1px solid #ebedf0
      padding-right 0px

    .title
      font-size 1.5rem
      line-height 2.5rem
      border-left 4px solid #FC6E22
      padding-left .5rem

    .tagInfo
      display flex
      justify-content space-around
      align-items center
      margin-top 1.5rem

      img
        width 12%

      .arrow
        width 7%

      .info
        display inline-block
        width 18%
        text-align center
        font-size 1rem
        transform scale(.9)
        color rgba(0, 0, 0, .85)

      .emipt
        height 10px
        display inline-block
        width 7%

    .scroll-block
      height 112px
      margin-top 1rem
      box-sizing border-box
      padding 0 .8rem
      overflow hidden

      .item
        display inline-flex
        align-items center
        justify-content center
        font-size 1.05rem
        color rgba(0, 0, 0, .85)
        width 100%
        margin 6px 0

        p
          display inline-block
          width 30%

          &:nth-child(2)
            text-align center
            width 35%

          &:nth-child(3)
            text-align right
            width 35%

  .bannar
    width 100%
    color #ffffff
    font-size 1.15rem
    position relative

    .bg
      width 100%

    .info
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      display flex
      flex-direction column
      justify-content center
      align-items center

      p:nth-child(2)
        font-weight 500
        font-size 3rem
        margin-top 2rem
</style>
<style lang="scss" scoped>
.scroll-block {
  // animation: phoneMove 1s linear infinite;
  animation-fill-mode: forwards;

  @keyframes phoneMove {
    0% { transform: translateY(0) }
    100% { transform: translateY(-2rem) }
  }
}
</style>
