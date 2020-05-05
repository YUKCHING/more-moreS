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
    valinfo: state => JSON.parse(state.user.valinfo), // 快速估值信息
    recentCity: state => state.user.recentCity, // 最近查询的城市
    recentBrand: state => state.user.recentBrand, // 最近查询的车牌
    configInfo: state => JSON.parse(state.user.configInfo), // 菜单配置信息
    violationInfo: state => JSON.parse(state.user.violationInfo), // 违章查询历史信息
    webInviteCode: state => state.user.webInviteCode, // 从web获取他人的邀请码
    nowTab: state => Number(state.user.nowTab), // 当前tab值
    carSearchInfo: state => JSON.parse(state.user.carSearchInfo)
  },
  mutitons: {},
  modules: {
    user
  }
})

export default store
