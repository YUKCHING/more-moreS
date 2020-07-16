<template>
  <div class='HistoryPicker'>
    <div class="item-content" v-for="item in list" :key="item.id" @click="itemClickAction(item)">
      <div class="top">
        <div class="item-block">
          <span class="label">车牌号：</span>
          <span class="value">{{item.plate_no}}</span>
        </div>
        <div class="item-block">
          <span class="label">发动机号：</span>
          <span class="value">{{item.engine_no}}</span>
        </div>
      </div>
      <div class="item-block">
        <span class="label">VIN码：</span>
        <span class="value">{{item.vin}}</span>
      </div>
    </div>
    <div class="buttonPanel">
      <van-button class="button3" @click="clickCloseAction">取消</van-button>
    </div>
  </div>
</template>
<script>
import { getVinHistory } from '@/apis/api'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getHistory()
  },
  methods: {
    itemClickAction (item) {
      this.$emit('select', item)
    },
    clickCloseAction () {
      this.$emit('close')
    },
    getHistory () {
      getVinHistory({}).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.list = res.data
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.HistoryPicker
  height 100vh
  background #ffffff
  position relative
  font-size 14px

  .item-content
    display flex
    flex-direction column
    box-sizing border-box
    margin 0 15px
    padding 10px 5px
    border-bottom 1px solid rgba(0, 0, 0, 0.1)

    .top
      display flex
      align-items center
      margin-bottom 5px

    .item-block
      flex-grow 1

      span
        display inline-block

      .label
        margin-right 5px

      .value
        color rgba(0, 0, 0, .7)

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    padding 0 0 10px 0
    position fixed
    left 0
    right 0
    bottom 0

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150

    .button3
      color #EE5150
      border 1px solid #EE5150
      width 70%
</style>
