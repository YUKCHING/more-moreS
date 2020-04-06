<template>
  <div class='MutipleFans'>
    <div class="content">
      <user-card2 v-for="item in listData" :key="item.id" :info="item" @change="cardChangeAction" ref="usercard"></user-card2>
    </div>
    <div class="buttom">
      <van-checkbox v-model="allSelect" @change="allSelectAction">全选</van-checkbox>
      <div class="button" @click="dingAction">一键Ding（{{selectArr.length}}）</div>
    </div>
  </div>
</template>
<script>
import { getInvitedUser, sendUserNotice } from '@/apis/api.js'
import UserCard2 from '@/components/card/UserCard2'
export default {
  components: {
    UserCard2
  },
  data () {
    return {
      active: this.$route.query.active,
      listData: [],
      selectArr: [],
      allSelect: false
    }
  },
  created () {
    this.getInvited()
  },
  methods: {
    cardChangeAction (isSelect, item) {
      if (isSelect) {
        this.selectArr.push(item)
      } else {
        let index = this.selectArr.findIndex(ele => ele.id === item.id)
        this.selectArr.splice(index, 1)
      }
    },
    allSelectAction (checked) {
      if (checked) {
        this.selectArr = this.listData
        this.$refs['usercard'].forEach(ele => {
          ele.checked = true
        })
      } else {
        this.selectArr = []
        this.$refs['usercard'].forEach(ele => {
          ele.checked = false
        })
      }
    },
    getInvited (grade) {
      let req = {
        token: this.$store.getters.token,
        grade: this.active
      }
      this.listData = []
      getInvitedUser(req).then(res => {
        if (res.code === 0) {
          if (res.data.list.length > 0) {
            this.listData = res.data.list.filter(ele => {
              return !ele.dinged
            })
            // this.listData = res.data.list
          }
        }
      })
    },
    dingAction () {
      if (this.selectArr.length === 0) {
        this.toast('请选择要ding的对象')
        return
      }
      let req = {
        id: this.selectArr.map(ele => {
          return ele.id
        })
      }
      sendUserNotice(req).then(res => {
        if (res.code === 0) {
          this.tSuccess('提醒成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.MutipleFans
  height 100%
  display flex
  flex-direction column

  .content
    flex-grow 1
    overflow auto

  .buttom
    display flex
    justify-content space-between
    box-sizing border-box
    align-items center
    padding 5px 20px
    font-size 1rem

    .button
      color #ffffff
      background #FE3525
      padding 5px 20px 5px 25px
      display inline-block
      border-radius 15.5px
</style>
