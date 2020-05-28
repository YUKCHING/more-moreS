<template>
  <div class='MyLoans'>
    <business-card
      v-for="(item, index) in listData"
      :key="index"
      :info="item"
      @select="selectCard"
    ></business-card>
  </div>
</template>
<script>
import BusinessCard from '@/components/card/BusinessCard'
import { getLoanOrderList } from '@/apis/api.js'
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
        status: ''
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
                expire_time: h + '小时' + mm + '分'
              }
            })
          }
        }
      })
    },
    selectCard (item) {
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
