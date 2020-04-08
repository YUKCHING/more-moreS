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
    valinfo: state => state.user.valinfo,
    recentCity: state => state.user.recentCity,
    recentBrand: state => state.user.recentBrand,
    configInfo: state => state.user.configInfo
  },
  mutitons: {},
  modules: {
    user
  }
})

export default store
