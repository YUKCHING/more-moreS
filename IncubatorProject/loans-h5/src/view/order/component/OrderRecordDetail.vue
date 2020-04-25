<template>
  <div class='OrderRecordDetail'>
    <div class="content">
      <p class="title">订单信息</p>
      <div class="labelBlock">
        <span class="label" style="border-bottom: none">
          客户名称
        </span>
        <span class="value" style="border-bottom: none">
          张珊
        </span>
      </div>
      <div class="labelBlock">
        <span class="label">
          产品名称
        </span>
        <span class="value">
          平安车抵贷
        </span>
      </div>
    </div>
    <div class="step-block">
      <van-steps
        direction="vertical"
        :active="-1">
        <van-step
          v-for="item in record"
          :key="item.id">
          <div
            class="step-icon"
            slot="inactive-icon">
            <div class="step-icon-center"></div>
          </div>
          <p class="step-label">{{item.Location}}</p>
          <p class="step-label">{{item.Time}}</p>
          <p class="step-label">惩罚：扣分{{item.degree}},罚款{{item.count}}元</p>
          <p class="step-label">原因：{{item.Reason}}</p>
          <p class="step-label">备注：null</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      record: []
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderRecordDetail
  height 100%
  background #F2F3F5
  padding 10px 0

  .content
    background #ffffff

    .title
      font-size 14px
      font-weight 600
      padding 5px 8px

    .labelBlock
      display flex
      align-items center

      span
        display inline-block
        font-size 12px
        box-sizing border-box
        padding 10px 8px
        border-top .5px solid rgba(0, 0, 0, .1)
        border-bottom .5px solid rgba(0, 0, 0, .1)

        &:nth-child(2)
          border-left .5px solid rgba(0, 0, 0, .1)

      .label
        width 25%
        background #F7F8F9
        color rgba(0, 0, 0, .5)

      .value
        flex-grow 1

  .step-block
    margin-top 1rem

    .step-icon
      width 1.5rem
      height 1.5rem
      border-radius 50%
      background rgba(165, 155, 154, .28)
      display inline-flex
      justify-content center
      align-items center

      .step-icon-center
        display inline-block
        width .67rem
        height .67rem
        border-radius 50%
        background rgba(167, 159, 158, 1)

    .step-label
      color #030303
      font-size 1.17rem
</style>
