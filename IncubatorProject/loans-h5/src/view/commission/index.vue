<template>
  <div class='commission'>
    <van-button icon="add-o" class="add-button" size="small" @click="addRuleAction" v-if="grade === 4">添加产品佣金规则</van-button>
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
</template>
<script>
import CommissionCard from './component/CommissionCard'
import CommissionCard2 from './component/CommissionCard2'
import CommissionCard3 from './component/CommissionCard3'
import CommissionCard4 from './component/CommissionCard4'
import { deleteCommission, getCommissionList } from '@/apis/api'
export default {
  components: {
    CommissionCard, CommissionCard2, CommissionCard3, CommissionCard4
  },
  data () {
    return {
      grade: 0,
      listData: []
    }
  },
  created () {
    // 0粉丝 1会员 2高级会员 3一级代理 4总代理
    // this.grade = Number(this.$store.getters.userInfo.grade)
    this.grade = 1
    this.getList()
  },
  methods: {
    getList () {
      getCommissionList({}).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data) {
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
