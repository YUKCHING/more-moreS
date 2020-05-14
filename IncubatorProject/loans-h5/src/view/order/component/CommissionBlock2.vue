<template>
  <div class='CommissionBlock'>
    <div class="title">
      <span>佣金分配</span>
    </div>
    <div class="com-item" v-if="showField(4)">
      <span class="label">总代理</span>
      <span class="value">{{ac_general_agent}}%</span>
      <span class="value">{{money_general_agent}}</span>
    </div>
    <div class="com-item" v-if="showField(3)">
      <span class="label">一级会员</span>
      <span class="value">{{ac_first_agent}}%</span>
      <span class="value">{{money_first_agent}}</span>
    </div>
    <div class="com-item" v-if="showField(2)">
      <span class="label">高级会员</span>
      <span class="value">{{ac_senior_member}}%</span>
      <span class="value">{{money_senior_member}}</span>
    </div>
    <div class="com-item" v-if="showField(1)">
      <span class="label">会员</span>
      <span class="value">{{ac_member}}%</span>
      <span class="value">{{money_member}}</span>
    </div>
    <div class="com-item">
      <span class="label">粉丝</span>
      <span class="value">{{ac_fans}}%</span>
      <span class="value">{{money_fans}}</span>
    </div>
    <div class="com-item">
      <span class="label"></span>
      <span class="value2">比例</span>
      <span class="value2">金额</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    commission: {
      type: Object,
      default: () => {
        return {}
      }
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      ac_general_agent: 0,
      ac_first_agent: 0,
      ac_senior_member: 0,
      ac_member: 0,
      ac_fans: 0,
      money_general_agent: 0,
      money_first_agent: 0,
      money_senior_member: 0,
      money_member: 0,
      money_fans: 0
    }
  },
  created () {
    this.getAcInfo()
  },
  methods: {
    getAcInfo () {
      let com = this.commission
      this.ac_general_agent = (Number(com.general_agent) - Number(com.first_agent)).toFixed(1)
      this.ac_first_agent = (Number(com.first_agent) - Number(com.senior_member)).toFixed(1)
      this.ac_senior_member = (Number(com.senior_member) - Number(com.member)).toFixed(1)
      this.ac_member = (Number(com.member) - Number(com.fans)).toFixed(1)
      this.ac_fans = Number(com.fans).toFixed(1)

      this.money_general_agent = (this.ac_general_agent * this.amount * 0.01).toFixed(1)
      this.money_first_agent = (this.ac_first_agent * this.amount * 0.01).toFixed(1)
      this.money_senior_member = (this.ac_senior_member * this.amount * 0.01).toFixed(1)
      this.money_member = (this.ac_member * this.amount * 0.01).toFixed(1)
      this.money_fans = (this.ac_fans * this.amount * 0.01).toFixed(1)
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
  padding-bottom 16px

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

  .com-item
    display flex
    align-items center
    margin-top 16px

    span
      display inline-block
      box-sizing border-box
      text-align center

    .label
      color #868686
      font-weight 600
      font-size 15px
      width 23%
      text-align right
      margin-right 18px

    .value
      background rgba(0, 0, 0, .1)
      opacity .6
      margin-right 27px
      padding 10px 0
      width 28%
      color #000
      font-size 14px

    .value2
      margin-right 27px
      width 28%
      color #101010
      font-size 12px
</style>
