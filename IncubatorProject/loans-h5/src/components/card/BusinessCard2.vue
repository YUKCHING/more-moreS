<template>
  <div class='BusinessCard2' @click="selectAction">
    <div class="item">
      <span class="label">{{info.product_name || '-'}}</span>
    </div>
    <div class="item">
      <span class="label">申请额度：{{info.amount}}万元</span>
    </div>
    <div class="item">
      <span class="label">申请期限：{{info.order_id}}</span>
    </div>
    <div class="item">
      <span class="label">客户经理：{{info.manager}}</span>
    </div>
    <div class="item">
      <span class="label">申请时间：{{info.created_at}}</span>
    </div>
    <div class="info-bar">
      {{statusName}}
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
    // 0初始化 1待提交 2已提交 3待批复 4已批复 5待签约 6已签约 7待放款 8已放款 9待结算 10已结算 11待支出 12已支出 13退审核 14已拒绝
    statusName (status) {
      return this.getOrderStatusName(this.info.status)
    }
  },
  created () {
  },
  methods: {
    selectAction () {
      this.$emit('select', this.info)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.BusinessCard2
  width 100%
  box-sizing border-box
  background #ffffff
  border-radius .33rem
  padding 1rem
  margin-top 1rem
  position relative
  overflow hidden
  font-size 14px
  color #030303

  .info-bar
    color #FE3525

  .item
    display flex
    align-items center
    margin-bottom 1rem

    span
      display inline-block

    .label
      width 100%

  .item
    &:last-child
      margin-bottom 0
</style>
