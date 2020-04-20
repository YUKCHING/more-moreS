import store from '@/store'
import { toast, tLoading } from '@/common/js/Toast.js'
import { judgeWeixinBrowser, getWeixinCodeUrlToIndex } from '@/common/js/common.js'
import { getOpenidByCode, getTokenByOpenId, getUserInfo } from '@/apis/api.js'

export default async function initLoginCheckInfo (route) {
  let query = route.query
  console.log(query)
  // const { isReady } = query

  if (window.isReady) {
    let res = await getUserInfo({
      openid: store.getters.openid,
      token: store.getters.token
    })
    if (res.code === 0) {
      let memberInfo = {
        ...res.data
      }
      store.dispatch('setUserInfo', {
        userInfo: JSON.stringify(memberInfo)
      })
      console.log(memberInfo)
      return memberInfo
    }
  }
  const { code } = query
  const { invite } = query
  console.log('you invite ', invite)

  if (!code) { // 没有code 判断浏览器
    if (judgeWeixinBrowser()) {
      console.log('是微信浏览器')
      let indexUrl = getWeixinCodeUrlToIndex(route.name, invite)
      window.location.href = indexUrl
    } else {
      console.log('不是微信浏览器')
      toast('请使用微信打开')
    }
  } else {
    // 获取openId
    let firstRes = await getOpenidByCode({
      code: code
    })
    if (firstRes.code === 0) {
      await store.dispatch('setOpenid', {
        openid: firstRes.data.openid
      })
    }

    // 获取token信息
    let secondRes = await getTokenByOpenId({
      openid: firstRes.data.openid,
      from: 'web',
      invite_code: invite
    })
    if (secondRes.code === 0) {
      await store.dispatch('setToken', {
        token: secondRes.data.token
      })
    }

    // 获取用户信息
    tLoading()
    let thirdRes = await getUserInfo({
      openid: firstRes.data.openid,
      token: secondRes.data.token
    })
    let memberInfo = {}
    if (thirdRes.code === 0) {
      memberInfo = {
        ...thirdRes.data
      }
      await store.dispatch('setUserInfo', {
        userInfo: JSON.stringify(memberInfo)
      })
    }

    return memberInfo
  }
}
