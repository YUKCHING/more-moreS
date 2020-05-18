<template>
  <div class="index">
    <div class='content' v-if="isWeixinBrowser || !isProduction">
      <div class="panel">
        <home-page v-if="active === 0" :info="memberInfo" @showTool="showToolPicker = true"></home-page>
        <deal v-else-if="active === 1" :info="memberInfo"></deal>
        <member v-else-if="active === 2" :info="memberInfo"></member>
        <order v-else-if="active === 3" :info="memberInfo"></order>
        <my v-else-if="active === 4" :info="memberInfo"></my>
      </div>
      <van-tabbar v-model="active" active-color="#FE3525" @change="changeTabbar">
        <van-tabbar-item :name="0">
          <span>首页</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon1.active : tabIcon1.inactive"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item v-if="isShowDeal" :name="1">
          <span>交易</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon2.active : tabIcon2.inactive"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item :name="2">
          <span>{{gradeName}}</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon3.active : tabIcon3.inactive"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item :name="3">
          <span>订单</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon4.active : tabIcon4.inactive"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item :name="4">
          <span>我的</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon5.active : tabIcon5.inactive"/>
            </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="ban-block" v-else>
      <span>请使用微信打开页面</span>
    </div>
    <van-popup v-model="showToolPicker" position="bottom" class="tool-popup">
      <div class="tool-menu">
        <div class="tool-item" @click="showViolation">
          <img src="@/assets/icon/icon_tool_wzcx.png">
          <span>违章查询</span>
        </div>
        <div class="tool-item">
          <img src="@/assets/icon/icon_tool_jsq.png">
          <span>车贷计算器</span>
        </div>
      </div>
      <div class="tool-bottom">
        <img src="@/assets/icon/icon-cha.png" @click="showToolPicker = false">
      </div>
    </van-popup>
    <qr-overlay></qr-overlay>
  </div>
</template>
<script>
import { getOpenidByCode, getTokenByOpenId, getUserInfo } from '@/apis/api.js'
import HomePage from './HomePage'
import Member from './Member'
import My from './My'
import Order from '@/view/order/index'
import Deal from '@/view/deal/index'
import initLoginCheckInfo from '@/common/js/login.js'
import QrOverlay from '@/components/QrOverlay'

export default {
  components: {
    HomePage, Member, My, Order, Deal, QrOverlay
  },
  computed: {
    isProduction () {
      return process.env.NODE_ENV === 'production'
    },
    isWeixinBrowser () {
      return this.judgeWeixinBrowser()
    },
    gradeName () {
      let name = '粉丝'
      switch (this.memberInfo.grade) {
        case 1:
          name = '会员'
          break
        case 2:
          name = '高级会员'
          break
        case 3:
          name = '一级代理'
          break
        case 4:
          name = '总代理'
          break

        default:
          break
      }
      return name
    },
    isShowDeal () {
      return this.memberInfo.grade === 2
      // return true
    }
  },
  data () {
    return {
      inviteCode: '',
      active: 2,
      tabIcon1: {
        active: require('@/assets/icon/tab_home_fill.png'),
        inactive: require('@/assets/icon/tab_home.png')
      },
      tabIcon2: {
        active: require('@/assets/icon/tab_deal_fill.png'),
        inactive: require('@/assets/icon/tab_deal.png')
      },
      tabIcon3: {
        active: require('@/assets/icon/tab_member_fill.png'),
        inactive: require('@/assets/icon/tab_member.png')
      },
      tabIcon4: {
        active: require('@/assets/icon/tab_business_fill.png'),
        inactive: require('@/assets/icon/tab_business.png')
      },
      tabIcon5: {
        active: require('@/assets/icon/tab_my_fill.png'),
        inactive: require('@/assets/icon/tab_my.png')
      },
      memberInfo: {
        grade: 0
      },
      showToolPicker: false
    }
  },
  created () {
    this.init()
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  methods: {
    init () {
      if (this.$store.getters.nowTab) {
        this.active = this.$store.getters.nowTab
      }
      if (this.$store.getters.userInfo) {
        this.memberInfo = this.$store.getters.userInfo
      }
      if (this.isProduction) {
        initLoginCheckInfo(this.$route, 'index').then(info => {
          if (info && info.code === -1000104) {
            this.bus.$emit('showQrOverlay')
            return
          }
          this.memberInfo = info
          // 分享设置
          let shareLink = 'http://api.tainuocar.com/home/index?invite=' + info['invite_code']
          this.initWxShare(window.shareUrl, '泰诺汽车平台', '一站式汽车金融服务\r\n做车贷，找泰诺！', shareLink)
          window.isReady = true
        })
      } else {
        // this.getOpenId('071s3YPf1kSkRt0cbzNf1R01Qf1s3YPr') // 调试 直接获取openId
        this.getInfo()
      }
    },
    showViolation () {
      this.$router.push({
        path: '/violation'
      })
    },
    getOpenId (code) {
      console.log('getOpenIdByCode')
      let req = {
        code: code
      }
      getOpenidByCode(req).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('setOpenid', {
            openid: res.data.openid
          }).then(() => {
            this.getToken()
          })
        }
      })
    },
    getToken () {
      console.log('getTokenByOpenId')
      let req = {
        openid: this.$store.getters.openid,
        from: 'web',
        invite_code: this.inviteCode
      }
      getTokenByOpenId(req).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('setToken', {
            token: res.data.token
          }).then(() => {
            this.getInfo()
          })
        }
      })
    },
    getInfo () {
      let req = {
        openid: this.$store.getters.openid,
        token: this.$store.getters.token
      }
      getUserInfo(req).then(res => {
        if (res.code === 0) {
          this.memberInfo = {
            ...res.data
          }
          this.$store.dispatch('setUserInfo', {
            userInfo: JSON.stringify(this.memberInfo)
          })
        }
      })
    },
    resetRoute () {
      let path = this.$route.path
      let query = this.$route.query
      if (query.hasOwnProperty('code')) {
        delete query.code
      }
      this.$router.replace({
        path: path,
        query: {
          ...query,
          isReady: true
        }
      })
    },
    changeTabbar (name, title) {
      this.$store.dispatch('setNowTab', {
        nowTab: name
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.index
  height 100%
  background #F3F3F3

  .content
    height 100%

    .panel
      background #fafafa
      height calc(100vh - 50px)
      overflow auto
      -webkit-overflow-scrolling touch

  .ban-block
    height 100%
    display flex
    justify-content center
    align-items center
    font-size 1.5rem

  .tool-popup
    border-top-left-radius 1.5rem
    border-top-right-radius 1.5rem
    z-index -1

    .tool-menu
      display flex
      align-items center
      justify-content space-around
      padding 5rem 0
      z-index 100

      .tool-item
        display inline-flex
        flex-direction column
        align-items center
        justify-content center

        img
          width 5rem
          margin-bottom .7rem

        span
          font-size 1.17rem
          color #030303

    .tool-bottom
      text-align center
      padding 0 0 1rem

      img
        width 1.5rem
</style>
