// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import '@/assets/reset.css'
import '@/common/js/Toast.js'
import '@/config/mintuiConfig.js'
import '@/config/vantuiConfig.js'
import '@/common/js/common.js'
import '@/common/js/login.js'
import '@/common/js/wechat.js'
import _ from 'lodash'
import QrOverlay from '@/components/QrOverlay'
// import VConsole from 'vconsole'
// // eslint-disable-next-line
// let vConsole = new VConsole()
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.use(QrOverlay)
Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
