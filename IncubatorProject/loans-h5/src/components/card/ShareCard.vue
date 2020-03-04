<template>
  <div class="share-card">
    <span class="span1">{{value}}</span>
    <span class="span2">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      require: true,
      type: String,
      default: ''
    },
    value: {
      require: true,
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.share-card {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'PingFangSC-Medium';
  padding: 13px 0 14px;

  .span1 {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    margin-bottom: 6px;
  }

  .span2 {
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
  }
}
</style>
