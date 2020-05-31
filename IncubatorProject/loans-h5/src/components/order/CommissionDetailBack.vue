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
      <van-field :value="getModeName(item.mode)" label="提现模式" readonly v-if="item.grade === 2" />
      <van-field :value="getModeName(item.mode)" v-if="item.grade === 1" label="提现模式" readonly placeholder="请选择" @click="showModePopup(item.user_id)">
        <img slot="right-icon" src="@/assets/icon/icon-arrow-right.png" style="height: 18px">
      </van-field>
      <van-field :value="getModeName(item.mode)" placeholder="请选择" v-if="item.grade === 0" label="提现模式" readonly @click="showModePopup(item.user_id)">
        <img slot="right-icon" src="@/assets/icon/icon-arrow-right.png" style="height: 18px">
      </van-field>
    </div>
    <div class="settlement-item">
      <div class="title">
        <span>退回原因</span>
      </div>
      <van-field :value="settle.remark" label="审批意见" type="textarea" readonly />
    </div>
    <div class="button-block">
      <van-button class="button1" @click="closeAction">关 闭</van-button>
      <van-button class="button2" @click="submitAction">提 交</van-button>
    </div>
    <van-popup v-model="showModePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="modeList"
        @cancel="showModePicker = false"
        @confirm="onPickerConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { getCommissionAssign, postApplySettle } from '@/apis/api.js'
export default {
  props: {
    orderId: {
      type: String,
      default: ''
    },
    settle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      commissions: [],
      showModePicker: false,
      modeList: [
        {value: '1', text: 'T+0'},
        {value: '2', text: 'T+1'},
        {value: '3', text: 'T+30'}
      ],
      currentUserId: ''
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
            this.commissions = res.data.commissions.sort((a, b) => b.grade - a.grade).filter(ele => ele.grade <= 2)
          }
        }
      })
    },
    closeAction () {
      this.$router.go(-1)
    },
    submitAction () {
      let member = this.commissions.find(ele => ele.grade === 1)
      let fans = this.commissions.filter(ele => ele.grade === 0)
      if (member.mode === 0) {
        this.toast('请选择会员提现模式')
        return
      }
      var fansChoice = true
      fans.forEach(ele => {
        if (ele.mode === 0) {
          fansChoice = false
        }
      })
      if (!fansChoice) {
        this.toast('请选择粉丝提现模式')
        return
      }
      let req = {
        order_id: this.orderId,
        member_mode: member.grade,
        fans: fans.map(ele => {
          return {
            fan_id: ele.user_id,
            fans_mode: ele.mode
          }
        }),
        approval_id: this.settle.approver_id
      }
      postApplySettle(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('提交成功').then(() => {
            this.$router.go(-1)
          })
        }
      })
    },
    showModePopup (userId) {
      this.currentUserId = userId
      this.showModePicker = true
    },
    onPickerConfirm (item) {
      this.showModePicker = false
      this.commissions.forEach(ele => {
        if (ele.user_id === this.currentUserId) {
          ele.mode = Number(item.value)
        }
      })
      this.currentUserId = ''
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

  .button-block
    display flex
    justify-content space-around
    align-items center
    padding 40px 0
    background #EBF0F4

    .van-button
      width 40%

    .button1
      color #EE5150
      border 1px solid #EE5150

    .button2
      background #EE5150
      color #ffffff

</style>
