<template>
  <div class="sample4">
    <div class="wrap">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
      <div style="margin-top: 40px;">加载中...</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {}
}
</script>
<style lang='scss' scoped>
.sample4 {
  .wrap {
    padding-top: 100px;
    text-align: center;

    .circle1 {
      display: inline-block;
      background: blue;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      animation: drop1 1s infinite linear;
      transform-origin: 75px;
    }
    .circle2 {
      display: inline-block;
      background: blue;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      animation: drop1 1s infinite linear;
      transform-origin: -12px;
    }
    .circle3 {
      display: inline-block;
      background: blue;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      animation: drop2 1s infinite linear;
      transform-origin: -12px 50%;
    }
    .circle4 {
      display: inline-block;
      background: blue;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      animation: drop1 1s infinite linear;
      transform-origin: -12px 50%;
    }
  }
  .wrap > div {
    margin-right: 20px;
  }

  @keyframes drop1 {
    to {
      transform: rotate(0.5turn);
    }
  }
  @keyframes drop2 {
    to {
      transform: rotate(-0.5turn);
    }
  }
}
</style>
