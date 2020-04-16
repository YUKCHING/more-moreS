<template>
  <div class='WithdrawalCard'>
    <p class="top">
      <span>{{info.date}}</span>
      <span>￥ {{info.total}}</span>
    </p>
    <p class="detailItem" v-for="(item, index) in info.detail" :key="index">
      <span>{{item.channel || item.from}}</span>
      <span>￥{{item.withdraw_amount || item.income}}</span>
    </p>
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
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.WithdrawalCard
  background #F4F4F4
  padding 1rem
  border-radius 5px
  box-sizing border-box
  width calc(100% - 2rem)
  margin 1rem 1rem
  font-size 1rem

  .top
    border-bottom 1px solid #B5B5B5
    display flex
    justify-content space-between
    align-items center
    padding-bottom .5rem

  .detailItem
    display flex
    justify-content space-between
    margin-top .5rem

</style>
