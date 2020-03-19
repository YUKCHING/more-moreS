<template>
  <div class='index'>
    <div class="panel">
      <p class="title">泰诺车抵贷</p>
      <p class="des">超10款车贷产品，总有一款适合您！</p>
    </div>
  </div>
</template>
<script>
import { getControlConfig } from '@/apis/api.js'
export default {
  created () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      getControlConfig({}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.index
  background #F3F3F3
  padding 0 2rem
  height 100%

  .panel
    padding 2rem
    background #FCFCFC
    border-radius .42rem

    .title
      font-size 1.83rem
      color #FE4E36

    .des
      font-size 1.08rem

</style>
