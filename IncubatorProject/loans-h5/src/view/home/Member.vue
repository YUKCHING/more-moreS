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
            <span id="copy" @click="copyInviteCode">复制</span>
          </p>
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
  computed: {
    gradeName () {
      let name = '非会员'
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
  methods: {
    copyInviteCode () {
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.Member
  height 100%
  background #FAFAFA

  .top
    position relative

    .img1
      width 100%

    .img2
      position absolute
      width 100%
      bottom 2.5%
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
