<template>
  <div class="index">
    <div class='content' v-if="isWeixinBrowser || !isProduction">
      <div class="panel">
        <home-page v-if="active === 0" :info="memberInfo" @showTool="showToolPicker = true"></home-page>
        <member v-else-if="active === 1" :info="memberInfo"></member>
        <my v-else-if="active === 2" :info="memberInfo"></my>
      </div>
      <van-tabbar v-model="active" active-color="#FE3525">
        <van-tabbar-item>
          <span>首页</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon1.active : tabIcon1.inactive"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>粉丝</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon2.active : tabIcon2.inactive"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>我的</span>
            <template #icon="props">
              <img :src="props.active ? tabIcon3.active : tabIcon3.inactive"/>
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
  </div>
</template>
<script>
import { getOpenidByCode, getTokenByOpenId, getUserInfo } from '@/apis/api.js'
import HomePage from './HomePage'
import Member from './Member'
import My from './My'
import initLoginCheckInfo from '@/common/js/login.js'
// import merge from 'webpack-merge'

export default {
  components: {
    HomePage, Member, My
  },
  computed: {
    isProduction () {
      return process.env.NODE_ENV === 'production'
    },
    isWeixinBrowser () {
      return this.judgeWeixinBrowser()
    }
  },
  data () {
    return {
      inviteCode: '',
      active: 0,
      tabIcon1: {
        active: require('@/assets/icon/tab_home_fill.png'),
        inactive: require('@/assets/icon/tab_home.png')
      },
      tabIcon2: {
        active: require('@/assets/icon/tab_member_fill.png'),
        inactive: require('@/assets/icon/tab_member.png')
      },
      tabIcon3: {
        active: require('@/assets/icon/tab_my_fill.png'),
        inactive: require('@/assets/icon/tab_my.png')
      },
      memberInfo: {},
      showToolPicker: false
    }
  },
  created () {
    this.init()
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
    console.log('beforeCreate ', location.href.split('#')[0])
  },
  methods: {
    init () {
      if (this.isProduction) {
        initLoginCheckInfo(this.$route, 'index').then(info => {
          this.memberInfo = info
          // 分享设置
          let shareLink = 'http://api.tainuocar.com/home/index?invite=' + info['invite_code']
          this.initWxShare(window.shareUrl, shareLink)
          window.isReady = true
          // setTimeout(() => {
          //   this.$router.push({
          //     query: merge({}, {isReady: true})
          //   })
          //   console.log('new ', this.$route)
          // }, 3000)
        })
      } else {
        // this.getOpenId('001Tw2h42mubIQ0Efli42FZ8h42Tw2hI') // 调试 直接获取openId
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
        console.log(res)
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
      this.tLoading()
      getUserInfo(req).then(res => {
        this.tClear()
        if (res.code === 0) {
          this.memberInfo = {
            ...res.data
          }
          this.$store.dispatch('setUserInfo', {
            userInfo: JSON.stringify(this.memberInfo)
          })
          // this.resetRoute()
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
      height calc(100% - 50px)
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
