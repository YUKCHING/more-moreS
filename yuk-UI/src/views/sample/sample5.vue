<template>
  <div class="wrap">
    <div class="bar" v-for="(item, index) in arr" :key="index"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arr: new Array(5).fill('')
    }
  }
}
</script>
<style lang='scss' scoped>
.wrap {
  height: 60px;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .bar {
    animation: bar 2s infinite linear;
  }
  $n: 5;
  @for $i from 0 to $n {
    .bar:nth-child(#{$i + 1}) {
      animation-delay: $i * 50ms;
    }
  }
}
.wrap div {
  width: 6px;
  height: 30px;
  background: orange;
  display: inline-block;
  margin-right: 6px;
}
@keyframes bar {
  from {
    height: 30px;
  }
  10% {
    height: 70px;
  }
  20% {
    height: 30px;
  }
}
</style>
