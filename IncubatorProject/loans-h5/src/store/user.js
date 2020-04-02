// 管理用户相关状态
import { getStorageByKey, setStorageByKey } from '@/common/base/storage'

const tokenKey = 'token_key'
const openidKey = 'openid_key'
const valinfoKey = 'valinfo_key'
const recentCityKey = 'recentCity_key'
const recentBrandKey = 'recentBrand_key'
const configInfoKey = 'configInfo_key'

const user = {
  state: {
    // token: process.env.NODE_ENV === 'production' ? getStorageByKey(tokenKey) : 'eyJpdiI6Im5vQ3FWT0txMU1FNm5CWlFreDJCeGc9PSIsInZhbHVlIjoidm44RzNWT2kydkNFS29lNm1nVVREQVFES00xNzE0N09aaUJtTG4wUUw3ST0iLCJtYWMiOiI5MmI0NGY0ZjVjOWQ1NTk4Y2YxZWM4ZGY5MmZlNjliYjYyZGExZTliYjQ2MTcwZjhhYjc4MGJjYmM0ZjE1NTM5In0=',
    token: getStorageByKey(tokenKey),
    openid: getStorageByKey(openidKey),
    valinfo: getStorageByKey(valinfoKey),
    recentCity: getStorageByKey(recentCityKey),
    recentBrand: getStorageByKey(recentBrandKey),
    configInfo: getStorageByKey(configInfoKey)
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
    },
    SET_CONFIGINFO (state) {
      state.configInfo = getStorageByKey(configInfoKey)
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
    },
    setConfigInfo ({ commit }, { configInfo }) {
      setStorageByKey(configInfoKey, configInfo)
      commit('SET_CONFIGINFO')
    }
  }
}

export default user
