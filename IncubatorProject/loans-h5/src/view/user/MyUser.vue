<template>
  <div class='MyUser'>
    <van-tabs v-model="active" title-active-color="#FF4242" @click="clickTabsAction" :swipeable="true" :animated="true" sticky @change="clickTabsAction">
      <van-tab title="已邀粉丝" style="height: calc(100vh - 44px)">
        <user-tab :listData="listData" :total="total" @update="getInvited" @multi="multipleAction"></user-tab>
      </van-tab>
      <van-tab title="已邀会员" style="height: calc(100vh - 44px)">
        <user-tab :listData="listData" :total="total" @update="getInvited" @multi="multipleAction"></user-tab>
      </van-tab>
      <van-tab title="高级会员" style="height: calc(100vh - 44px)">
        <user-tab :listData="listData" :total="total" @update="getInvited" @multi="multipleAction"></user-tab>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getInvitedUser } from '@/apis/api.js'
import UserTab from './component/UserTab'
export default {
  components: {
    UserTab
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
    getInvited (grade) {
      let req = {
        token: this.$store.getters.token,
        grade: this.active,
        limit: 500
      }
      this.total = 0
      this.listData = []
      getInvitedUser(req).then(res => {
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.total = res.data.total
            this.listData = res.data.list
          }
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.MyUser /deep/
  height 100%
  display flex
  flex-direction column

  .van-tab__pane
    height 100%
</style>
