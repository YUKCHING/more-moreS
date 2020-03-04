<template>
  <div id="app">
    <router-view/>
    <!-- <div class="g-container">
      <div class="position" v-for="(item, index) in arr" :key="index"></div>
      <div class="g-ball"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      arr: new Array(100).fill('')
    }
  }
}
</script>

<style lang="scss">
.g-container {
  position: relative;
  width: 100vw;
  height: 100vh;

  .position {
    position: absolute;
    width: 10vw;
    height: 10vh;
    // background: blue;
  }

  @for $i from 0 through 10000 {
    $x: $i % 10;
    $y: ($i - $x) / 10;

    .position:nth-child(#{$i + 1}) {
      top: #{$y * 10}vh;
      left: #{$x * 10}vw;
    }

    .position:nth-child(#{$i + 1}):hover {
      background: rgba(255, 155, 10, .5);
    }

    .position:nth-child(#{$i + 1}):hover ~ .g-ball {
      top: #{$y * 10}vh;
      left: #{$x * 10}vw;
      border: 1px solid red;
    }
  }

  .g-ball {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10vmax;
    height: 10vmax;
    border-radius: 50%;
    // border: 1px solid red;
    // transform: translate(50%, -50%);
  }
}

html,
body {
  height: 100%;
  min-height: 100%;
  background-color: #f3f3f3;
  -webkit-text-size-adjust: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f3f3f3;
  color: #2c3e50;
}
</style>
