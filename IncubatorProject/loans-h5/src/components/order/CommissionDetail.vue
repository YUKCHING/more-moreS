<template>
  <div class='OrderSettlement'>
    <div class="top-title">
      <div class="border"></div>
      <span>佣金分配明细</span>
      <div class="border"></div>
    </div>
    <div v-for="item in commissions" :key="item.user_id" class="settlement-item">
      <div class="title">
        <span>{{getGradeName(item.grade)}}-{{item.user_name}}</span>
      </div>
      <van-field :value="item.rate + '%'" label="佣金比例" readonly />
      <van-field :value="item.commission + '元'" label="金额" readonly />
      <van-field :value="getModeName(item.mode)" label="提现模式" readonly v-if="item.grade !== 4" />
    </div>
    <div class="settlement-item">
      <div class="title">
        <span>产品总佣金</span>
      </div>
      <van-field :value="totalRate + '%'" label="佣金比例" readonly />
      <van-field :value="totalCommission + '元'" label="金额" readonly />
    </div>
  </div>
</template>
<script>
import { getCommissionAssign } from '@/apis/api.js'
export default {
  props: {
    orderId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      commissions: [],
      totalRate: 0,
      totalCommission: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getCommission()
    },
    getCommission () {
      let req = {
        order_id: this.orderId
      }
      getCommissionAssign(req).then(res => {
        if (res.code === 0) {
          if (res.data.commissions.length > 0) {
            this.commissions = res.data.commissions.sort((a, b) => a.grade - b.grade)
            console.log(this.commissions)
            this.commissions.forEach(ele => {
              this.totalRate = this.totalRate + Number(ele.rate)
              this.totalCommission = this.totalCommission + Number(ele.commission)
            })
            this.totalRate = this.totalRate.toFixed(2)
            this.totalCommission = this.totalCommission.toFixed(2)
          }
        }
      })
    },
    getGradeName (val) {
      let str = ''
      switch (val) {
        case 4:
          str = '总代理'
          break

        case 3:
          str = '一级代理'
          break

        case 2:
          str = '高级会员'
          break

        case 1:
          str = '会员'
          break

        case 0:
          str = '粉丝'
          break

        default:
          str = '粉丝'
          break
      }
      return str
    },
    getModeName (val) {
      let str = ''
      switch (val) {
        case 3:
          str = 'T+30'
          break

        case 2:
          str = 'T+1'
          break

        case 1:
          str = 'T+0'
          break
        default:
          str = 'T+0'
          break
      }
      return str
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderSettlement /deep/

  .top-title
    box-sizing border-box
    display flex
    justify-content center
    align-items center
    background #F2F3F5
    padding 12px 20px

    .border
      flex-grow 1
      border-bottom 1px dashed rgba(0, 0, 0, .86)

    span
      color rgba(0, 0, 0, .86)
      font-size 13px
      font-weight 600
      margin 0 5px

  .settlement-item
    border-top 10px solid #F2F3F5

    .title
      display flex
      justify-content space-between
      align-items center
      padding 6px 10px
      background #E8E9EB
      color rgba(0, 0, 0, .5)
      font-size 1rem
      font-weight 600

</style>
