<template>
  <div class='OrderLoanBlock'>
    <div class="loansTitle">
      <span>{{product.product_name || '-'}}</span>
      <van-button class="button" :disabled="changeButtonStatus" @click="selectProductAction" v-if="!hiddenButton">{{!isSetProduct ? '选择产品' : '更换产品'}}</van-button>
    </div>
    <div class="loansInfo">
      <div class="item">
        <p>{{audit.amount ? audit.amount + '万元' : '-'}}</p>
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
    },
    identity: {
      type: Number,
      default: -1
    },
    hiddenButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSetProduct () {
      return this.product.product_name
    },
    changeButtonStatus () {
      var isBan = true
      var status = this.info.status

      if (this.identity === 2) { // 高级会员-业务员
        if (status === 1 && this.product.product_name) {
          isBan = false
        } else if (status === 14) {
          isBan = false
        } else {
          isBan = true
        }
      } else if (this.identity === 4 || this.identity === 3) { // 总代理/一级代理
        isBan = true
      } else if (this.identity === 8) { // 内控
        if (status === 3 || status === 13 || status === 14) {
          isBan = false
        } else {
          isBan = true
        }
      }

      return isBan
    }
  },
  data () {
    return {
      showProductPopup: false,
      otherCost: '',
      grade: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.grade = Number(this.$store.getters.userInfo.grade)
      if (process.env.NODE_ENV !== 'production') {
      }
    },
    selectProductAction () {
      this.showProductPopup = true
    },
    loansSelectAction (item) {
      console.log(item)
      this.showProductPopup = false
      if (this.product.id !== item.id) {
        this.$emit('select', item)
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
