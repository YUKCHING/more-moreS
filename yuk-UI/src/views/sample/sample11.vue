<template>
  <div class="sample11">
    <div class="content">
      <div class="back"></div>
      {{content}}
    </div>
  </div>
</template>
<script>
import article from './component/article.js'
export default {
  data () {
    return {
      content: article.value
    }
  }
}
</script>
<style lang='scss' scoped>
.sample11 {
  height: 100%;
  overflow: auto;
  position: relative;
  font-size: 24px;

  .content {
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);

    .back {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
      background-repeat: no-repeat;
      z-index: -1;
    }
  }
}
// .sample11::after {
//     content: '';
//     position: absolute;
//     top: 150px;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     background: #fff;
//     z-index: 2;
//     // opacity: 0.2;
//   }
</style>
