<template>
  <div class='BackHome' id="draw" v-if="isShow" @touchmove.prevent>
    <img src="@/assets/icon/icon-arrow-up.png">
    <p>松开返回首页</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  watch: {
    '$store.getters.isFirstVisit' () {
      this.isShow = this.$store.getters.isFirstVisit
    },
    'isShow' () {
      if (this.isShow) {
        setTimeout(() => {
          var startY = 0
          const maxMove = 500
          var draw = document.getElementById('draw')

          draw.addEventListener('touchstart', function (event) {
            event.stopPropagation()
            // console.log('%ctouchstart // clientY: ' + event.changedTouches[0].clientY, 'color:green')
            startY = event.changedTouches[0].clientY
          })
          draw.addEventListener('touchmove', function (event) {
            event.stopPropagation()
            // console.log('touchmove // clientY: ' + event.changedTouches[0].clientY)
            const y = event.changedTouches[0].clientY - startY <= maxMove ? event.changedTouches[0].clientY - startY : maxMove
            // 为了清除卡顿问题，需要清除过渡效果
            draw.style.transition = 'none'
            // 阻尼系数0.3
            draw.style.transform = 'translateY(' + 0.3 * y + 'px)'
          })
          draw.addEventListener('touchend', (event) => {
            event.stopPropagation()
            let disparity = window.screen.height - event.changedTouches[0].clientY
            // console.log('%ctouchend // clientY: ' + event.changedTouches[0].clientY, 'color:orange')
            // const y = event.changedTouches[0].clientY - startY
            // 添加过渡效果
            draw.style.transition = 'transform .6s'
            draw.style.transform = 'translateY(' + 0 + 'px)'

            if (disparity > 90) {
              this.backAction()
            }
          })
        }, 200)
      }
    }
  },
  methods: {
    backAction () {
      this.$router.push({
        path: '/index'
      }).then(() => {
        this.$store.dispatch('setIsFirstVisit', {
          isFirstVisit: false
        })
      })
    }
  },
  created () {
    this.isShow = this.$store.getters.isFirstVisit
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.BackHome
  position fixed
  text-align center
  cursor pointer
  display flex
  flex-direction column
  justify-content center
  align-items center
  width 100px
  color #000000
  bottom -17px
  left calc(50% - 50px)
  font-size 12px
</style>
