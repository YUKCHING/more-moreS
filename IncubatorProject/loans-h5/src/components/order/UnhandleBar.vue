<template>
  <div class='UnhandleBar'>
    <div class="item" ref="unhandleItem" v-for="(item, index) in list" :key="index" @click="selectItem(index)" v-show="item > 0">
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      require: false,
      type: Number,
      default: 0
    },
    list: {
      require: true,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    'active' () {
      this.dealItemPosition()
    },
    'list' () {
      this.dealItemPosition()
    }
  },
  created () {
    this.dealItemPosition()
  },
  mounted () {
    this.dealItemPosition()
  },
  methods: {
    dealItemPosition () {
      let items = this.$refs['unhandleItem']
      if (items) {
        let leftArr = this.getItemLeft(this.active)
        items.forEach((ele, index) => {
          ele.style.left = leftArr[index]
        })
      } else {
        setTimeout(() => {
          this.dealItemPosition()
        }, 500)
      }
    },
    getItemLeft (val) {
      let result = ['16%', '32%', '47%', '63%', '79%', '95%']
      switch (val) {
        case 0:
          result = ['16%', '32%', '48%', '64%', '80%', '95.5%']
          break
        case 1:
          result = ['11%', '32%', '48%', '64%', '80%', '95.5%']
          break
        case 2:
          result = ['11%', '27%', '48%', '64%', '80%', '95.5%']
          break
        case 3:
          result = ['11%', '27%', '43%', '64%', '80%', '95.5%']
          break
        case 4:
          result = ['11%', '27%', '43%', '59%', '80%', '95.5%']
          break
        case 5:
          result = ['11%', '27%', '43%', '59%', '75%', '95.5%']
          break
      }
      return result
    },
    selectItem (val) {
      this.$emit('select', val)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.UnhandleBar
  position absolute
  top 0
  width 100%
  box-sizing border-box
  z-index 100

  .item
    position absolute
    width 19px
    height 19px
    background url("~@/assets/icon/icon-unhandled-big.png") no-repeat
    background-size 100% 100%
    text-align center
    font-size 10px
    color #ffffff
    line-height 19px
    z-index 100
    top 4px
    left 16%
</style>
