<template>
  <div class='MyLoans'>
    <business-card
      v-for="(item, index) in listData"
      :key="index"
      :info="item"
      :hiddenMask="true"
      @select="selectCard"
    ></business-card>
  </div>
</template>
<script>
import BusinessCard from '@/components/card/BusinessCard'
import { getMyOrdersList } from '@/apis/api.js'
export default {
  components: {
    BusinessCard
  },
  data () {
    return {
      listData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let req = {
        status: '',
        page_index: 1,
        page_size: 500
      }
      this.listData = []
      getMyOrdersList(req).then(res => {
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
          }
        }
      })
    },
    selectCard (item) {
      if (item.status === 0) {
        this.$router.push({
          path: '/myloansdetail1',
          query: {
            order_id: item.order_id
          }
        })
      } else {
        this.$router.push({
          path: '/myloansdetail2',
          query: {
            order_id: item.order_id
          }
        })
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.MyLoans
  height 100%
  background #EBF0F4
  overflow auto
  width 100%
  box-sizing border-box
  padding 0 1rem 1rem
</style>
