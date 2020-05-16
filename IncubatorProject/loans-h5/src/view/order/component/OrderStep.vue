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
    status: {
      type: Number,
      default: -1
    }
  },
  watch: {
    'status' () {
      this.analyseStatus()
    }
  },
  created () {
    this.analyseStatus()
  },
  data () {
    return {
      list: [],
      active: -1
    }
  },
  methods: {
    analyseStatus () {
      // console.log(this.status)
      // var status = 15
      switch (this.status) {
        case 1:
          this.active = 0
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款']
          break
        case 2:
          this.active = 1
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款']
          break
        case 3:
          this.active = 2
          this.list = ['待提交', '已提交', '待批复', '已签约', '待放款']
          break
        case 4:
          this.active = 2
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款']
          break
        case 5:
          this.active = 3
          this.list = ['待提交', '已提交', '已批复', '待签约', '已放款']
          break
        case 6:
          this.active = 3
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款']
          break
        case 7:
          this.active = 3
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款', '待结算']
          break
        case 8:
          this.active = 4
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款', '待结算']
          break
        case 9:
          this.active = 5
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款', '待结算']
          break
        case 10:
          this.active = 5
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款', '已结算']
          break
        case 11:
          this.active = 6
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款', '已结算', '待支出']
          break
        case 12:
          this.active = 6
          this.list = ['待提交', '已提交', '已批复', '已签约', '已放款', '已结算', '已支出']
          break
        case 13:
          this.active = 2
          this.list = ['待提交', '已提交', '退审核', '已签约', '已支出']
          break
        case 14:
          this.active = 2
          this.list = ['待提交', '已提交', '已拒绝', '已签约', '已支出']
          break
        case 15:
          this.active = 1
          this.list = ['待提交', '已超时', '已批复', '已签约', '已支出']
          break
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
::-webkit-scrollbar
  display none

.order-step
  width 100%
  box-sizing border-box
  display flex
  flex-wrap nowrap
  align-items center
  overflow hidden
  overflow-x auto
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
