<template>
  <div class="spinner"></div>
</template>
<script>
export default {

}
</script>
<style lang='scss' scoped>
.spinner {
  width: 60px;
  height: 60px;
  margin: 100px auto;
  background: #67CF22;
  animation: rotateplane 1.2s infinite linear;
}
@keyframes rotateplane {
  0% { transform: perspective(120px) }
  50% { transform: perspective(120px) rotateY(180deg) }
  100% { transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}
@keyframes spinner {
  from { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  to { transform: rotateY(180deg) rotateX(180deg); }
  /* to { transform: rotateY(180deg) rotateX(180deg); } */
}
</style>
