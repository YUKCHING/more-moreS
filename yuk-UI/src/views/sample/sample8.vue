<template>
  <div class="button">
    Click me!
  </div>
</template>
<script>
export default {

}
</script>
<style lang='scss' scoped>
.button {
  margin: auto;
  font-size: 40px;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  position: relative; /* text color, paddings, etc. */
  cursor: pointer;
}
.button:hover {
  text-decoration: underline;
  color: red;
}
.button::before {
  content: ''; /* To generate the box */
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 0;
  background: #58a;
  transform: skewX(40deg);
  border: 1px solid red;
}
</style>
