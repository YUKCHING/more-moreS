<template>
  <div class='BusinessCard' @click="selectAction">
    <div class="item">
      <span class="label">产品</span>
      <span class="value">{{info.product_name || '-'}}</span>
    </div>
    <div class="item">
      <span class="label">客户名称</span>
      <span class="value">{{info.user_name}}</span>
    </div>
    <div class="item">
      <span class="label">申请额度</span>
      <span class="value">{{info.amount}}万元</span>
    </div>
    <div class="item">
      <span class="label">联系方式</span>
      <span class="value">{{(info.overtime && String(info.status) === '0') ? packagePhoneNumber(info.mobile) : info.mobile}}</span>
    </div>
    <div class="item">
      <span class="label">客户经理</span>
      <span class="value">{{info.manager}}</span>
    </div>
    <div class="item">
      <span class="label">申请时间</span>
      <span class="value">{{info.created_at}}</span>
    </div>
    <div class="info-bar">
      <span class="status">
        {{String(info.status) === '0' && info.overtime ? '超时未处理，订单已取消！' : statusName}}
      </span>
      <span class="time" v-if="String(info.status) === '0' && !info.overtime">
        剩{{info.expire_time}}自动取消
      </span>
    </div>
    <div class="mask" v-if="String(info.status) === '0' && info.overtime" @click.stop="maskClick"></div>
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
    },
    maskClick () {
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
  position relative
  overflow hidden

  .mask
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0, 0, 0, .1)
    user-select none

  .info-bar
    display flex
    justify-content space-between
    align-items center
    font-size 11px

    .status
      border 1px solid #E02020
      color #E02020
      padding 2px 10px
      font-size 11px
      transform scale(.9)

    .time
      color #E11B1B

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
