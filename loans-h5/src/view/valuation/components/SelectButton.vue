<template>
  <div
    class="select-button"
    @click="selectAction"
    :style="{
      color: info.select ? '#FFFFFF' : 'rgba(0,0,0,0.25)',
      background: info.select ? '#EE5150' : 'rgba(0,0,0,0.06)'
    }"
  >
    {{info.title}}
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
  methods: {
    selectAction () {
      this.$emit('select', this.info)
    }
  }
}
</script>
<style lang='scss' scoped>
.select-button {
  font-size: 13px;
  text-align: center;
  border-radius: 14px;
  line-height: 18px;
  opacity: 0.9;
  padding: 5px 17px;
  display: inline-block;
}
</style>
