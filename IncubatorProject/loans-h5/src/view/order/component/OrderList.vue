<template>
  <div class='OrderList'>
    <business-card
      v-for="(item, index) in list"
      :key="index"
      :info="item"
      @select="selectCard"
    ></business-card>
  </div>
</template>
<script>
import BusinessCard from '@/components/card/BusinessCard'
export default {
  components: {
    BusinessCard
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
  },
  methods: {
    selectCard (item) {
      this.$router.push({
        path: '/orderinit',
        query: {
          id: '123'
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.OrderList
  height 100%
  width 100%
  box-sizing border-box
  padding 0 1rem 1rem
</style>
