<template>
  <div class='SetCommission'>
    <div class="panel">
      <van-field v-model="f_product" label="选择产品" placeholder="请选择产品" required readonly @click="showProductList">
        <img src="@/assets/icon/icon-arrow-down2.png" slot="right-icon" style="width: 18px;">
      </van-field>
      <van-field v-model="f_product_commission" type="number" label="产品总佣金" placeholder="请输入产品总佣金" required @blur="blurField1">
        <span slot="right-icon">%</span>
      </van-field>
    </div>
    <div class="panel">
      <div class="title">
        <span>抽佣比例</span>
        <img src="@/assets/icon/icon-remind.png" @click="remindClickAction">
      </div>
      <van-field v-model="f_product_commission" type="number" label="总代理" placeholder="请输入总代理佣金" readonly @blur="blurField1">
        <span slot="right-icon">%</span>
      </van-field>
      <van-field v-model="f_first_agent" type="number" label="一级代理" placeholder="请输入一级代理佣金" @blur="blurField2">
        <span slot="right-icon">%</span>
      </van-field>
      <van-field v-model="f_senior_member" type="number" label="高级会员" placeholder="请输入高级会员佣金" @blur="blurField3">
        <span slot="right-icon">%</span>
      </van-field>
      <van-field v-model="f_member" type="number" label="会员" placeholder="请输入会员佣金" @blur="blurField4">
        <span slot="right-icon">%</span>
      </van-field>
    </div>
    <div class="panel">
      <div class="title">
        <span>是否允许下级更改佣金比例</span>
      </div>
      <div class="radio-block">
        <van-radio-group v-model="f_radio" direction="horizontal">
          <van-radio :name="1">是</van-radio>
          <van-radio :name="0">否</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="button-block">
      <van-button class="button1" @click="closeAction">关 闭</van-button>
      <van-button class="button2" @click="checkData">设 置</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="productList"
        @cancel="showPicker = false"
        @confirm="onPickerConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { createCommission, getProductList } from '@/apis/api.js'
export default {
  data () {
    return {
      f_product: '',
      f_product_item: {},
      f_product_commission: '',
      f_general_agent: '',
      f_first_agent: '',
      f_senior_member: '',
      f_member: '',
      f_radio: 0,
      productList: [],
      showPicker: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getProductList()
    },
    remindClickAction () {
      this.toastLong('佣金设置规则：\n规则1：设置所有级别的佣金比例。\n规则2：只设置一级代理的佣金，其他默认为0，由一级代理设置高级会员，高级会员设置会员。\n计算方式：本级别减去下级的差值等于自己获得的佣金，例总代理佣金2%，设置一级代理1.8%，中间的差值0.2%为总代理得到的佣金。')
    },
    getProductList () {
      getProductList({}).then(res => {
        if (res.code === 0) {
          if (res.data) {
            this.productList = res.data.list.map(ele => {
              return {
                ...ele,
                text: ele.product_name
              }
            })
          }
        }
      })
    },
    showProductList () {
      this.showPicker = true
    },
    onPickerConfirm (value) {
      this.f_product = value.product_name
      this.f_product_item = value
      this.showPicker = false
    },
    checkData () {
      if (!this.f_product) {
        this.toast('请选择产品')
        return
      }
      if (!this.f_product_commission) {
        this.toast('请设置产品总佣金')
        return
      }
      if (!this.f_first_agent) {
        this.toast('请设置一级代理佣金')
        return
      }
      if (this.f_senior_member && !this.f_member) {
        this.toast('请补全信息')
        return
      }
      this.creatRuleAction()
    },
    creatRuleAction () {
      let req = {
        product_id: this.f_product_item.id,
        total: this.f_product_commission,
        first_agent: this.f_first_agent,
        senior_member: this.f_senior_member || '0',
        member: this.f_member || '0',
        allow_subordinate_modify: this.f_senior_member ? this.f_radio : 1
      }
      createCommission(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('设置成功').then(() => {
            this.$router.go(-1)
          })
        }
      })
    },
    closeAction () {
      this.$router.go(-1)
    },
    blurField1 () {
      if (Number(this.f_product_commission) > 100) {
        this.f_product_commission = 100
      }
    },
    blurField2 () {
      if (Number(this.f_first_agent) > Number(this.f_product_commission)) {
        this.f_first_agent = this.f_product_commission
      }
    },
    blurField3 () {
      if (Number(this.f_senior_member) > Number(this.f_first_agent)) {
        this.f_senior_member = this.f_first_agent
      }
    },
    blurField4 () {
      if (Number(this.f_member) > Number(this.f_senior_member)) {
        this.f_member = this.f_senior_member
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.SetCommission /deep/
  height 100%
  background #F9F9FA

  .van-field__label
    text-align right
    width 70px
    margin-right 20px
    line-height 32px

  .van-field__body
    border 1px solid #BBBBBB
    border-radius 3px
    box-sizing border-box
    padding 3px 5px

  .van-radio-group--horizontal
    justify-content space-around

  .panel
    background #ffffff

    .title
      display flex
      justify-content space-between
      align-items center
      background #F9F9FA
      padding 6px 12px
      box-sizing border-box
      color #101010
      font-size 14px

      img
        width 18px
        height 18px

    .radio-block
      box-sizing border-box
      padding 15px 0

  .button-block
    display flex
    justify-content space-around
    align-items center
    padding 40px 0

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150
      color #ffffff
</style>
