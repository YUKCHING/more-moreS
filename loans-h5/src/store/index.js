import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {
    token: state => state.user.token
  },
  mutitons: {},
  modules: {
    user
  }
})

export default store
