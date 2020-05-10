import Vue from 'vue'
import { Toast, Dialog } from 'vant'

Vue.prototype.toast = toast
Vue.prototype.toastLong = toastLong
Vue.prototype.tLoading = tLoading
Vue.prototype.tClear = tClear
Vue.prototype.tSuccess = tSuccess
Vue.prototype.tFail = tFail
Vue.prototype.dConfirm = dConfirm

export function toast (text) {
  let message = text || ' '
  Toast(message)
}

export function toastLong (text) {
  let message = text || ' '
  Toast({
    message: message,
    duration: 0,
    closeOnClick: true,
    closeOnClickOverlay: true,
    forbidClick: false,
    overlay: true,
    className: 'tosat-style'
  })
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

function dConfirm (text) {
  return new Promise((resolve, reject) => {
    let message = text || '失败'
    Dialog.confirm({
      title: '提醒',
      message: message
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}
