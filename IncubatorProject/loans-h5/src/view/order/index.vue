<template>
  <div class='index'>
    <van-tabs
      v-model="active"
      :swipe-threshold="5"
      :animated="true"
      :swipeable="true"
      @change="clickTabsAction">
      <van-tab title="全部" style="width: 100%; box-sizing: border-box">
        <order-list :list="listData" class="pane"></order-list>
      </van-tab>
      <van-tab title="待提交">
        <order-list :list="listData" class="pane"></order-list>
      </van-tab>
      <van-tab title="待批复">
        <order-list :list="listData" class="pane"></order-list>
      </van-tab>
      <van-tab title="待签约">
        <order-list :list="listData" class="pane"></order-list>
      </van-tab>
      <van-tab title="待放款">
        <order-list :list="listData" class="pane"></order-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import OrderList from './component/OrderList'
import { getLoanOrderList } from '@/apis/api.js'
export default {
  components: {
    OrderList
  },
  data () {
    return {
      active: 0,
      listData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    clickTabsAction () {
      this.getList()
    },
    getList () {
      let req = {
        status: this.active === 0 ? '' : this.active
      }
      getLoanOrderList(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          // if (res.data.list.length > 0) {
          //   this.listData = res.data.list
          // } else {
          //   this.listData = []
          // }
        }
      })
      this.listData = [
        { productName: '贷款产品', customer: '张三', quota: '30', mobile: '13713697967', manager: '小与', applyTime: '2020-03-25  11:19:00', status: 0 }
      ]
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.index /deep/
  height 100%

  .van-tab--active
    background #EE5150
    color #ffffff
    box-sizing border-box
    margin 8px 10px
    line-height 28px
    border-radius 5px

  .van-tabs__line
    display none

  .pane
    height calc(100vh - 94px)
    overflow auto
</style>
