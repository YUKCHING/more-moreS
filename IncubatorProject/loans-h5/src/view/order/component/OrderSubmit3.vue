<template>
  <div class='OrderDetail'>
    <div class="panel">
      <div class="title">
        <span>订单信息</span>
        <div class="right2" @click="addChildOrderAction">
          + 添加子订单
        </div>
      </div>
      <div class="content">
        <div>
          <order-step :list="list" :active="active"></order-step>
        </div>
        <div class="info-label">
          <span class="label">订单状态</span>
          <p class="value">初始化</p>
        </div>
        <div class="info-label">
          <span class="label">客户名称</span>
          <p class="value">张珊</p>
        </div>
        <div class="info-label">
          <span class="label">客户身份证号</span>
          <p class="value">123123123</p>
        </div>
        <div class="info-label">
          <span class="label">联系电话</span>
          <p class="value">137136918838</p>
        </div>
        <div class="button" @click="recordDetailAction">
          交易记录详情
        </div>
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
      </div>
    </div>
    <div class="panel">
      <div class="title">
        <span>系统初筛</span>
        <div class="right" @click="screenAction">
          查看
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
    <div class="buttonPanel">
      <van-button class="button1" disabled @click="assignControl">退审批</van-button>
      <van-button class="button2" disabled type="danger" @click="submitIncomming">批复</van-button>
    </div>
  </div>
</template>
<script>
import OrderStep from './OrderStep'
export default {
  components: {
    OrderStep
  },
  data () {
    return {
      list: [
        '待提交', '已提交', '已批复', '已签约', '已放款'
      ],
      active: 1,
      otherCost: ''
    }
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
          id: '1312'
        }
      })
    },
    addChildOrderAction () {
      console.log('添加子订单')
    },
    assignControl () {
      console.log('指派内控')
    },
    submitIncomming () {
      console.log('提交进件')
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
    margin 40px 0

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150

  .panel /deep/
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

      .button
        display inline-block
        background #EE5150
        color #FFFFFF
        padding 8px 15px
        border-radius 5px
        font-size 12px
        margin-bottom .8rem

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

    .setting
      .van-field__label
        text-align right
        width 60px
        margin-right 10px

      .van-field__control
        background rgba(245, 245, 245, 1)
        text-align center
        padding 2px
</style>
