<template>
  <div class='MyAssets'>
    <div class="top">
      <p class="p1">账户金额(元)</p>
      <p class="p2">
        <span class="label">￥</span>
        <span class="value">{{money}}</span>
      </p>
      <div
        class="button"
        :style="{
          background: money > 0 ? 'linear-gradient(to right, #FF7952 0%, #FE3525 100%)' : 'gray'
        }"
        @click="withdrawalAction"
      >{{money > 0 ? '我要提现' : '暂无提现金额'}}</div>
    </div>
    <div class="content">
      <van-tabs v-model="active" title-active-color="#FF4242" @click="clickTabsAction">
        <van-tab title="收益明细"></van-tab>
        <van-tab title="提现明细"></van-tab>
      </van-tabs>
      <div class="list" v-show="detailList.length > 0">
        <withdrawal-card v-for="item in detailList" :key="item.date" :info="item"></withdrawal-card>
      </div>
      <div class="nodata" v-show="detailList.length === 0">
        <img src="@/assets/imgs/img-assets-nodata.png">
        <p>暂无明细</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getPropertyDetail } from '@/apis/api.js'
import WithdrawalCard from '@/components/card/WithdrawalCard'
export default {
  components: {
    WithdrawalCard
  },
  data () {
    return {
      money: Number(this.$route.query.money),
      active: 1,
      detailList: []
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    clickTabsAction (name, title) {
      this.getDetail()
    },
    withdrawalAction () {
      if (this.money === 0) {
        return
      }
      this.$router.push({
        path: '/carwithdrawal',
        query: {
          money: this.money
        }
      })
    },
    getDetail () {
      let req = {
        token: this.$store.getters.token,
        type: Number(this.active) + 1
      }
      getPropertyDetail(req).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.detailList = res.data
            console.log(this.detailList)
          } else {
            this.detailList = []
          }
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.MyAssets
  background #FFFFFF
  display flex
  flex-direction column

  .top
    text-align center
    padding-bottom 2rem

    .p1
      font-size 1.08rem
      margin-top 2rem

    .p2
      display flex
      justify-content center
      align-items flex-end
      margin 1rem 0 2rem

      .label
        font-size 1.5rem

      .value
        font-size 2rem
        font-weight 600

    .button
      box-sizing border-box
      margin 0 2rem
      color #FFFFFF
      border-radius 5px
      padding .7rem 0

  .content
    flex-grow 1
    display flex
    flex-direction column

    .list
      flex-grow 1
      overflow auto

    .nodata
      flex-grow 1
      display flex
      flex-direction column
      align-items center
</style>
