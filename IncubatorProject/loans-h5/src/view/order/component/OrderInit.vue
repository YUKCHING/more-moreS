<template>
  <div class='OrderDetail'>
    <div class="panel">
      <p class="title">订单信息</p>
      <div class="content">
        <div class="info-label">
          <span class="label">订单状态</span>
          <p class="value">{{isInit ? '-' : '初始化'}}</p>
        </div>
        <div class="info-label">
          <span class="label">客户名称</span>
          <p class="value">{{isInit ? '-' : '张珊'}}</p>
        </div>
        <div class="info-label">
          <span class="label">客户身份证号</span>
          <p class="value">{{isInit ? '-' : '123123123'}}</p>
        </div>
        <div class="info-label">
          <span class="label">联系电话</span>
          <p class="value">{{isInit ? '-' : '137136918838'}}</p>
        </div>
        <van-button class="button" type="danger" :disabled="isInit" @click="recordDetailAction">交易记录详情</van-button>
        <div class="loansBlock">
          <div class="loansTitle">
            <span>产品标题</span>
            <van-button class="button" type="danger" :disabled="isInit">选择产品</van-button>
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
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
        <div class="right" @click="screenAction">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      isInit: false,
      otherCost: ''
    }
  },
  created () {
    this.isInit = this.$route.query.isInit === '1'
    console.log(this.isInit)
  },
  methods: {
    recordDetailAction () {
      this.$router.push({
        path: '/recordprocess',
        query: {
          id: '1312'
        }
      })
    },
    screenAction () {
      this.$router.push({
        path: '/systemscreen',
        query: {
          isInit: '1',
          order_id: this.$route.query.order_id,
          id: '1312'
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

      .loansBlock
        border .6px solid rgba(0, 0, 0, .25)
        box-shadow 0px 2px 4px 0px rgba(0, 0, 0, .1)
        padding .8rem .8rem 0rem

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
      .other
        .van-cell
          background rgba(0, 0, 0, .1)
          padding 6px 8px
          margin .5rem 0
          font-size 12px

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
