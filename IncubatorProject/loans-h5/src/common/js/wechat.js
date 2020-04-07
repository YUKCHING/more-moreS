export default {
  wechatShare (configInfo, info) {
    window.wx.config({
      debug: false,
      appId: 'wxa90d81193e301d26', // 必填，公众号的唯一标识
      timestamp: configInfo.timestamp, // 必填，生成签名的时间戳
      nonceStr: configInfo.noncestr, // 必填，生成签名的随机串
      signature: configInfo.sign, // 必填，签名，见附录1
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
      const shareTitle = info.title
      const shareDesc = info.desc
      const shareLink = info.link
      const shareImg = info.img
      window.wx.showOptionMenu()
      window.wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: shareLink, // 分享链接
        imgUrl: shareImg // 分享图标
      })
      window.wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImg // 分享图标
      })
    })
  }
}
