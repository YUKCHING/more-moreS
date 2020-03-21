<template>
  <div class='index'>
    <div class="panel">
      <home-page v-show="active === 0"></home-page>
      <member v-show="active === 1"></member>
      <my v-show="active === 2"></my>
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
</template>
<script>
import { getTokenByCode } from '@/apis/api.js'
import HomePage from './HomePage'
import Member from './Member'
import My from './My'
import VConsole from 'vconsole'
// eslint-disable-next-line
let vConsole = new VConsole()
export default {
  components: {
    HomePage, Member, My
  },
  computed: {
    isWeixinBrowser () {
      return this.judgeWeixinBrowser()
    }
  },
  created () {
    // this.getToken('0118LY5C0yzsil2G0B6C0O3Y5C08LY5L')
    // this.checkInfo()
  },
  mounted () {
  },
  data () {
    return {
      active: 2,
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
      }
    }
  },
  methods: {
    onChange (event) {
      // event.detail 的值为当前选中项的索引
      this.active = event
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
        this.getToken(code)
      }
    },
    getToken (code) {
      let req = {
        code: code
      }
      getTokenByCode(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
            this.$store.dispatch('setToken', {
              token: res.data
            }).then(() => {
            })
          }
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

  .panel
    height calc(100% - 50px)
    overflow auto
    -webkit-overflow-scrolling touch
</style>
