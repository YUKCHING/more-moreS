<template>
  <div class="order-step2">
    <div class="step-item" v-for="item in list" :key="item.id">
      <div class="left">
        <p>{{item.created_at.split(' ')[0]}}</p>
        <p>{{item.created_at.split(' ')[1]}}</p>
      </div>
      <div class="middle">
        <img class="icon" src="@/assets/order/icon-step-circle1.png">
        <div class="line"></div>
      </div>
      <div class="right">
        <p>订单{{item.state}}</p>
        <p>操作人：{{item.handler}}</p>
        <p>审核意见：{{item.opinion}}</p>
        <p>审核结论：{{item.conclusion}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.order-step2
  width 100%
  box-sizing border-box
  display flex
  flex-direction column
  padding 30px 0

  .step-item
    display flex
    font-size 12px
    color #000000
    line-height 17px

    div
      box-sizing border-box

    .left
      width 25%
      text-align right
      padding 0 10px

    .middle
      width 15%
      display inline-flex
      flex-direction column
      align-items center

      .icon
        width 14px
        height 14px

      .line
        flex-grow 1
        width 0px
        display inline-block
        border-left 2px dashed #EE5150

    .right
      flex-grow 1
      padding-bottom 20px

      p
        &:nth-child(1)
          font-weight 600
          margin-bottom 5px

</style>
