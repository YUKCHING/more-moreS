<template>
  <div class='UserCard'>
    <van-checkbox v-model="checked" style="margin-right: 10px" @click="selectChange"></van-checkbox>
    <img class="avatar" :src="info.avatar">
    <div class="label">
      <p class="p1">
        <span>{{info.nickname}}</span>
        <span
          class="tag"
          :style="{
            color: info.has_evaluated ? '#B49F4A' : '#7F98B2',
            background: info.has_evaluated ? '#FAF3E8' : '#EEF4FF'
          }"
        >{{info.has_evaluated ? '额度已评估' : '额度未评估'}}</span>
      </p>
      <p class="p2">
        注册时间：{{info.created_at}}
      </p>
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
      checked: false
    }
  },
  methods: {
    selectChange (checked) {
      this.$emit('change', checked, this.info)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.UserCard
  width 100%
  display inline-flex
  align-items center
  padding 10px 12px
  box-sizing border-box
  font-size 1.2rem

  .avatar
    width 3rem
    height 3rem
    border-radius 50%

  .label
    flex-grow 1
    box-sizing border-box
    margin 0 5px 0 10px

    .p1
      margin-bottom .2rem

      .tag
        font-size .6rem
        padding 1px 9px
        border-radius 9px
        margin-left 5px

    .p2
      color #868686

  .ding
    border-radius 5px
    padding 5px 10px
    margin-left auto
</style>
