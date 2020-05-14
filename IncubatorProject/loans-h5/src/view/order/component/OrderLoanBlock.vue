<template>
  <div class='OrderLoanBlock'>
    <div class="loansTitle">
      <span>{{product.product_name || '-'}}</span>
      <van-button class="button" :disabled="changeButtonStatus" @click="selectProductAction">{{!isSetProduct ? '选择产品' : '更换产品'}}</van-button>
    </div>
    <div class="loansInfo">
      <div class="item">
        <p>{{audit.amount ? audit.amount + '元' : '-'}}</p>
        <p>审批额度</p>
      </div>
      <div class="item">
        <p>{{audit.monthly_rate ? audit.monthly_rate + '%' : '-'}}</p>
        <p>月利率</p>
      </div>
      <div class="item">
        <p>{{audit.time_limit || '-'}}</p>
        <p>申请期限</p>
      </div>
    </div>
    <div class="other">
      <van-field v-model="otherCost" type="number" label="其它费用：" :readonly="changeButtonStatus"/>
    </div>
    <van-popup v-model="showProductPopup" position="bottom" class="popup-class">
      <loans-list :select="true" @select="loansSelectAction"></loans-list>
    </van-popup>
  </div>
</template>
<script>
import LoansList from '@/view/loans/LoansList'
export default {
  components: {
    LoansList
  },
  props: {
    audit: {
      type: Object,
      default: () => {
        return {}
      }
    },
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    isSetProduct () {
      return this.product.product_name
    },
    changeButtonStatus () {
      var value = !this.product.product_name
      if (this.info.status === 13 || this.info.status === 14) {
        value = false // false是不禁止
      }
      if (this.info.status === 0 || this.info.status === 5 || this.info.status === 6 || this.info.status === 8) {
        value = true // true是禁止
      }
      return value
    }
  },
  data () {
    return {
      showProductPopup: false,
      otherCost: ''
    }
  },
  methods: {
    selectProductAction () {
      this.showProductPopup = true
    },
    loansSelectAction (item) {
      console.log(item)
      this.showProductPopup = false
      if (this.product.id !== item.id) {
        this.$emit('select', item)
        // this.hasChangeProduct = true
        // this.product = item
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderLoanBlock
  border .6px solid rgba(0, 0, 0, .25)
  box-shadow 0px 2px 4px 0px rgba(0, 0, 0, .1)
  padding .8rem .8rem 0rem

  .popup-class
    height 100%

  .button
    display inline-block
    background #EE5150
    color #FFFFFF
    padding 8px 15px
    border-radius 5px
    font-size 12px
    margin-bottom .8rem
    height 32px
    line-height 12px

  .loansTitle
    display flex
    justify-content space-between
    align-items center
    font-size 14px

  .loansInfo
    display flex
    justify-content space-around
    align-items center

    .item
      width 30%
      display inline-flex
      flex-direction column
      align-items center
      font-size 12px

      p
        &:nth-child(2)
          color rgba(0, 0, 0, .25)
          font-size 12px
          transform scale(.9)
          margin-top 1rem

  .other
    .van-cell
      background rgba(0, 0, 0, .1)
      padding 6px 8px
      margin .5rem 0
      font-size 12px
</style>
