
<template>
  <div class="sample9">
    <div class="wrap">
      <div class="pointer"></div>
      <div ref="pieceWrap" class="piece-wrap">
        <div class="piece" v-for="(item, index) in prizes" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div style="z-index: 100">
      <b-button variant="success" @click="payAction" style="width: 150px; margin-right: 50px;" :disabled="isRotating || canDraw">投币</b-button>
      <b-button
        variant="outline-primary"
        @click="drawAction"
        style="width: 150px;"
        :disabled="!(!isRotating && canDraw)"
      >开始</b-button>
    </div>
    <div style="text-align: center; margin-top: 50px;">
      <span style="margin-right: 50px;">投币：{{pay}}元</span>
      <span>奖池：{{earn}}元</span>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      prizes: [
        {
          name: '1元',
          value: 1
        },
        {
          name: '3元',
          value: 3
        },
        {
          name: '謝謝',
          value: 0
        },
        {
          name: '5角',
          value: 0.5
        },
        {
          name: '再來',
          value: -1
        },
        {
          name: '10元',
          value: 10
        },
        {
          name: '5角',
          value: 0.5
        },
        {
          name: '謝謝',
          value: 0
        },
        {
          name: '5角',
          value: 0.5
        },
        {
          name: '再來',
          value: -1
        },
        {
          name: '1元',
          value: 1
        },
        {
          name: '謝謝',
          value: 0
        }
      ],
      radis: 30,
      totalRadis: 0,
      isRotating: false,
      stepRotate: 0,
      canDraw: false,
      pay: 0,
      earn: 0
    }
  },
  methods: {
    payAction () {
      this.pay += 2
      this.canDraw = true
    },
    drawAction () {
      this.canDraw = false

      let ranBlock = parseInt(Math.random() * 12, 10)
      let ranAngel = parseInt(Math.random() * 30, 10)
      let rotate = 30 * ranBlock + ranAngel

      this.stepRotate = this.stepRotate + rotate
      let num = Math.ceil(this.stepRotate / 30.0) % 12

      let prize = this.prizes[num - 1 < 0 ? 11 : num - 1]
      console.log(rotate)
      console.log(num)
      console.log(prize.name)
      console.log(prize.value)
      if (prize.value >= 0) {
        this.earn = this.earn + prize.value
      } else {
        this.canDraw = true
      }

      this.totalRadis = this.totalRadis + 360 * 3 + rotate

      this.$refs.pieceWrap.style.setProperty('transform', 'rotate(' + this.totalRadis + 'deg)')
      this.isRotating = true
      setTimeout(() => {
        this.isRotating = false
      }, 4000)
    }
  }
}
</script>
<style lang='scss' scoped>
.sample9 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wrap {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 300px;
    margin: 100px 0 50px 300px;

    .pointer {
      z-index: 99;
      position: absolute;
      left: -10px;
      top: -25px;
      border-top: 40px solid rgb(63, 47, 47);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }

    .piece-wrap {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      transform-origin: left center;
      transition: transform 4s cubic-bezier(0, .47, .31, 1.03);

      $n: 12;
      .piece {
        position: absolute;
        left: 0;
        top: 0;
        width: 150px;
        height: 300px;
        border-radius: 0 150px 150px 0;
        transform-origin: left center;

        span {
          margin-left: 16px;
          margin-top: 20px;
          display: inline-block;
          color: #fff;
          transform: rotate(20deg);
        }

        &:nth-child(2n) {
          background-image: linear-gradient(120deg, #f6d365, #f6d365 75px, transparent 75px);
        }
        &:nth-child(2n+1) {
          background-image: linear-gradient(120deg, #ff5858, #ff5858 75px, transparent 75px);
        }
      }

      @for $i from 1 to $n {
        .piece:nth-child(#{$i}) {
          transform: rotate(-30deg * $i)
        }
      }
    }
  }
}

</style>
