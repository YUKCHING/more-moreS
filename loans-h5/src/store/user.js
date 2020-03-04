// 管理用户相关状态
import { getStorageByKey, setStorageByKey } from '@/common/base/storage'

const tokenKey = 'token_key'
const valinfoKey = 'valinfo_key'

const user = {
  state: {
    token: process.env.NODE_ENV === 'production' ? getStorageByKey(tokenKey) : 'eyJpdiI6Ikw4QUJWblwvbEhqVXVSOEJ1WkM1d0hRPT0iLCJ2YWx1ZSI6InNpNFZkR0lJWExGYndPbkxIQzYyQzRhWnFram9xMDdSNXlVM1cxMUpueFk9IiwibWFjIjoiY2YwMzRkNDk0Yjg5NDdhM2NjOGFkYzk5ZWY5MWE4MGU2NDFiNDg3MjVjNmM0YmMwMTNmNDYyYzU1NmZlMzUyMyJ9',
    valinfo: getStorageByKey(valinfoKey)
  },

  mutations: {
    SET_TOKEN (state) {
      state.token = getStorageByKey(tokenKey)
    },
    SET_VALINFO (state) {
      state.valinfo = getStorageByKey(valinfoKey)
    }
  },
  actions: {
    setToken ({ commit }, { token }) {
      setStorageByKey(tokenKey, token)
      commit('SET_TOKEN')
    },
    setValInfo ({ commit }, { valinfo }) {
      setStorageByKey(valinfoKey, valinfo)
      commit('SET_VALINFO')
    }
  }
}

export default user
