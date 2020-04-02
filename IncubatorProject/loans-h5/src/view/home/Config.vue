<template>
  <div class="config">
    <div class="panel">
      <p class="title">我的应用</p>
      <div class="content">
        <div class="item" v-for="(item, index) in showArr" :key="item.code">
          <img :src="item.icon">
          <span>{{item.name}}</span>
          <img class="edit" v-show="isEdit" src="@/assets/icon/icon-jian.png" @click="itemEditAction(false, item, index)">
        </div>
      </div>
    </div>
    <div class="panel">
      <p class="title">其他</p>
      <div class="content">
        <div class="item" v-for="(item, index) in notShowArr" :key="item.code">
          <img :src="item.icon">
          <span>{{item.name}}</span>
          <img class="edit" v-show="isEdit" src="@/assets/icon/icon-add.png" @click="itemEditAction(true, item, index)">
        </div>
      </div>
    </div>
    <div class="edit-button" @click="editAction">
      {{isEdit ? '完成' : '编辑'}}
    </div>
  </div>
</template>
<script>
import { getControlConfig } from '@/apis/api.js'
export default {
  data () {
    return {
      showArr: [],
      notShowArr: [],
      isEdit: false
    }
  },
  created () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      getControlConfig({}).then(res => {
        if (res.code === 0) {
          if (res.data.functions.length > 0) {
            let showCodeArr = []
            JSON.parse(this.$store.getters.configInfo).forEach(ele => {
              if (ele.is_show === 1) {
                showCodeArr.push(ele.code)
              }
            })
            res.data.functions.forEach(ele => {
              let isShow = showCodeArr.indexOf(ele.code) !== -1
              if (isShow) {
                this.showArr.push({
                  ...ele,
                  icon: ele.icon || require('@/assets/icon/icon-config-backup.png'),
                  is_show: 1
                })
              } else {
                this.notShowArr.push({
                  ...ele,
                  icon: ele.icon || require('@/assets/icon/icon-config-backup.png'),
                  is_show: 0
                })
              }
            })
          }
        }
      })
    },
    editAction () {
      this.isEdit = !this.isEdit
    },
    itemEditAction (isAdd, item, index) {
      item.is_show = isAdd ? 1 : 0
      if (isAdd) {
        this.showArr.push(item)
        this.notShowArr.splice(index, 1)
      } else {
        this.notShowArr.push(item)
        this.showArr.splice(index, 1)
      }

      let temArr = this.showArr.concat(this.notShowArr)
      console.log(temArr)
      this.$store.dispatch('setConfigInfo', {
        configInfo: JSON.stringify(temArr)
      }).then(() => {

      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.config
  background #FCFCFC
  height 100%
  padding 0 1.5rem
  padding-top 1rem
  position relative
  box-sizing border-box

  .edit-button
    position absolute
    box-sizing border-box
    margin 1rem 0
    bottom 0
    width calc(100% - 3rem)
    background linear-gradient(to right, #FF7952 0%, #FE3525 100%)
    text-align center
    padding 1rem 0
    color #ffffff
    border-radius 5px

  .panel
    margin-bottom 1rem

    .title
      color #000
      font-weight 600
      line-height 2.3rem

    .content
      display flex
      flex-wrap wrap

      .item
        display inline-flex
        width 23%
        background #ffffff
        flex-direction column
        justify-content center
        align-items center
        padding 1rem 0
        font-size 1.1rem
        position relative
        margin 1rem calc((100vw - 3rem) * .01) 0

        img
          height 2rem
          margin-bottom .7rem

        .edit
          height 1.4rem
          position absolute
          top -.7rem
          right -.5rem

</style>
