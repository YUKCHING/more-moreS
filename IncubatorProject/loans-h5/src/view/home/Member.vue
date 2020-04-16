<template>
  <div class='Member'>
    <div class="top">
      <img class="img1" src="@/assets/imgs/member-bg.png">
      <img class="img2" src="@/assets/imgs/member-bg2.png">
      <div class="panel">
        <img class="avatar" :src="info.avatar">
        <div class="value-block">
          <p class="p1">
            <span>{{info.username}}</span>
            <span class="grade">{{gradeName}}</span>
          </p>
          <p class="p2">
            <span>邀请码：{{info.invite_code}}</span>
            <!-- <span id="copy" @click="copyInviteCode">复制</span> -->
          </p>
        </div>
      </div>
    </div>
    <div class="property">
      <p class="title">
        <span @click="assetsAction">我的资产</span>
        <img src="@/assets/icon/icon-arrow-right.png" @click="assetsAction">
        <span class="button" @click="getMoneyAction">去提现</span>
      </p>
      <div class="content">
        <div class="item">
          <span>{{info.my_property.today || 0}}</span>
          <span>今日(元)</span>
        </div>
        <div class="item">
          <span>{{info.my_property.month || 0}}</span>
          <span>本月(元)</span>
        </div>
        <div class="item">
          <span>{{info.my_property.total || 0}}</span>
          <span>累计(元)</span>
        </div>
        <div class="item">
          <span style="color: #FFA109;">{{info.my_property.withdraw_available || 0}}</span>
          <span>可提现(元)</span>
        </div>
      </div>
    </div>
    <div class="property">
      <p class="title" @click="myUserAction">
        <span>我的用户</span>
        <img src="@/assets/icon/icon-arrow-right.png">
      </p>
      <div class="content">
        <div class="item">
          <span>{{info.my_users.fans || 0}}</span>
          <span>已邀粉丝</span>
        </div>
        <div class="item">
          <span>{{info.my_users.members || 0}}</span>
          <span>已邀会员</span>
        </div>
        <div class="item">
          <span>{{info.my_users.senior_members || 0}}</span>
          <span>高级会员</span>
        </div>
      </div>
    </div>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swipeArr" :key="item.picture_url" @click="swipeSelectAction(item)">
          <img class="item" :src="item.picture_url">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getAdPictures } from '@/apis/api.js'
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
  computed: {
    gradeName () {
      let name = '粉丝'
      switch (this.info.grade) {
        case 1:
          name = '会员'
          break
        case 2:
          name = '高级会员'
          break
        case 3:
          name = '一级代理'
          break
        case 4:
          name = '总代理'
          break

        default:
          break
      }
      return name
    }
  },
  data () {
    return {
      swipeArr: []
    }
  },
  created () {
    this.getPicture()
  },
  methods: {
    copyInviteCode () {
    },
    getMoneyAction () {
      this.$router.push({
        path: '/carwithdrawal',
        query: {
          money: this.info.my_property.withdraw_available || 0
        }
      })
    },
    myUserAction () {
      this.$router.push('/myuser')
    },
    assetsAction () {
      this.$router.push({
        path: '/myassets',
        query: {
          money: this.info.my_property.withdraw_available || 0
        }
      })
    },
    swipeSelectAction (item) {
      console.log(item)
      if (item.attribute === 1) {
        this.$router.push({
          path: '/invitefans'
        })
      }
    },
    getPicture () {
      let req = {
        token: this.$store.getters.token,
        location: 'my_user'
      }
      getAdPictures(req).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.swipeArr = res.data
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.Member
  height 100%
  background #FAFAFA

  .swipe
    height 100px
    box-sizing border-box
    margin 1rem 2rem 0

    .item
      width 100%

  .property
    background #FFFFFF
    border-radius .5rem
    padding 2rem 0
    margin 1rem 2rem 1.5rem

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
        margin-left 12px

      .button
        display inline-block
        margin-left auto
        background linear-gradient(to right, #FF7952 0%, #FE3525 100%)
        color #ffffff
        padding 4px 14px
        font-weight 300
        font-size 1rem
        border-radius 12.5px

    .content
      display flex
      align-items center
      justify-content space-around
      margin-top 1.5rem

      .item
        display inline-flex
        flex-direction column
        align-items center
        justify-content center

        span:first-child
          font-size 1.25rem

        span:nth-child(2)
          font-size 1.08rem
          color rgba(0, 0, 0, .42)
          margin-top 1rem

  .top
    position relative

    .img1
      width 100%

    .img2
      position absolute
      width 100%
      bottom 2%
      left 0
      right 0

    .panel
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      padding 0 2rem

      imgWidth = 5rem
      .avatar
        width imgWidth
        height imgWidth
        border-radius 50%

      .value-block
        display inline-flex
        flex-direction column
        width 70%
        color #ffffff
        font-size 1.4rem
        margin-left .6rem

        .p1
          font-weight 600

          .grade
            font-size 0.92rem
            font-weight 500
            padding .5rem 1rem
            margin-left 1rem
            display inline-block
            background #FF9529
            border-radius 1.16rem

        .p2
          margin-top .8rem
          font-size 1rem

          #copy
            margin-left 1.5rem

</style>
