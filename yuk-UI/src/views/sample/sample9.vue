<template>
  <div id="test" class='test2'>
    helloWorld
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      list: new Array(10).fill('1')
    }
  },
  mounted () {
    // let div = document.getElementById('test')
    // div.style.background = '#000'
    var div = $('#test')
    div.css('background', 'green')
    div.removeClass()
  }
}
</script>
<style lang='scss' scoped>
#test {
  height: 100%;
  background: red;
}
.test2 {
  color: white;
}
</style>
