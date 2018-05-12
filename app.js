//app.js
App({
  data:{
    "AppID": "wx04e35afa5a4c5c17",
    "AppSecret": "1a66d5df7b2d81da897e04e87deff19b"
  },
  onLaunch: function () {
    // 展示本地存储能力
    //启动小程序后出发的方法
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //进入小程序后就会启动这个。目测是从本机得到的code
        console.log(res.code+"*********************登陆这个小程序的时候就会生产一个code");
        if (res.code) {
          //发起网络请求
          //这个网络请求时发到自己的服务器中的（第三方服务器），然后由第三方服务器来获取openid
          //模拟第三方服务器已经获取到code然后进行访问来获取openid
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: getApp().data.AppID,
              secret: getApp().data.AppSecret,
              js_code: res.code,
              grant_type:"authorization_code"
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success:function (datas){
              console.log(datas);
              console.log(datas.data.openid+"获取到的openid，这个openid应该是第三方服务器生产出来的，但是目前研究的是微信端，所以直接写在了微信小程序里  ");
            },
            fail:function(){
              console.log("异常");
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("************************111111");
      },
      fail: function () {
        console.log("************************1");
        //登录态过期
        wx.login() //重新登录    ....
      }
    })
  },
  globalData: {
    userInfo: null
  }
})