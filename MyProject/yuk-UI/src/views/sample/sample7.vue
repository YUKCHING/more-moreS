<template>
  <div class="panel">
    <div class="triangular">
      <div class="first">first</div>
      <div class="second">second</div>
      <div class="third">third</div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang='scss' scoped>
.panel {
  text-align: center;
  transform-style: preserve-3d;
  transform: rotateX(5deg);

  .triangular {
    display: inline-block;
    margin: 100px;
    width: 100px;
    height: 400px;
    position: relative;
    transform-style: preserve-3d;
    animation: spin 9s infinite linear;

    .first {
      background: #00ff66 ;
      transform: translateZ(28.9px);
    }
    .third {
      background: #9966ff;
      transform: rotateY(120deg) translateZ(28.9px);
      /* transform-origin: center center; */
    }
    .second {
      background: #33ffcc;
      transform: rotateY(-120deg) translateZ(28.9px);
    }
  }

  .triangular div {
    position: absolute;
    width: 100px;
    height: 400px;
    top: 0;
    left: 0;
  }
}

@keyframes spin {
  from { transform: rotateY(0) scale(1); }
  25.3% { transform: rotateY(0); }
  29.3% { transform: scale(1.1); }
  33.3% { transform: rotateY(120deg) scale(1); }
  58.6% { transform: rotateY(120deg); }
  62.6% { transform: rotateY(180deg) scale(1.1); }
  66.6% { transform: rotateY(240deg) scale(1); }
  92% { transform: rotateY(240deg); }
  96.6% { transform: scale(1.1); }
  100% { transform: rotateY(360deg) scale(1); }
}
</style>
