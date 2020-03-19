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
    forbidClick: true
  })
}

export function tClear () {
  Toast.clear()
}

function tSuccess (text) {
  let message = text || '成功'
  Toast.success(message)
}

function tFail (text) {
  let message = text || '失败'
  Toast.fail(message)
}
