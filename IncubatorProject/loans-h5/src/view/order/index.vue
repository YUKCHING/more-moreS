<template>
  <div class='index'>
    <div class="unhandled" ref="unhandled" v-show="unhandledTotal > 0">
      {{unhandledTotal}}
    </div>
    <van-tabs
      v-model="active"
      :swipe-threshold="6"
      :animated="true"
      :swipeable="true"
      @change="clickTabsAction">
      <van-tab title="全部" style="width: 100%; box-sizing: border-box">
        <template #nav-left> <van-icon name="more-o" /></template>
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
      <van-tab title="待支出">
        <order-list :list="listData" class="pane" @select="selectOrder"></order-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import OrderList from './OrderList'
import { getLoanOrderList } from '@/apis/api.js'
export default {
  components: {
    OrderList
  },
  data () {
    return {
      active: 0,
      listData: [],
      unhandledTotal: 0,
      unhandledList: ['16%', '32%', '47%', '63%', '79%', '95%']
    }
  },
  watch: {
    'active' () {
      this.$refs['unhandled'].style.left = this.unhandledList[this.active]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    clickTabsAction () {
      this.unhandledTotal = 0
      this.getList()
    },
    selectOrder (item) {
      let isManager = item.manager_id === this.$store.getters.userInfo.id ? '1' : '0'
      if (item.status === 0) {
        this.$router.push({
          path: '/orderinit',
          query: {
            order_id: item.order_id,
            isManager: isManager
          }
        })
      } else {
        this.$router.push({
          path: '/ordersubmit',
          query: {
            order_id: item.order_id,
            isManager: isManager
          }
        })
      }
    },
    getList () {
      let status = ''
      if (this.active === 1) {
        status = 1
      } else if (this.active === 2) {
        status = 3
      } else if (this.active === 3) {
        status = 5
      } else if (this.active === 4) {
        status = 7
      } else if (this.active === 5) {
        status = 11
      }
      let req = {
        status: status,
        page: 1,
        limit: 200
      }
      this.listData = []
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
                expire_time: h + '小时' + mm + '分',
                overtime: date3 < 0
              }
            })
            this.unhandledTotal = res.data.un_handled_total
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
  position relative

  .unhandled
    position absolute
    width 19px
    height 19px
    background url("~@/assets/icon/icon-unhandled-big.png") no-repeat
    background-size 100% 100%
    text-align center
    font-size 10px
    color #ffffff
    line-height 19px
    z-index 100
    top 4px
    left 16%

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
