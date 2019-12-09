<template>
  <div class="panel">
    <div class="wrap">
      <div class="cube">
        <div class="front">前</div>
        <div class="back">后</div>
        <div class="top">上</div>
        <div class="bottom">下</div>
        <div class="left">左</div>
        <div class="right">右</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.panel {
  text-align: center;
  background: red;
  height: 100%;

  .wrap {
    display: inline-flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, #04befe 0%, gray 50%, #000 100%);
    background-size:100% 300%;
    animation: wave 5s infinite linear;
    text-align: center;

    .cube {
      display: inline-block;
      width: 200px;
      height: 200px;
      position: relative;
      transform-style: preserve-3d;
      animation: spin 5s infinite linear;

      div.front {
        transform: translateZ(100px);
        background: yellow;
      }
      .back {
        transform: translateZ(-100px) rotateY(180deg);
        background: red;
      }
      .right {
        transform:  rotateY(90deg) translateX(100px);
        transform-origin: 100% 0;
        background: green;
      }
      .left {
        transform: rotateY(270deg) translateX(-100px);
        transform-origin: center left;
        background: black;
      }
      .top {
        transform: rotateX(-90deg) translateY(-100px);
        transform-origin: top center;
        background: gray;
      }
      .bottom {
        transform: rotateX(90deg) translateY(100px);
        transform-origin: bottom center;
        background: blue;
      }
    }

    .cube div {
      position: absolute;
      width: 200px;
      height: 200px;
      top: 0;
      left: 0;
      opacity: 0.5;
      transition: all 1s;
      text-align: center;
      margin: auto;
      line-height: 200px;
      font-size: 40px;
    }
  }
}

@keyframes wave {
  from { background-position: 0% 0%; }
  50% { background-position: 50% 100%; }
  to { background-position: 100% 0%; }
}

@keyframes spin {
  from { transform: rotateY(0) rotateX(0); }
  to { transform: rotateY(360deg) rotateX(360deg); }
}

</style>
