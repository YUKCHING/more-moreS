// 管理用户相关状态
import { getStorageByKey, setStorageByKey } from '@/common/base/storage'

const tokenKey = 'token_key'
const openidKey = 'openid_key'
const userInfoKey = 'userInfo_key'
const wxConfigKey = 'wxConfig_key'
const valinfoKey = 'valinfo_key'
const recentCityKey = 'recentCity_key'
const recentBrandKey = 'recentBrand_key'
const configInfoKey = 'configInfo_key'
const violationInfoKey = 'violationInfo_key'
const webInviteCodeKey = 'webInviteCode_key'
const carSearchInfoKey = 'carSearchInfo_key'

const user = {
  state: {
    // token: process.env.NODE_ENV === 'production' ? getStorageByKey(tokenKey) : 'eyJpdiI6IlVESkJyRUswUlwveDV2ak1RaldyYzdRPT0iLCJ2YWx1ZSI6Iit1M1U3K2VleGhJRXJJcm1VS3J4XC9PSWdOXC9lTUxWUzdHQTM5emRvVWQ5cz0iLCJtYWMiOiJhMjM4Y2E0N2JjMDU5N2Y4N2M4MDdhYjkwYWRkYzQxMWI3NTVlMThiNzc0ZTMxOTFhYTU5NGJlM2M3YmU0ZjYwIn0=',
    token: getStorageByKey(tokenKey),
    openid: getStorageByKey(openidKey),
    userInfo: getStorageByKey(userInfoKey),
    wxConfig: getStorageByKey(wxConfigKey),
    valinfo: getStorageByKey(valinfoKey),
    recentCity: getStorageByKey(recentCityKey),
    recentBrand: getStorageByKey(recentBrandKey),
    configInfo: getStorageByKey(configInfoKey),
    violationInfo: getStorageByKey(violationInfoKey),
    webInviteCode: getStorageByKey(webInviteCodeKey),
    nowTab: '',
    carSearchInfo: getStorageByKey(carSearchInfoKey),
    isFirstVisit: false
  },

  mutations: {
    SET_TOKEN (state) {
      state.token = getStorageByKey(tokenKey)
    },
    SET_OPENID (state) {
      state.openid = getStorageByKey(openidKey)
    },
    SET_USERINFO (state) {
      state.userInfo = getStorageByKey(userInfoKey)
    },
    SET_WXCONFIG (state) {
      state.wxConfig = getStorageByKey(wxConfigKey)
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
    },
    SET_VIOLATIONINFO (state) {
      state.violationInfo = getStorageByKey(violationInfoKey)
    },
    SET_WEBINVITECODE (state) {
      state.webInviteCode = getStorageByKey(webInviteCodeKey)
    },
    SET_NOWTAB (state, nowTab) {
      state.nowTab = nowTab
    },
    SET_CARSEARCHINFO (state, carSearchInfo) {
      state.carSearchInfo = getStorageByKey(carSearchInfoKey)
    },
    SET_ISFIRSTVISIT (state, isFirstVisit) {
      state.isFirstVisit = isFirstVisit
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
    setUserInfo ({ commit }, { userInfo }) {
      setStorageByKey(userInfoKey, userInfo)
      commit('SET_USERINFO')
    },
    setWxConfig ({ commit }, { wxConfig }) {
      setStorageByKey(wxConfigKey, wxConfig)
      commit('SET_WXCONFIG')
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
    },
    setViolationInfo ({ commit }, { violationInfo }) {
      setStorageByKey(violationInfoKey, violationInfo)
      commit('SET_VIOLATIONINFO')
    },
    setWebInviteCode ({ commit }, { webInviteCode }) {
      setStorageByKey(webInviteCodeKey, webInviteCode)
      commit('SET_WEBINVITECODE')
    },
    setNowTab ({ commit }, { nowTab }) {
      commit('SET_NOWTAB', nowTab)
    },
    setCarSearchInfo ({ commit }, { carSearchInfo }) {
      setStorageByKey(carSearchInfoKey, carSearchInfo)
      commit('SET_CARSEARCHINFO')
    },
    setIsFirstVisit ({ commit }, { isFirstVisit }) {
      commit('SET_ISFIRSTVISIT', isFirstVisit)
    }
  }
}

export default user
