// 管理用户相关状态
import { getStorageByKey, setStorageByKey } from '@/common/base/storage'

const tokenKey = 'token_key'
const valinfoKey = 'valinfo_key'
const recentCityKey = 'recentCity_key'
const recentBrandKey = 'recentBrand_key'

const user = {
  state: {
    token: process.env.NODE_ENV === 'production' ? getStorageByKey(tokenKey) : 'eyJpdiI6ImliVTljVGczSWJscndOT1RkQnFDdVE9PSIsInZhbHVlIjoiaU12MmZ4WkNqdzVsVHlYak1JamVPXC9sKzVVY25YeGtua0dkUzJUWVwveVNFPSIsIm1hYyI6IjZlOWVhMWI4Njg2YzU0MjE1NmVlZjMxYTRhNjJjNzhkMDQzMWIyNDBjZDA0ZjM3MjFkNmYyNDdmZGQwYzA4NjAifQ==',
    valinfo: getStorageByKey(valinfoKey),
    recentCity: getStorageByKey(recentCityKey),
    recentBrand: getStorageByKey(recentBrandKey)
  },

  mutations: {
    SET_TOKEN (state) {
      state.token = getStorageByKey(tokenKey)
    },
    SET_VALINFO (state) {
      state.valinfo = getStorageByKey(valinfoKey)
    },
    SET_RECENTCITY (state) {
      state.recentCity = getStorageByKey(recentCityKey)
    },
    SET_RECENTBRAND (state) {
      state.recentBrand = getStorageByKey(recentBrandKey)
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
    },
    setRecentCity ({ commit }, { recentCity }) {
      setStorageByKey(recentCityKey, recentCity)
      commit('SET_RECENTCITY')
    },
    setRecentBrand ({ commit }, { recentBrand }) {
      setStorageByKey(recentBrandKey, recentBrand)
      commit('SET_RECENTBRAND')
    }
  }
}

export default user
