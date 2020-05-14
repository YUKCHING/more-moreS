<template>
  <div class='CommissionCard' @click="editAction">
    <div class="item top">
      <span>{{info.product_name}}</span>
      <div class="right-icon">
        <img src="@/assets/icon/icon-edit.png" @click.stop="editAction" v-if="isAllowEdit">
        <img src="@/assets/icon/icon-rubbish2.png" @click.stop="deleteAction" v-if="isGeneral">
      </div>
    </div>
    <div class="item noright">高级代理</div>
    <div class="item">会员</div>
    <div class="item noright">{{info.senior_member || '-'}}%</div>
    <div class="item">{{info.member || '-'}}%</div>
    <div class="item bottom">更新时间：{{info.updated_at}}</div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isGeneral: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isAllowEdit () {
      return Number(this.info.allow_subordinate_modify) === 1
    }
  },
  methods: {
    editAction () {
      this.$emit('edit', this.info)
    },
    deleteAction () {
      this.dConfirm('确定删除吗？').then(val => {
        if (val) {
          this.$emit('del', this.info)
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.CommissionCard
  display grid
  grid-template-columns repeat(2, 50%)
  grid-template-rows repeat(3, auto)
  margin-top 10px
  font-size 14px
  box-shadow 0px 2px 6px 0px rgba(0, 0, 0, 0.4)

  .item
    border 1px solid rgba(16, 16, 16, .52)
    border-bottom none
    text-align center
    padding 12px 0

  .noright
    border-right none

  .top
    grid-column-start span 2
    background #E11B1B
    border-bottom none
    color #ffffff
    padding 5px 10px
    display inline-flex
    justify-content space-between

  .bottom
    grid-column-start span 2
    border-bottom 1px solid rgba(16, 16, 16, .52)
    text-align left
    padding 8px 23px

  .right-icon
    display inline-flex
    align-items center

    img
      height 16px
      margin-left 10px
</style>
