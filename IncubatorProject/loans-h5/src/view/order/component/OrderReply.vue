<template>
  <div class='OrderReply'>
    <div style="padding-top: 1px">
      <order-step :list="list" :active="active"></order-step>
    </div>
    <p class="header">
      <span class="star">*</span>
      审核结果
    </p>
    <div class="panel-white">
      <van-radio-group v-model="replySelect" direction="horizontal">
        <van-radio :name="1">
          <template #icon="props">
            <img class="img-icon" :src="props.checked ?require('@/assets/order/icon-step-circle1.png') : require('@/assets/order/icon-step-circle2.png')" />
          </template>
          通过
        </van-radio>
        <van-radio :name="2">
          <template #icon="props">
            <img class="img-icon" :src="props.checked ?require('@/assets/order/icon-step-circle1.png') : require('@/assets/order/icon-step-circle2.png')" />
          </template>
          退审核</van-radio>
        <van-radio :name="3">
          <template #icon="props">
            <img class="img-icon" :src="props.checked ?require('@/assets/order/icon-step-circle1.png') : require('@/assets/order/icon-step-circle2.png')" />
          </template>
          已拒绝</van-radio>
      </van-radio-group>
    </div>
    <div v-if="replySelect === 1">
      <p class="header">
        <span class="star">*</span>
        批复额度
      </p>
      <div class="panel-white">
        <van-field v-model="replyQuota" placeholder="请输入批复额度" type="number" clearable/>
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
        <van-field v-model="replyDate" placeholder="请输入批复期限" type="number" clearable/>
      </div>
    </div>
    <p class="header">
      <span class="star">*</span>
      审核意见
    </p>
    <div class="panel-white">
      <van-field v-model="replyAdvice" placeholder="请输入审核意见" clearable/>
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
import OrderStep from './OrderStep'
export default {
  components: {
    OrderStep
  },
  data () {
    return {
      list: [
        '待提交', '已提交', '已批复', '已签约', '已放款'
      ],
      active: 1,
      replySelect: 1,
      replyAdvice: '',
      replyConclusion: '',
      replyQuota: '',
      replyRate: '',
      replyDate: ''
    }
  },
  methods: {
    closeAction () {
      this.$router.go(-1)
    },
    submitAction () {

    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderReply
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
