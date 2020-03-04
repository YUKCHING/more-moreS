export default {

  _debounce (fn, delay) {
    var wait = delay || 200

    var timer

    return function () {
      var th = this

      var args = arguments

      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(function () {
        timer = null

        fn.apply(th, args)
      }, wait)
    }
  }
}
