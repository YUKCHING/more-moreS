import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {
    token: state => state.user.token,
    openid: state => state.user.openid,
    valinfo: state => state.user.valinfo,
    recentCity: state => state.user.recentCity,
    recentBrand: state => state.user.recentBrand
  },
  mutitons: {},
  modules: {
    user
  }
})

export default store
