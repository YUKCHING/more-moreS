<template>
  <div class="sample10">
    <div class="wrap-block" v-for="(item, index) in arr" :key="index">
      <div class="front"></div>
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="back"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arr: new Array(20).fill('')
    }
  }
}
</script>
<style lang='scss' scoped>
.sample10 {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  $n: 20;
  $height: 180px;
  $halfeight: $height / 2;
  $width: 320px / $n;
  $bgStart: (100% / $n * 1.0);
  $bgWidthSize: 100% * $n;

  @for $i from 0 to $n {
    .wrap-block:nth-child(#{$i + 1}) {
      animation-delay: $i*50ms;

      .front,.back,.top,.bottom {
        background-position: ($i * $bgStart) 0%;
      }
    }
  }

  .wrap-block {
    transform-style: preserve-3d;
    position: relative;
    width: $width;
    height: $height;
    transform-origin: center;
    animation: spin 10s infinite linear;

    @keyframes spin {
      from { transform: rotateX(0); }
      22% { transform: rotateX(0deg); }
      23% { transform: rotateX(85deg); }
      25% { transform: rotateX(90deg); }

      46% { transform: rotateX(90deg); }
      48% { transform: rotateX(175deg); }
      50% { transform: rotateX(180deg); }

      71% { transform: rotateX(180deg); }
      73% { transform: rotateX(265deg); }
      75% { transform: rotateX(270deg); }

      96% { transform: rotateX(270deg); }
      98% { transform: rotateX(355deg); }
      to { transform: rotateX(360deg); }
    }

    div {
      line-height: $height;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0;
      width: $width;
      height: $height;
    }

    .front {
      background: red;
      background: url(~@/assets/image/back1.png) no-repeat;
      background-size: $bgWidthSize 100%;
      transform: translateZ($halfeight);
    }

    .top {
      background: yellow;
      background: url(~@/assets/image/back2.png) no-repeat;
      background-size: $bgWidthSize 100%;
      transform-origin: top center;
      transform: rotateX(90deg) translateY(-$halfeight);
    }
    .bottom {
      background: green;
      background: url(~@/assets/image/back3.png) no-repeat;
      background-size: $bgWidthSize 100%;
      transform-origin: bottom center;
      transform: rotateX(-90deg) translateY($halfeight);
    }
    .back {
      background: blue;
      background: url(~@/assets/image/back4.png) no-repeat;
      background-size: $bgWidthSize 100%;
      transform: translateZ(-$halfeight) rotateX(180deg);
    }
  }
}

</style>
