<template>
  <div class="index">
    <div class='content' v-if="!isWeixinBrowser">
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
import { getOpenidByCode, getTokenByToken, refreshToken, getUserInfo } from '@/apis/api.js'
import HomePage from './HomePage'
import Member from './Member'
import My from './My'
// import VConsole from 'vconsole'
// eslint-disable-next-line
// let vConsole = new VConsole()
export default {
  components: {
    HomePage, Member, My
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    if (from.path === '/') {
      next()
    } else {
      next()
    }
  },
  computed: {
    isWeixinBrowser () {
      return this.judgeWeixinBrowser()
    }
  },
  created () {
    // this.checkInfo()
    // this.getOpenId('061Cjh2e2mlPoI0bsf2e2Lfr2e2Cjh20')
    this.getInfo()
    // this.refreshTokenAction()
  },
  data () {
    return {
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

  methods: {
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
      const { code } = query
      if (!code) { // 没有code 判断浏览器
        if (this.isWeixinBrowser) {
          console.log('是微信浏览器')
          let indexUrl = this.getWeixinCodeUrlToIndex()
          window.location.href = indexUrl
        } else {
          console.log('不是微信浏览器')
          this.toast('请使用微信打开')
        }
      } else {
        console.log('code  ' + code)
        // this.getOpenId(code)
      }
    },
    getOpenId (code) {
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
      let req = {
        openid: this.$store.getters.openid,
        from: 'web'
      }
      getTokenByToken(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$store.dispatch('setToken', {
            token: res.data.token
          }).then(() => {
            console.log('finish')
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
