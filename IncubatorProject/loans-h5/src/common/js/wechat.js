import store from '@/store'
export default {
  wechatShare (info) {
    let wxConfig = store.getters.wxConfig
    window.wx.config({
      debug: false,
      appId: 'wxa90d81193e301d26', // 必填，公众号的唯一标识
      timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
      nonceStr: wxConfig.noncestr, // 必填，生成签名的随机串
      signature: wxConfig.signature, // 必填，签名，见附录1
      jsApiList: [
        'previewImage',
        'hideAllNonBaseMenuItem',
        'showMenuItems',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'chooseWXPay'
      ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
    })

    window.wx.ready(() => {
      window.wx.showOptionMenu()
      window.wx.onMenuShareTimeline({
        title: info.title, // 分享标题
        link: info.link, // 分享链接
        imgUrl: info.img // 分享图标
      })
      window.wx.onMenuShareAppMessage({
        title: info.title, // 分享标题
        desc: info.desc, // 分享描述
        link: info.link, // 分享链接
        imgUrl: info.img // 分享图标
      })
    })
  }
}
