<template>
  <div class="background">
    <div class="layout">
      <div class="header">yuk-UI</div>
      <side class="side-block"></side>
      <div class="content-block">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$header-height: 50px;
.background {
  height: 100%;
  width: 100%;
  background: url(~@/assets/background/background1.jpg) no-repeat center;
  background-size: 100% 100%;
}
.layout {
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  height: 100%;
  max-width: 1280px;
  background: #cfd8dc;
  overflow: hidden;

  .header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: $header-height;
    background: #37474f;
    color: white;
    text-align: left;
    line-height: 50px;
    padding: 0 30px;
    font-size: 20px;
    font-style: italic;
  }

  .side-block {
    position: absolute;
    left: 0;
    top: $header-height;
    bottom: 0;
    width: 18%;
  }

  .content-block {
    position: absolute;
    left: 18%;
    top: $header-height;
    right: 0;
    bottom: 0;
    background: #fafafa;
    border-radius: 10px;
    margin: 20px;
    padding: 10px;
    // overflow: auto;
  }
}
</style>
<script>
import Side from './Side'
export default {
  components: {
    Side
  }
}
</script>
