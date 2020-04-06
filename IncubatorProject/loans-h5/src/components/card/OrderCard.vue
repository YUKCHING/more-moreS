<template>
  <div class='OrderCard'>
    <div class="top">
      <img class="goodimg" :src="info.goods.thumb_url" alt="">
      <div class="info">
        <p>{{info.goods.name}}</p>
        <p class="price">￥{{info.goods.price}}</p>
      </div>
    </div>
    <div class="bottom">
      <p>共1件商品，需付款：￥{{info.goods.price}}</p>
      <div class="button-block">
        <div class="pay-button" @click="payAction">
          去支付
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      require: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    payAction () {
      this.$emit('pay', this.info)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderCard
  background #ffffff
  box-sizing border-box
  margin 1rem 1.5rem
  border-radius 3px
  font-size 1.17rem

  .top
    padding 1rem
    border-bottom 1px solid rgba(151, 151, 151, .1)
    display flex
    align-items center

    .goodimg
      width 6rem

    .info
      flex-grow 1

      .price
        color #FE3525
        margin-top 10px

  .bottom
    display flex
    flex-direction column
    align-items flex-end
    padding 1rem

    .button-block
      display flex
      justify-content flex-end
      align-items center

      .pay-button
        margin-top .5rem
        border 1px solid #FE3525
        color #FE3525
        padding .2rem 1rem
        border-radius 1.08rem

</style>
