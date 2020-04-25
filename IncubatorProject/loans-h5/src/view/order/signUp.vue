<template>
  <div class='signUp'>
    <van-swipe :style="{ height: swipeHeight }" :autoplay="5000" indicator-color="white">
      <van-swipe-item>
        <div class="bannar">
          <img class="bg" src="@/assets/order/img-signup-bg.png" alt="">
          <div class="info">
            <p>累计放款金额（元）</p>
            <p>{{splitMonet(total)}}</p>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="bannar">
          <img class="bg" src="@/assets/order/img-signup-bg2.png" alt="">
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="middle">
      <van-field placeholder="您的姓名"/>
      <van-field placeholder="手机号码"/>
      <van-field placeholder="请输入验证码">
        <template #button>
          <van-button size="small" type="danger" style="border-radius: 15px; background: #F15F2A" @click="getCodeAction">获取验证码</van-button>
        </template>
      </van-field>
      <van-field placeholder="预约金额(万元)">
        <template #button>
          <span style="color: #C0C0C0; font-size: 1rem">最高70万元</span>
        </template>
      </van-field>
      <van-button size="big" type="danger" style="border-radius: 22px; width: 100%;margin-top: 1.5rem;background: #F15F2A" @click="getCodeAction">我要预约</van-button>
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
          <p>10秒在线</p>
          <p>快速申请</p>
        </div>
        <div class="emipt"></div>
        <div class="info">
          <p>10秒在线</p>
          <p>快速申请</p>
        </div>
        <div class="emipt"></div>
        <div class="info">
          <p>10秒在线</p>
          <p>快速申请</p>
        </div>
      </div>
    </div>
    <div class="middle" style="border-top: .83rem solid #F7F7F7; padding-top: 1rem">
      <p class="title">成交记录</p>
      <div class="scroll-block" ref="scollBlock" id="scollBlock">
        <div class="item" v-for="(item, index) in record" :key="index">
          <p>{{item.title}}</p>
          <p>{{packagePhoneNumber(item.phone)}}</p>
          <p>
            成功贷款<span style="color: #FC9D75">{{item.num}}</span>万
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      total: 300000000,
      record: [
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 17.6},
        {title: '深圳', phone: '13713697967', num: 76.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 17.6},
        {title: '深圳', phone: '13713697967', num: 76.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 17.6},
        {title: '深圳', phone: '13713697967', num: 76.6},
        {title: '深圳', phone: '13713697967', num: 7.6},
        {title: '深圳', phone: '13713697967', num: 7.6}
      ],
      scrollTimer: '',
      swipeHeight: '0px'
    }
  },
  created () {
    let screenWidth = window.screen.availWidth
    let sHeight = (screenWidth * 156.0) / 375.0
    this.swipeHeight = sHeight + 'px'
  },
  destroyed () {
    clearInterval(this.scrollTimer)
  },
  mounted () {
    this.scrollAction()
  },
  methods: {
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
    getCodeAction () {

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
        width 15%
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
