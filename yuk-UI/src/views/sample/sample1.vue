<template>
  <div class="test">
    <div class="loader">
      <div class="bar" v-for="(item, index) in barArr" :key="index">
        <div id="top"></div>
        <div id="bottom"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.test {
  padding: 1rem;
  position: relative;
  height: 500px;

  $bar-w: 1.25em;
  $bar-h: 5 * $bar-w;
  $half-bar-w: .5 * $bar-w;
  $half-bar-h: .5 * $bar-h;
  $n: 10;
  $loader-w: ($n + 5) * $bar-w;

  .loader {
    -webkit-box-reflect: below 0 linear-gradient(rgba(#fff, 0), rgba(#fff, .7));
    width: $loader-w;
    height: $bar-h;
    margin-left: -.5 * $loader-w;
    position: absolute;
    bottom: 50%;
    left: 50%;

    .bar {
      position: absolute;
      bottom: 50%;
      left: 50%;
      // width: $bar-w;
      // height: $bar-h;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      bottom: 0;
      animation: bar 3s cubic-bezier(.81, .04, .4, .7) infinite;

      #top {
        border-style: solid;
        border-width: 0 $half-bar-w $half-bar-h;
      }
      #bottom {
        border-style: solid;
        border-width: $half-bar-h $half-bar-w 0;
      }
    }

    @for $i from 0 to $n {
      .bar:nth-child(#{$i + 1}) {
        margin-left: ($i - .5 * $n) * $bar-w;
        animation-delay: $i*50ms;
      }
    }

    $c: #63a6c1 #1e3f57;
    @for $i from 0 to $n {
      $args: append($c, $i * 100% / ($n - 1));

      .bar:nth-child(#{$i + 1}) {
        background: mix($args...);

        #top {
          background: mix($args...);
          border-color: rgba(#fff, 0) #FFF transparent #FFF;
        }
        #bottom {
          background: mix($args...);
          border-color: transparent #FFF #FFF #FFF;
        }

      }
    }

    @keyframes bar {
      0% {
        transform: rotate(-.5turn) rotateX(-1turn);
      }
      75%, 100% {
        transform: none;
      }

    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      barArr: new Array(10).fill('')
    }
  }
}
</script>
