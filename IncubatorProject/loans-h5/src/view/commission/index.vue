<template>
  <div class='commission'>
    <van-button icon="add-o" class="add-button" size="small" @click="addRuleAction" v-if="grade === 4">添加产品佣金规则</van-button>
    <div v-if="listData.length> 0">
      <div v-if="grade === 4">
        <commission-card
          v-for="(item, index) in listData"
          :key="index"
          :info="item"
          :isGeneral="true"
          @del="deleteCommission"
          @edit="editCommission"
        ></commission-card>
      </div>
      <div v-else-if="grade === 3">
        <commission-card2
          v-for="(item, index) in listData"
          :key="index"
          :info="item"
          @del="deleteCommission"
          @edit="editCommission"
        ></commission-card2>
      </div>
      <div v-else-if="grade === 2">
        <commission-card3
          v-for="(item, index) in listData"
          :key="index"
          :info="item"
          @del="deleteCommission"
          @edit="editCommission"
        ></commission-card3>
      </div>
      <div v-else-if="grade === 1">
        <commission-card4
          v-for="(item, index) in listData"
          :key="index"
          :info="item"
          @del="deleteCommission"
          @edit="editCommission"
        ></commission-card4>
      </div>
    </div>
    <div v-else style="height: calc(100% - 43px)">
      <default-data></default-data>
    </div>
    <back-home />
  </div>
</template>
<script>
import CommissionCard from './component/CommissionCard'
import CommissionCard2 from './component/CommissionCard2'
import CommissionCard3 from './component/CommissionCard3'
import CommissionCard4 from './component/CommissionCard4'
import initLoginCheckInfo from '@/common/js/login.js'
import { deleteCommission, getCommissionList } from '@/apis/api'
import DefaultData from '@/components/DefaultData'
import BackHome from '@/components/BackHome'
export default {
  components: {
    CommissionCard, CommissionCard2, CommissionCard3, CommissionCard4, DefaultData, BackHome
  },
  computed: {
    isProduction () {
      return process.env.NODE_ENV === 'production'
    }
  },
  data () {
    return {
      grade: 0,
      listData: []
    }
  },
  beforeCreate () {
    window.shareUrl = location.href.split('#')[0]
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.isProduction) {
        let title = '汽车平台-佣金设置'
        let des = '一站式汽车金融服务\r\n做车贷，找77汽车！。'
        if (!window.isReady) {
          initLoginCheckInfo(this.$route).then(info => {
            if (info && info.code === -1000104) {
              this.bus.$emit('showQrOverlay')
              return
            }
            // 分享设置
            let shareLink = 'http://77car-api.shanshuijv.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
            this.initWxShare(window.shareUrl, title, des, shareLink)
            window.isReady = true
            this.$store.dispatch('setIsFirstVisit', {
              isFirstVisit: info.showBack
            })

            this.initSetting()
          })
        } else {
        // 分享设置
          let shareLink = 'http://77car-api.shanshuijv.com/home/' + this.$route.name + '?invite=' + this.$store.getters.userInfo['invite_code']
          this.initWxShare(window.shareUrl, title, des, shareLink)

          this.initSetting()
        }
      } else {
        this.initSetting()
      }
    },
    initSetting () {
      // 0粉丝 1会员 2高级会员 3一级代理 4总代理
      this.grade = Number(this.$store.getters.userInfo.grade)
      this.getList()
      if (process.env.NODE_ENV !== 'production') {
        // this.grade = 4
      }
    },
    getList () {
      getCommissionList({}).then(res => {
        if (res.code === 0) {
          if (JSON.stringify(res.data) !== '[]') {
            this.listData = res.data.list
          }
        }
      })
    },
    addRuleAction () {
      this.$router.push({
        path: '/setcommission'
      })
    },
    editCommission (info) {
      this.$router.push({
        path: '/checkcommission',
        query: {
          id: info.id,
          grade: String(this.grade)
        }
      })
    },
    deleteCommission (info) {
      let req = {
        id: info.id
      }
      deleteCommission(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('删除成功').then(() => {
            this.getList()
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.commission
  background ffffff
  height 100%
  padding 0 11px 11px
  box-sizing border-box
  overflow auto

  .add-button
    margin 13px 0 0 5px
    border 1px solid #E11B1B
    border-radius 4px
    color #E11B1B

</style>
