import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {
    token: state => state.user.token,
    openid: state => state.user.openid,
    userInfo: state => JSON.parse(state.user.userInfo),
    wxConfig: state => JSON.parse(state.user.wxConfig),
    valinfo: state => JSON.parse(state.user.valinfo),
    recentCity: state => state.user.recentCity,
    recentBrand: state => state.user.recentBrand,
    configInfo: state => JSON.parse(state.user.configInfo),
    violationInfo: state => JSON.parse(state.user.violationInfo)
  },
  mutitons: {},
  modules: {
    user
  }
})

export default store
