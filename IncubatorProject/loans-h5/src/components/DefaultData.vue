<template>
  <div class='DefaultData'>
    <img src="@/assets/imgs/img-assets-nodata.png">
    <p>{{text}}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.DefaultData
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content center
  box-sizing border-box
  padding-bottom 20%

  p
    margin-top 20px
    color #D7D7D7
</style>
