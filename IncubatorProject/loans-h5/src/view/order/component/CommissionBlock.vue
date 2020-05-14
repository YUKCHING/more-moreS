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
export default {
  props: {
    commission: {
      type: Object,
      default: () => {
        return {}
      }
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
