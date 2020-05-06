import Vue from 'vue'
import { Toast } from 'vant'

Vue.prototype.toast = toast
Vue.prototype.tLoading = tLoading
Vue.prototype.tClear = tClear
Vue.prototype.tSuccess = tSuccess
Vue.prototype.tFail = tFail

export function toast (text) {
  let message = text || ' '
  Toast(message)
}

export function tLoading (text) {
  let message = text || '加载中...'
  Toast.loading({
    message: message,
    forbidClick: true,
    duration: 0
  })
}

export function tClear () {
  Toast.clear()
}

function tSuccess (text) {
  return new Promise((resolve, reject) => {
    let durTime = 2000
    let message = text || '成功'
    Toast.success({
      message: message,
      duration: durTime,
      forbidClick: true
    })
    setTimeout(() => {
      resolve()
    }, durTime)
  })
}

function tFail (text) {
  let message = text || '失败'
  Toast.fail(message)
}
