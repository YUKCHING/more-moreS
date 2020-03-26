<template>
  <div class='My'>
    <div class="top">
      <img src="@/assets/imgs/my-bg.png" alt="">
      <div class="panel">
        <img :src="info.avatar" alt="">
        <span>{{info.username}}</span>
      </div>
    </div>
    <div class="order">
      <p class="title">
        <span>我的订单</span>
        <img src="@/assets/icon/icon-arrow-right.png">
      </p>
      <div class="content">
        <div
          class="item"
          v-for="item in orderMenu"
          :key="item.name"
          @click="orderItemSelect(item)"
        >
          <img :src="item.icon">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="server">
      <p class="title">
        <span>我的服务</span>
      </p>
      <div class="content">
        <div
          class="item"
          v-for="item in serverMenu"
          :key="item.name"
          @click="serverItemSelect(item)"
        >
          <img :src="item.icon">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      require: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      orderMenu: [
        {name: '全部', icon: require('@/assets/icon/icon-order-all.png'), active: 0},
        {name: '待付款', icon: require('@/assets/icon/icon-order-fukuan.png'), active: 1},
        {name: '待发货', icon: require('@/assets/icon/icon-order-fahuo.png'), active: 2},
        {name: '待收货', icon: require('@/assets/icon/icon-order-shouhuo.png'), active: 3},
        {name: '已完成', icon: require('@/assets/icon/icon-order-finish.png'), active: 4}
      ],
      serverMenu: [
        {name: '我的拼团', icon: require('@/assets/icon/icon-server-wdpt.png'), active: 0},
        {name: '我的订单', icon: require('@/assets/icon/icon-server-wddd.png'), active: 1},
        {name: '我的消息', icon: require('@/assets/icon/icon-server-wdxx.png'), active: 2},
        {name: '意见反馈', icon: require('@/assets/icon/icon-server-yjfk.png'), active: 3},
        {name: '关于泰诺', icon: require('@/assets/icon/icon-server-gytn.png'), active: 4},
        {name: '收货地址', icon: require('@/assets/icon/icon-server-shdz.png'), active: 5},
        {name: '我的优惠券', icon: require('@/assets/icon/icon-server-wdyhq.png'), active: 6},
        {name: '推广码', icon: require('@/assets/icon/icon-server-tgm.png'), active: 7}
      ]
    }
  },
  created () {
  },
  methods: {
    orderItemSelect (item) {
      console.log(item)
    },
    serverItemSelect (item) {
      console.log(item)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.My
  height 100%
  background #FAFAFA

  .top
    position relative

    img
      width 100%

    .panel
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      display flex
      flex-direction column
      justify-content center
      align-items center

      imgWidth = 5rem
      img
        width imgWidth
        height imgWidth
        border-radius 50%

      span
        color #ffffff
        font-size 1.33rem
        margin-top .5rem

  .order
    background #FFFFFF
    border-radius .5rem
    padding 2rem 0
    margin 0 2rem

    .title
      font-size 1.33rem
      font-weight 600
      color #000000
      padding 0 1rem
      display flex
      align-items center
      letter-spacing 1px

      img
        width 1.2rem
        margin-left auto

    .content
      display flex
      flex-wrap nowrap
      align-items center
      justify-content space-around
      margin-top 1.5rem

      .item
        display inline-flex
        flex-direction column
        align-items center
        justify-content center

        img
          width 1.75rem
          margin-bottom 1rem

        span
          color #000000
          font-size 1rem

  .server
    background #FFFFFF
    border-radius .5rem
    padding 2rem 0 0
    margin 1rem 2rem

    .title
      font-size 1.33rem
      font-weight 600
      color #000000
      padding 0 1rem
      display flex
      align-items center
      letter-spacing 1px

    .content
      display flex
      align-items center
      flex-wrap wrap
      margin-top 1.5rem

      .item
        width 25%
        display inline-flex
        flex-direction column
        align-items center
        justify-content center
        margin-bottom 2rem

        img
          width 1.75rem
          margin-bottom 1rem

        span
          color #000000
          font-size 1rem

</style>
