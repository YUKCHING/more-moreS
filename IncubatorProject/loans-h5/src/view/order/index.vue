<template>
  <div class='index'>
    <van-tabs
      v-model="active"
      :swipe-threshold="5"
      :animated="true"
      :swipeable="true"
      @change="clickTabsAction">
      <van-tab title="全部" style="width: 100%; box-sizing: border-box">
        <order-list :list="listData" class="pane" @select="selectOrder"></order-list>
      </van-tab>
      <van-tab title="待提交">
        <order-list :list="listData" class="pane" @select="selectOrder"></order-list>
      </van-tab>
      <van-tab title="待批复">
        <order-list :list="listData" class="pane" @select="selectOrder"></order-list>
      </van-tab>
      <van-tab title="待签约">
        <order-list :list="listData" class="pane" @select="selectOrder"></order-list>
      </van-tab>
      <van-tab title="待放款">
        <order-list :list="listData" class="pane" @select="selectOrder"></order-list>
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
    selectOrder (item) {
      if (item.status === 0) {
        this.$router.push({
          path: '/orderinit',
          query: {
            isInit: '1',
            order_id: item.order_id
          }
        })
      } else if (item.status === 1) {
        this.$router.push({
          path: '/ordersubmit',
          query: {
            isInit: '1',
            order_id: item.order_id
          }
        })
      }
    },
    getList () {
      let req = {
        status: this.active === 0 ? '' : this.active
      }
      getLoanOrderList(req).then(res => {
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.listData = res.data.list.map(ele => {
              let date1 = this.moment(ele.expire_in * 1000)
              let date2 = this.moment(new Date())
              let date3 = date1.diff(date2, 'minute')// 计算相差的分钟数
              let h = Math.floor(date3 / 60)// 相差的小时数
              let mm = date3 % 60// 计算相差小时后余下的分钟
              return {
                ...ele,
                expire_time: h + '小时' + mm + '分'
              }
            })
          } else {
            this.listData = []
          }
        }
      })
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
