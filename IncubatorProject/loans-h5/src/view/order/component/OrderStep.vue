<template>
  <div class="order-step">
    <div
      class="item"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="top">
        <div class="left"
          :style="{
            background: index === 0 ? 'transparentify' : index <= active ? '#EE5150' : 'rgba(0,0,0,.2)'
          }"
        ></div>
        <img :src="index <= active ? require('@/assets/order/icon-step-circle1.png') : require('@/assets/order/icon-step-circle2.png')">
        <div class="right"
          :style="{
            background: index === (list.length - 1) ? 'transparentify' : index <= (active - 1) ? '#EE5150' : 'rgba(0,0,0,.2)'
           }"
        ></div>
      </div>
      <div
        class="bottom"
        :style="{
          color: index <= active ? '#EE5150' : 'rgba(0,0,0,.25)'
        }"
      >
        {{item}}
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
    },
    active: {
      type: Number,
      default: -1
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.order-step
  width 100%
  box-sizing border-box
  display flex
  flex-wrap nowrap
  align-items center
  overflow hidden
  margin 20px 0

  .item
    display inline-flex
    flex-direction column
    align-items center
    justify-content center

    .top
      display inline-flex
      align-items center

      .left
        display inline-block
        height 2px
        width 30px

      .right
        display inline-block
        height 2px
        width 30px

      img
        width 14px
        height 14px

    .bottom
      font-size 12px
      margin-top 5px
</style>
