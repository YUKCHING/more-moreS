<template>
  <div class='index'>
    <div class="header">
      <div>客户电话</div>
      <div>下单时间</div>
      <div>操作</div>
    </div>
    <div class="list">
      <div
        class="orderItem"
        v-for="(item, index) in dealList"
        :key="index">
        <div class="block">{{packagePhoneNumber(item.mobile)}}</div>
        <div class="block">{{item.createTime}}</div>
        <div class="block">
          <div class="stealButton" @click="stealDealAction(item)">抢单</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span class="label">订单总数</span>
      <span class="total">{{dealList.length}}</span>
      <van-button type="danger">开 始 接 单</van-button>
    </div>
  </div>
</template>
<script>
import { getPublicOrder, grabPublicOrder } from '@/apis/api.js'
export default {
  data () {
    return {
      orderTotal: 3,
      dealList: [
        {id: '1', phone: '13713697967', createTime: '2020-03-28'},
        {id: '2', phone: '13713697967', createTime: '2020-03-28'},
        {id: '3', phone: '13713697967', createTime: '2020-03-28'},
        {id: '4', phone: '13713697967', createTime: '2020-03-28'},
        {id: '5', phone: '13713697967', createTime: '2020-03-28'},
        {id: '6', phone: '13713697967', createTime: '2020-03-28'},
        {id: '7', phone: '13713697967', createTime: '2020-03-28'},
        {id: '8', phone: '13713697967', createTime: '2020-03-28'},
        {id: '9', phone: '13713697967', createTime: '2020-03-28'},
        {id: '10', phone: '13713697967', createTime: '2020-03-28'},
        {id: '11', phone: '13713697967', createTime: '2020-03-28'},
        {id: '12', phone: '13713697967', createTime: '2020-03-28'}
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    stealDealAction (item) {
      console.log(item)
      this.$router.push({
        path: '/sucpage',
        query: {
          style: 2
        }
      })

      let test = true
      if (test) {
        return
      }

      let req = {
        order_id: item.id
      }
      grabPublicOrder(req).then(res => {
        if (res.code === 0) {
          this.$router.push({
            path: '/sucpage',
            query: {
              style: 2
            }
          })
        } else {
          this.toast('抢单失败')
        }
      })
    },
    getList () {
      getPublicOrder({}).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.dealList = res.data.map(ele => {
              return {
                ...ele,
                createTime: ''
              }
            })
          } else {
            this.dealList = []
          }
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.index
  height 100%
  background #F2F3F5
  position relative
  box-sizing border-box
  padding-top 12px

  .header
    height 26px
    line-height 26px
    display flex
    align-content center
    text-align center
    font-size 12px
    color rgba(0, 0, 0, .85)
    background #E8E9EB
    font-weight 600

    div
      width 33%

  .list
    height calc(100% - 49px - 26px)
    overflow auto

    .orderItem
      height 40px
      line-height 40px
      font-size 12px
      color rgba(0, 0, 0, .85)
      display flex
      align-items center
      text-align center

      &:nth-child(even)
        background #F4F6F8

      &:nth-child(odd)
        background #FEFFFF

      .block
        width 33%
        box-sizing border-box
        display inline-flex
        justify-content center
        align-items center

        .stealButton
          border-radius 4px
          border 1px solid rgba(238, 81, 80, 1)
          display inline-block
          width 60%
          height 24px
          line-height 24px
          color #EE5150
          font-size 12px

  .bottom
    position absolute
    bottom 0
    width 100%
    background #ffffff
    height 49px
    box-sizing border-box
    padding 5px
    display flex
    align-items center
    font-size 14px
    color rgba(0, 0, 0, .85)

    .label
      margin-left 5px

    .total
      font-size 20px
      margin-left 18px

    .van-button
      height 100%
      background #EE5150
      margin-left auto
      width 55%
</style>
