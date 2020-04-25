<template>
  <div class="loans-list">
    <loans-block v-for="item in lists"
                 :key="item.id"
                 :data="item"
                 @click="showDetail"></loans-block>
    <qr-overlay></qr-overlay>
  </div>
</template>
<style lang='scss' scoped>
.loans-list {
  box-sizing: border-box;
  background: #fafafa;
  padding: 15px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
<script>
import LoansBlock from './components/LoansBlock'
import QrOverlay from '@/components/QrOverlay'
import { getProductList } from '@/apis/api'
import initLoginCheckInfo from '@/common/js/login.js'

export default {
  components: {
    LoansBlock, QrOverlay
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let title = '泰诺汽车平台-泰诺产品'
      let des = '超10款车贷产品\r\n总有一款适合您!'
      if (!window.isReady) {
        initLoginCheckInfo(this.$route).then(info => {
          if (info.code === -1000104) {
            this.bus.$emit('showQrOverlay')
            return
          }
          // 分享设置
          let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
          this.initWxShare(window.shareUrl, title, des, shareLink)
          window.isReady = true
        })
      } else {
        // 分享设置
        let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
        this.initWxShare(window.shareUrl, title, des, shareLink)
      }

      this.getProductList()
    },
    getProductList () {
      let req = {
        token: this.$store.getters.token,
        limit: '99',
        page: '1',
        search: '',
        sort: ''
      }
      getProductList(req)
        .then(res => {
          if (res.code === 0 && res) {
            this.lists = res.data.list.map(ele => {
              return {
                ...ele,
                monthly_rate: ele.monthly_rate + '%'
              }
            })
          }
        })
        .catch(() => {
        })
    },
    showDetail (id) {
      this.$router.push({
        path: '/loansdetail',
        query: {
          token: this.$router.history.current.query.token,
          productid: id
        }
      })
    }
  }
}
</script>
