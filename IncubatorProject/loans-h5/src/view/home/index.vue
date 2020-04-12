<template>
  <div class="index">
    <div class='content' v-if="isWeixinBrowser || !isProduction">
      <div class="panel">
        <home-page v-if="active === 0" :info="memberInfo"></home-page>
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
  </div>
</template>
<script>
import { getOpenidByCode, getTokenByOpenId, refreshToken, getUserInfo, getWxShare } from '@/apis/api.js'
import HomePage from './HomePage'
import Member from './Member'
import My from './My'
import wxShare from '@/common/js/wechat.js'
import VConsole from 'vconsole'
// eslint-disable-next-line
let vConsole = new VConsole()
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
      memberInfo: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.isProduction) {
        this.checkInfo() // 正式 判断场景
      } else {
        // this.getOpenId('011yrZhm1IKKtn0ejCgm1ERShm1yrZhA') // 调试 直接获取openId
        this.getInfo() // 调试 获取用户信息
        this.getWxShareConfig()
      }
    },
    getWxShareConfig () {
      let req = {
        apis: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ],
        url: encodeURIComponent(location.href.split('#')[0])
      }
      getWxShare(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.setWxShare(res.data)
        }
      })
    },
    setWxShare (config) {
      this.$store.dispatch('setWxConfig', {
        wxConfig: JSON.stringify({
          appId: config.appId,
          timestamp: config.timestamp,
          noncestr: config.nonceStr,
          signature: config.signature
        })
      }).then(() => {
        wxShare.wechatShare({
          title: '泰诺汽车平台', // 分享标题
          desc: '泰诺汽车平台，以诚信使命、合作共赢、专业高效、卓越创新的价值观，立志成为车贷行业中的领袖企业！', // 分享描述
          // link: 'http://api.tainuocar.com/home/', // 分享链接
          link: location.href.split('#')[0],
          imgUrl: 'https://tainuocar.oss-cn-zhangjiakou.aliyuncs.com/my-share/image/17ANSQDUykOdkrW69G.png' // 分享图标
        })
      })
    },
    refreshTokenAction () {
      refreshToken().then(res => {
        if (res.code === 0) {
          console.log(res.data.token)
        }
      })
    },
    checkInfo () {
      let query = this.$route.query
      console.log(query)
      const { isReady } = query
      if (isReady) {
        this.getInfo()
        return
      }
      const { code } = query
      const { invite } = query
      if (invite) {
        this.inviteCode = invite
      }
      if (!code) { // 没有code 判断浏览器
        if (this.isWeixinBrowser) {
          console.log('是微信浏览器')
          let indexUrl = this.getWeixinCodeUrlToIndex(this.inviteCode)
          window.location.href = indexUrl
        } else {
          console.log('不是微信浏览器')
          this.toast('请使用微信打开')
        }
      } else {
        console.log('code  ' + code)
        this.getOpenId(code)
      }
    },
    getOpenId (code) {
      console.log('getOpenIdByCode')
      let req = {
        code: code
      }
      getOpenidByCode(req).then(res => {
        console.log(res)
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
            let path = this.$route.path
            let query = this.$route.query
            if (query.hasOwnProperty('code')) {
              delete query.code
            }
            console.log('设置分享')

            this.$router.replace({
              path: path,
              query: {
                ...query,
                isReady: true
              }
            })
            this.getWxShareConfig()
            console.log(this.$route)
            this.getInfo()
          })
        }
      })
    },
    getInfo () {
      console.log('getInfo')
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
          console.log(this.memberInfo)
          this.$store.dispatch('setUserInfo', {
            userInfo: JSON.stringify(this.memberInfo)
          })
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
</style>
