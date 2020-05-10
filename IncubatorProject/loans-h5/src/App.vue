<template>
  <div id="app">
    <div class="view-box">
      <div class="main">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  height: 100%;

  .view-box {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;

    .main {
      position: absolute;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;

      .loadNew {
        min-height: 200rpx;
      }
    }
  }
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-size: 16px;
  background-color: #ebf0f4;

  .tosat-style {
    text-align: left;
  }
}

ul,
li {
  list-style: none;
}

.clearfix::after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  overflow: hidden;
  clear: both;
}
</style>
