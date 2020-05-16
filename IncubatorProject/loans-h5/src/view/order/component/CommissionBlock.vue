<template>
  <div class='CommissionBlock'>
    <div class="title">
      <span>佣金分配</span>
    </div>
    <van-field v-model="ac_general_agent" type="number" label="总代理" readonly v-if="showField(4)">
      <span slot="right-icon">%</span>
    </van-field>
    <van-field v-model="ac_first_agent" type="number" label="一级会员" readonly v-if="showField(3)">
      <span slot="right-icon">%</span>
    </van-field>
    <van-field v-model="ac_senior_member" type="number" label="高级会员" readonly v-if="showField(2)">
      <span slot="right-icon">%</span>
    </van-field>
    <van-field v-model="ac_member" type="number" label="会员" readonly v-if="showField(1)">
      <span slot="right-icon">%</span>
    </van-field>
    <van-field v-model="ac_fans" type="number" label="粉丝" readonly>
      <span slot="right-icon">%</span>
    </van-field>
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
      ac_general_agent: 0,
      ac_first_agent: 0,
      ac_senior_member: 0,
      ac_member: 0,
      ac_fans: 0
    }
  },
  created () {
    this.getCommission()
  },
  methods: {
    getCommission () {
      let req = {
        order_id: this.orderId
      }
      getCommissionAssign(req).then(res => {
        if (res.code === 0) {
          if (res.data.commissions.length > 0) {
            let commissions = res.data.commissions
            let general = commissions.find(ele => ele.grade === 4)
            if (general) {
              this.ac_general_agent = Number(general.rate).toFixed(1)
            }
            let first = commissions.find(ele => ele.grade === 3)
            if (first) {
              this.ac_first_agent = Number(first.rate).toFixed(1)
            }
            let senior = commissions.find(ele => ele.grade === 2)
            if (senior) {
              this.ac_senior_member = Number(senior.rate).toFixed(1)
            }
            let member = commissions.find(ele => ele.grade === 1)
            if (member) {
              this.ac_member = Number(member.rate).toFixed(1)
            }
            let fans = commissions.find(ele => ele.grade === 0)
            if (fans) {
              this.ac_fans = Number(fans.rate).toFixed(1)
            }
          }
        }
      })
    },
    showField (val) {
      var grade = this.$store.getters.userInfo.grade
      // var grade = 3
      return grade >= val
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.CommissionBlock
  .title
    display flex
    justify-content space-between
    align-items center
    padding 6px 10px
    background #E8E9EB
    color rgba(0, 0, 0, .5)
    font-size 1rem
    font-weight 600

    .right
      display inline-flex
      align-items center
      color #6DD400

      img
        width 15px

    .right2
      color rgba(0, 0, 0, .85)

  .van-field__label
    text-align right
    width 60px
    margin-right 10px

  .van-field__control
    background rgba(245, 245, 245, 1)
    text-align center
    padding 2px
</style>
