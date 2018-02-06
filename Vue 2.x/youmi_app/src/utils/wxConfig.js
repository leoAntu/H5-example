import sha1 from 'js-sha1'
import Vue from 'vue'

import { Toast } from 'mint-ui'

function wxConfig() {

  const config = {
    debug: false,
    appID: 'wx6950cdbfd9a60ec8',
    jsapi_ticket: '',
    nonceStr: '',
    timestamp: '',
    url: window.location.href,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  };

  let vue = new Vue();
  vue.$http({
    method: 'get',
    url: vue.$getApi + '/api/actzm/mine/wechat/getTicket.htm',
    params: {
      url: config.url
    }
  }).then(res => {
    if (res.body.resultCode === 1000) {
      let resultData = JSON.parse(res.body.resultData);
      config.jsapi_ticket = resultData.jsapi_ticket;
      config.nonceStr = resultData.noncestr;
      config.timestamp = resultData.timestamp;

      let raw = `jsapi_ticket=${config.jsapi_ticket}&noncestr=${config.nonceStr}&timestamp=${config.timestamp}&url=${config.url}`;
      let signature = sha1(raw);

      wx.config({
        debug: config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appID, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: config.jsApiList
      });
    } else {
      // Toast('wechat getTicket API error');
    }
  }).catch(()=>{
    // Toast('wechat getTicket API error');
  });
}

export function wxShare(params = {
  title: '超快审批，超低利息，超速到账！还不快来贷？！',
  link: 'https://apps.limayq.com/wxLoginMiddlePage', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: 'http://bucket-fuyin-limayq-beijing.oss-cn-beijing.aliyuncs.com/favicon.png', // 分享图标
  desc: '富卡 - 让金融触手可及，为普惠金融贡献力量', // 分享描述
  type: 'link', // 分享类型,music、video或link，不填默认为link
  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
}) {
  wxConfig();
  wx.ready(function () {
    /**分享到朋友圈**/
    wx.onMenuShareTimeline({
      title: params.title, // 分享标题
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
    });
    /**分享给朋友**/
    wx.onMenuShareAppMessage({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      type: params.type, // 分享类型,music、video或link，不填默认为link
      dataUrl: params.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {

      },
      cancel: function () {

      }
    });
    /**分享到QQ**/
    wx.onMenuShareQQ({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
      cancel: function () {

      }
    });
    /**分享到腾讯微博**/
    wx.onMenuShareWeibo({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
      cancel: function () {

      }
    });
    /**分享到QQ空间**/
    wx.onMenuShareQZone({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
      cancel: function () {

      }
    });
  });
  wx.error(function (res) {
    console.log(res)
  });
}
