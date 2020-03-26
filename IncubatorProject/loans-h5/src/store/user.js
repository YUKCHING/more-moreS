// 管理用户相关状态
import { getStorageByKey, setStorageByKey } from '@/common/base/storage'

const tokenKey = 'token_key'
const openidKey = 'openid_key'
const valinfoKey = 'valinfo_key'
const recentCityKey = 'recentCity_key'
const recentBrandKey = 'recentBrand_key'

const user = {
  state: {
    token: process.env.NODE_ENV === 'production' ? getStorageByKey(tokenKey) : 'eyJpdiI6IjJZWVBoQUhickhXaTB2Zmd6aERmNWc9PSIsInZhbHVlIjoiRTJEUEZSVllDK2pud0x1ajdRSUExMDBhZWEzak5GSFJpbmY0UzNVWVFnST0iLCJtYWMiOiIyNmI5YWVkNDU4N2JmOWU5MWE4Mjg1MzZjOTU0OGY1MzNhOWRjOTg2ZWIwZGJmYmJlODI2YTNmYjJkZDFjNjk5In0=',
    // token: getStorageByKey(tokenKey),
    openid: getStorageByKey(openidKey),
    valinfo: getStorageByKey(valinfoKey),
    recentCity: getStorageByKey(recentCityKey),
    recentBrand: getStorageByKey(recentBrandKey)
  },

  mutations: {
    SET_TOKEN (state) {
      state.token = getStorageByKey(tokenKey)
    },
    SET_OPENID (state) {
      state.openid = getStorageByKey(openidKey)
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
    setOpenid ({ commit }, { openid }) {
      setStorageByKey(openidKey, openid)
      commit('SET_OPENID')
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
