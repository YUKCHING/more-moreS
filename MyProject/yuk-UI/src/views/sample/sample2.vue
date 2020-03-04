<template>
  <div class="sample2">
  </div>
</template>
<style lang="scss" scoped>
.sample2 {
  height: 100%;
  background: linear-gradient(0deg, #04befe 0%, red 50%, #000 100%);
  background-size:1400% 300%;
  animation: mymove 5s ease infinite;
}
@keyframes mymove
{
  0% {
  background-position: 0% 0%; }
  50% {
  background-position: 50% 100%; }
  100% {
    background-position: 100% 0%; }
}
</style>
