<template>
  <div class='MyUser'>
    <van-tabs v-model="active" title-active-color="#FF4242" @click="clickTabsAction">
      <van-tab title="已邀粉丝"></van-tab>
      <van-tab title="已邀会员"></van-tab>
      <van-tab title="高级会员"></van-tab>
    </van-tabs>
    <div class="panel">
      <div class="list-content" v-show="listData.length > 0">
        <p class="top">
          <span>共{{total}}个粉丝</span>
          <span @click="multipleAction">多选</span>
        </p>
        <div class="list">
          <user-card
            v-for="item in listData"
            :key="item.id"
            :info="item"
            @ding="dingAction"
          ></user-card>
        </div>
      </div>
      <div class="no-data" v-show="listData.length === 0">
        <img src="@/assets/imgs/img-nodata.png">
        <p class="p1">邀请好友加入</p>
        <p class="p2">粉丝越多升级越快,还有收益哦</p>
        <div class="button" @click="inviteAction">立即邀请</div>
      </div>
    </div>

  </div>
</template>
<script>
import { getInvitedUser, sendUserNotice } from '@/apis/api.js'
import UserCard from '@/components/card/UserCard'
export default {
  components: {
    UserCard
  },
  data () {
    return {
      active: 0,
      listData: [],
      total: 0
    }
  },
  created () {
    this.getInvited()
  },
  methods: {
    clickTabsAction (name, title) {
      this.getInvited()
    },
    multipleAction () {
      this.$router.push({
        path: '/mutiplefans',
        query: {
          active: this.active
        }
      })
    },
    inviteAction () {
      this.$router.push('/invitefans')
    },
    getInvited (grade) {
      let req = {
        token: this.$store.getters.token,
        grade: this.active
      }
      this.total = 0
      this.listData = []
      getInvitedUser(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.total = res.data.total
            this.listData = res.data.list
          }
        }
      })
    },
    dingAction (item) {
      if (item.dinged) {
        this.toast('该用户今天已ding过')
        return
      }
      console.log(item)
      let req = {
        id: [item.id]
      }
      sendUserNotice(req).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tSuccess('提醒成功')
          this.getInvited()
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.MyUser
  height 100%
  display flex
  flex-direction column

  .panel
    flex-grow: 1;
    width: 100%;

    .list-content
      height 100%
      width 100%
      box-sizing border-box
      display inline-flex
      flex-direction column

      .top
        display flex
        justify-content space-between
        align-items center
        box-sizing border-box
        padding 10px 20px
        font-size 1.1rem

        span:nth-child(1)
          font-weight 600

      .list
        flex-grow 1
        overflow auto

    .no-data
      height 100%
      width 100%
      display flex
      flex-direction column
      align-items center
      text-align center

      img
        width 40%
        margin-top 3rem

      .p1
        font-size 1.33rem
        color rgba(0, 0, 0, .89)
        margin 1rem 0

      .p2
        font-size 1.17rem
        color rgba(0, 0, 0, .58)
        margin-bottom 5rem

      .button
        font-size 1.33rem
        color #ffffff
        background background linear-gradient(to right, #FF7952 0%, #FE3525 100%)
        border-radius 5px
        padding 1rem 5rem
        letter-spacing 3px
</style>
