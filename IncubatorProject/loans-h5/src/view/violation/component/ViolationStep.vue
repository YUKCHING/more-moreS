<template>
  <div class="violation-step">
    <div class="step-item" v-for="(item, index) in list" :key="item.id">
      <div class="left">
        <p>{{item.Time.split(' ')[0]}}</p>
        <p>{{item.Time.split(' ')[1]}}</p>
      </div>
      <div class="middle">
        <div
          class="step-icon"
          slot="inactive-icon">
          <div class="step-icon-center"></div>
        </div>
        <div class="line" v-show="index !== (list.length - 1)"></div>
      </div>
      <div class="right">
        <p>{{item.Location}}</p>
        <p>惩罚：扣分{{item.degree}},罚款{{item.count}}元</p>
        <p>原因：{{item.Reason}}</p>
        <p>备注：null</p>
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
.violation-step
  width 100%
  box-sizing border-box
  display flex
  flex-direction column
  padding 30px 0

  .step-item
    width 100%
    display flex
    justify-content flex-start
    font-size 14px
    color #030303
    line-height 17px

    div
      box-sizing border-box

    .left
      width 24%
      text-align right
      padding 0 5px 0 0

    .middle
      width 10%
      display inline-flex
      flex-direction column
      align-items center

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

      .line
        flex-grow 1
        width 0px
        display inline-block
        border-left 1px solid rgba(143, 142, 142, .46)

    .right
      width 66%
      padding-bottom 20px

      p
        &:nth-child(1)
          font-weight 600
          margin-bottom 5px

</style>
