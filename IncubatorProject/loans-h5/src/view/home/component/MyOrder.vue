<template>
  <div class='MyOrder'>
    <van-tabs v-model="active" title-active-color="#FF4242" @click="clickTabsAction">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
    <div class="content" v-show="listData.length > 0">
      <order-card
        v-for="item in listData"
        :key="item.order_id"
        :info="item"
        @pay="cardPayAction"
      ></order-card>
    </div>
    <div class="nodata" v-show="listData.length === 0">
      <img src="@/assets/imgs/img-assets-nodata.png">
      <p>暂无内容</p>
    </div>
  </div>
</template>
<script>
import { getOrderList } from '@/apis/api.js'
import OrderCard from '@/components/card/OrderCard'
export default {
  components: {
    OrderCard
  },
  data () {
    return {
      active: Number(this.$route.query.active),
      listData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    clickTabsAction (name, title) {
      this.getList()
    },
    getList () {
      let req = {}
      switch (this.active) {
        case 1:
          req.status = 0
          break
        case 2:
          req.status = 1
          break
        case 3:
          req.status = 7
          break
        case 4:
          req.status = 8
          break

        default:
          break
      }
      getOrderList(req).then(res => {
        if (res.code === 0) {
          this.listData = res.data
          console.log(this.listData)
        }
      })
    },
    cardPayAction (item) {
      this.$router.push({
        path: '/orderdetail',
        query: {
          id: item.order_id
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.MyOrder /deep/
  width 100%
  height 100%
  display flex
  flex-direction column

  .van-tab
    padding 0
    flex-basis 10%
    font-size 1rem

  .content
    flex-grow 1
    background #FAFAFA

  .nodata
    flex-grow 1
    display flex
    flex-direction column
    align-items center
    background #FAFAFA
</style>
