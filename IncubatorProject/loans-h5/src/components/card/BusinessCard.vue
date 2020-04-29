<template>
  <div class='BusinessCard' @click="selectAction">
    <div class="item">
      <span class="label">产品</span>
      <span class="value">{{info.productName}}</span>
    </div>
    <div class="item">
      <span class="label">客户名称</span>
      <span class="value">{{info.customer}}</span>
    </div>
    <div class="item">
      <span class="label">申请额度</span>
      <span class="value">{{info.quota}}</span>
    </div>
    <div class="item">
      <span class="label">联系方式</span>
      <span class="value">{{info.mobile}}</span>
    </div>
    <div class="item">
      <span class="label">客户经理</span>
      <span class="value">{{info.manager}}</span>
    </div>
    <div class="item">
      <span class="label">申请时间</span>
      <span class="value">{{info.applyTime}}</span>
    </div>
    <div class="info-bar">
      <span class="status">
        {{statusName}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          status: 0
        }
      }
    }
  },
  computed: {
    statusName () {
      let str = ''
      switch (this.info.status) {
        case 0:
          str = '订单初始化'
          break
        case 1:
          str = '超时未处理，订单已取消！'
          break
        case 2:
          str = '订单待提交'
          break
      }
      return str
    }
  },
  created () {
    console.log(this.info)
  },
  methods: {
    selectAction () {
      this.$emit('select', this.info)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.BusinessCard
  width 100%
  box-sizing border-box
  background #ffffff
  border-radius .33rem
  padding 1rem
  margin-top 1rem

  .info-bar
    display flex
    justify-content space-between
    align-items center

    .status
      border 1px solid #E02020
      color #E02020
      padding 2px 10px
      font-size 11px
      transform scale(.9)

  .item
    display flex
    align-items center
    font-size 1rem
    color #000000
    margin-bottom 1rem

    span
      display inline-block

    .label
      width 25%
      color rgba(0, 0, 0, .5)

    .value
      flex-grow 1

  .item
    &:last-child
      margin-bottom 0
</style>
