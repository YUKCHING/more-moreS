<template>
  <div class="loans-list">
    <div class="top-block">
      <van-field v-model="searchKey" placeholder="请输入产品名" clearable>
        <van-icon slot="left-icon" color="#F9CFD0" name="search" />
      </van-field>
    </div>
    <div class="content">
      <loans-block v-for="item in lists"
                 :key="item.id"
                 :data="item"
                 :select="select"
                 ref="loansBlock"
                 @click="showDetail"
                 @change="loadnsBlockChange"></loans-block>
    </div>
    <van-button class="confirmButton" v-if="select" @click="confirmAction">确 定</van-button>
    <qr-overlay></qr-overlay>
    <back-home />
  </div>
</template>
<script>
import LoansBlock from './components/LoansBlock'
import QrOverlay from '@/components/QrOverlay'
import { getProductList, getCommissionByProduct } from '@/apis/api'
import initLoginCheckInfo from '@/common/js/login.js'
import commonJs from '@/common/js/public.js'
import BackHome from '@/components/BackHome'

export default {
  components: {
    LoansBlock, QrOverlay, BackHome
  },
  props: {
    select: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  watch: {
    'searchKey' () {
      this.searchAction()
    }
  },
  data () {
    return {
      lists: [],
      searchKey: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (process.env.NODE_ENV === 'production' && !process.env.ISAPPLET) {
        let title = '泰诺汽车平台-泰诺产品'
        let des = '超10款车贷产品\r\n总有一款适合您!'
        if (!window.isReady) {
          initLoginCheckInfo(this.$route).then(info => {
            if (info && info.code === -1000104) {
              this.bus.$emit('showQrOverlay')
              return
            }
            // 分享设置
            let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
            this.initWxShare(window.shareUrl, title, des, shareLink)
            window.isReady = true
            this.$store.dispatch('setIsFirstVisit', {
              isFirstVisit: info.showBack
            })

            this.getProductList()
          })
        } else {
        // 分享设置
          let shareLink = 'http://api.tainuocar.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
          this.initWxShare(window.shareUrl, title, des, shareLink)

          this.getProductList()
        }
      } else {
        this.getProductList()
      }
    },
    searchAction: commonJs._debounce(function (_type, index, item) {
      this.getProductList()
    }, 1000),
    getProductList () {
      let req = {
        token: this.$store.getters.token,
        limit: '99',
        page: '1',
        sort: ''
      }
      if (this.searchKey) {
        req['search[keyword]'] = this.searchKey
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
    },
    loadnsBlockChange (val, blockId) {
      if (val) {
        this.$refs['loansBlock'].forEach(ele => {
          if (ele.data.id !== blockId) {
            ele.isChoice = false
          }
        })
      }
    },
    confirmAction () {
      let blockId = ''
      this.$refs['loansBlock'].forEach(ele => {
        if (ele.isChoice) {
          blockId = ele.data.id
        }
      })
      if (blockId) {
        let item = {}
        item = this.lists.find(ele => ele.id === blockId)

        let req = {
          product_id: item.id
        }
        getCommissionByProduct(req).then(res => {
          if (res.code === 0) {
            if (res.data.length !== 0) {
              this.$emit('select', item)
            } else {
              this.toast('该产品未设置佣金规则，\n请选择其它产品。')
            }
          }
        })
      } else {
        this.toast('请选择产品')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.loans-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .content {
    height: calc(100vh - 48px);
    overflow: auto;
    box-sizing: border-box;
    background: #fafafa;
    padding: 15px;
  }

  .confirmButton {
    position: fixed;
    bottom: 2%;
    left: calc(50% - 89px);
    background: #EE5150;
    color: #FFFFFF;
    padding: 10px 70px;
    border-radius: 5px;
    font-size: 16px;
    height: 40px;
    line-height: 12px;
  }

  $searchBarHeight: 48px;
  .top-block /deep/ {
    background: #E02020;
    padding: 7px 8px;
    display: flex;
    align-items: center;

    .van-cell {
      padding: 0;
    }

    .van-field {
      display: inline-flex;
      flex-grow: 1;
      padding: 5px 7px 5px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, .5);
    }

    .van-cell:not(:last-child)::after {
      display: none;
    }

    input::-webkit-input-placeholder {
      color: #ffffff;
    }
  }
}
</style>
