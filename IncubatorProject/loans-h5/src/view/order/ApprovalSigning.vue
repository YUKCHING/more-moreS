<template>
  <div class='ApprovalSigning'>
    <p class="header">
      <span class="star">*</span>
      审核结果
    </p>
    <div class="panel-white">
      <van-radio-group v-model="replySelect" direction="horizontal">
        <van-radio :name="1">
          <template #icon="props">
            <img class="img-icon" :src="props.checked ?require('@/assets/icon/icon-radio-active.png') : require('@/assets/icon/icon-radio-normal.png')" />
          </template>
          通过
        </van-radio>
        <van-radio :name="2">
          <template #icon="props">
            <img class="img-icon" :src="props.checked ?require('@/assets/icon/icon-radio-active.png') : require('@/assets/icon/icon-radio-normal.png')" />
          </template>
          退审核</van-radio>
        <van-radio :name="3">
          <template #icon="props">
            <img class="img-icon" :src="props.checked ?require('@/assets/icon/icon-radio-active.png') : require('@/assets/icon/icon-radio-normal.png')" />
          </template>
          拒绝</van-radio>
      </van-radio-group>
    </div>
    <div v-if="replySelect === 1">
      <p class="header">
        <span class="star">*</span>
        批复额度
      </p>
      <div class="panel-white">
        <van-field v-model="replyAmount" placeholder="请输入批复额度" type="number" clearable/>
      </div>
      <p class="header">
        <span class="star">*</span>
        批复利率
      </p>
      <div class="panel-white">
        <van-field v-model="replyRate" placeholder="请输入批复利率" type="number" clearable>
          <span slot="right-icon">%</span>
        </van-field>
      </div>
      <p class="header">
        <span class="star">*</span>
        批复期限
      </p>
      <div class="panel-white">
        <van-field v-model="replyTime" placeholder="请输入批复期限" type="number" clearable/>
      </div>
    </div>
    <p class="header">
      <span class="star">*</span>
      审核意见
    </p>
    <div class="panel-white">
      <van-field v-model="replyOpinion" placeholder="请输入审核意见" clearable/>
    </div>
    <p class="header">
      <span class="star">*</span>
      审核结论
    </p>
    <div class="panel-white">
      <van-field v-model="replyConclusion" placeholder="请添加更多备注信息" type="textarea" clearable
      :autosize="{
        minHeight: 100
      }"
      />
    </div>
    <div class="buttonPanel">
      <van-button class="button1" @click="closeAction">关闭</van-button>
      <van-button class="button2" type="danger" @click="submitAction">提交</van-button>
    </div>
  </div>
</template>
<script>
import OrderStep from './component/OrderStep'
import { postLoanApproval, getLoanOrderInfo } from '@/apis/api.js'
export default {
  components: {
    OrderStep
  },
  data () {
    return {
      replySelect: 1,
      replyOpinion: '',
      replyConclusion: '',
      replyAmount: '',
      replyRate: '',
      replyTime: '',
      order_id: '',
      product_id: '',
      audit: {}
    }
  },
  watch: {
    'replySelect' () {
      this.resetAction()
      if (this.replySelect === 1) {
        this.setAuditInfo()
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.query) {
        this.order_id = this.$route.query.orderId
        this.product_id = this.$route.query.productId
        this.replySelect = Number(this.$route.query.reply)
        this.getInfo()
      }
    },
    getInfo () {
      let req = {
        order_id: this.order_id
      }
      getLoanOrderInfo(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.audit = res.data.audit
          this.setAuditInfo()
        }
      })
    },
    setAuditInfo () {
      if (this.audit) {
        this.replyAmount = Number(this.audit.amount)
        this.replyRate = Number(this.audit.monthly_rate)
        this.replyTime = Number(this.audit.time_limit)
      }
    },
    closeAction () {
      this.$router.go(-1)
    },
    resetAction () {
      this.replyOpinion = ''
      this.replyConclusion = ''
      this.replyAmount = ''
      this.replyRate = ''
      this.replyTime = ''
    },
    submitAction () {
      if (this.replySelect === 1) {
        if (this.replyTime === '' || this.replyAmount === '' || this.replyRate === '' || this.replyOpinion === '' || this.replyConclusion === '') {
          this.toast('请填写完整信息')
          return
        }
      }
      if (this.replySelect === 2 || this.replySelect === 3) {
        if (this.replyOpinion === '' || this.replyConclusion === '') {
          this.toast('请填写完整信息')
          return
        }
      }
      let req = {
        result: this.replySelect,
        order_id: this.order_id,
        product_id: this.product_id,
        amount: this.replyAmount,
        monthly_rate: this.replyRate,
        time_limit: this.replyTime,
        opinion: this.replyOpinion,
        conclusion: this.replyConclusion
      }
      this.tLoading()
      postLoanApproval(req).then(res => {
        console.log(res)
        this.tClear()
        if (res.code === 0) {
          this.tSuccess('提交成功').then(() => {
            this.$store.dispatch('setNowTab', {
              nowTab: 3
            }).then(() => {
              this.$router.push({
                path: '/index'
              })
            })
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.ApprovalSigning
  height 100%
  background rgba(239, 240, 242, 1)

  .header
    display flex
    align-items center
    box-sizing border-box
    padding 10px 15px
    font-size 13px
    color #6D7278

    .star
      color #E02020
      margin-right 5px

  .panel-white /deep/
    background #ffffff
    padding 14px 25px
    font-size 16px

    .van-radio-group--horizontal
      justify-content space-around

    .van-radio__label
      font-size 16px

    .img-icon
      height 20px

    .van-cell
      padding 0

  .buttonPanel
    display flex
    justify-content space-around
    align-items center
    margin 40px 0

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150

</style>
