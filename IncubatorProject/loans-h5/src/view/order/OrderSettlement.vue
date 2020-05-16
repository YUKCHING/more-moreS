<template>
  <div class='OrderSettlement'>
    <!-- 高级会员 -->
    <div v-if="Object.keys(senior_member).length > 0" class="settlement-item">
      <div class="title">
        <span>高级会员</span>
      </div>
      <van-field v-model="senior_member.rate" type="number" label="佣金比例" readonly>
        <span slot="right-icon">%</span>
      </van-field>
      <van-field v-model="senior_member.commission" type="number" label="金额" readonly>
        <span slot="right-icon">元</span>
      </van-field>
      <van-field v-model="senior_member.modeName" label="提现模式" readonly />
    </div>
    <!-- 会员 -->
    <div v-if="Object.keys(member).length > 0" class="settlement-item">
      <div class="title">
        <span>会员</span>
      </div>
      <van-field v-model="member.rate" type="number" label="佣金比例" readonly>
        <span slot="right-icon">%</span>
      </van-field>
      <van-field v-model="member.commission" type="number" label="金额" readonly>
        <span slot="right-icon">元</span>
      </van-field>
      <van-field v-model="member.modeName" label="提现模式" readonly required placeholder="请选择" @click="showModePopup(1)">
        <img slot="right-icon" src="@/assets/icon/icon-arrow-right.png" style="height: 18px">
      </van-field>
    </div>
    <!-- 粉丝 -->
    <div
      class="settlement-item"
      v-for="(item, index) in fans"
      :key="index"
    >
      <div class="title">
        <span>粉丝-{{item.user_name}}</span>
      </div>
      <van-field v-model="item.rate" type="number" label="佣金比例" readonly>
        <span slot="right-icon">%</span>
      </van-field>
      <van-field v-model="item.commission" type="number" label="金额" readonly>
        <span slot="right-icon">元</span>
      </van-field>
      <van-field v-model="item.modeName" label="提现模式" readonly required placeholder="请选择" @click="showModePopup(0, item.user_id)">
        <img slot="right-icon" src="@/assets/icon/icon-arrow-right.png" style="height: 18px">
      </van-field>
    </div>
    <van-field v-model="approval.name" label="审批人" readonly required placeholder="请选择审批人" @click="showGeneralPopup = true">
      <img slot="right-icon" src="@/assets/icon/icon-arrow-right.png" style="height: 18px">
    </van-field>
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
    <van-popup v-model="showGeneralPopup" position="bottom" class="popup-class">
      <employees-list @select="getHandlerIdAction"></employees-list>
    </van-popup>
  </div>
</template>
<script>
import { getCommissionAssign, postApplySettle } from '@/apis/api.js'
import EmployeesList from './EmployeesList'
export default {
  components: {
    EmployeesList
  },
  data () {
    return {
      orderId: '',
      senior_member: {},
      member: {},
      fans: [],
      showModePicker: false,
      showGeneralPopup: false,
      modeList: [
        {value: '1', text: 'T+0'},
        {value: '2', text: 'T+1'},
        {value: '3', text: 'T+30'}
      ],
      currentGrade: '',
      currentUserId: '',
      approval: {
        name: '',
        id: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.orderId = this.$route.query.order_id
      this.getCommission()
    },
    getCommission () {
      let req = {
        order_id: this.orderId
      }
      getCommissionAssign(req).then(res => {
        if (res.code === 0) {
          console.log(res)
          if (res.data.commissions.length > 0) {
            let commissions = res.data.commissions
            let temSenior = commissions.find(ele => ele.grade === 2)
            this.senior_member = {
              ...temSenior,
              modeName: 'T+30'
            }
            let temMenmber = commissions.find(ele => ele.grade === 1)
            this.member = {
              ...temMenmber,
              modeName: ''
            }
            this.fans = commissions.filter(ele => ele.grade === 0)
            console.log(this.fans)
          }
        }
      })
    },
    closeAction () {
      this.$router.go(-1)
    },
    submitAction () {
      if (!this.member.mode) {
        this.toast('请选择会员提现模式')
        return
      }
      var isChoice = true
      this.fans.forEach(ele => {
        if (!ele.modeName) {
          isChoice = false
        }
      })
      if (!isChoice) {
        this.toast('请选择粉丝提现模式')
        return
      }
      if (!this.approval.id) {
        this.toast('请选择审批人')
        return
      }
      let req = {
        order_id: this.orderId,
        member_mode: this.member.mode,
        fans: this.fans.map(ele => {
          return {
            fan_id: ele.user_id,
            fans_mode: ele.mode
          }
        }),
        approval_id: this.approval.id
      }
      console.log(req)
      postApplySettle(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('提交成功').then(() => {
            this.$router.go(-1)
          })
        }
      })
    },
    showModePopup (grade, userId) {
      this.currentGrade = grade
      this.currentUserId = userId
      this.showModePicker = true
    },
    onPickerConfirm (item) {
      this.showModePicker = false

      if (this.currentGrade === 1) {
        this.member.modeName = item.text
        this.member.mode = item.value
      } else if (this.currentGrade === 0) {
        this.fans.forEach(ele => {
          console.log(this.currentUserId)

          if (ele.user_id === this.currentUserId) {
            ele.modeName = item.text
            ele.mode = item.value
          }
          console.log(ele)
        })
      }
      this.currentGrade = ''
      this.currentUserId = ''
    },
    getHandlerIdAction (item) {
      console.log(item)
      this.approval = item
      this.showGeneralPopup = false
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderSettlement

  .popup-class
    height 100%

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
