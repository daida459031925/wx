//app.js
App({
  data:{
    "http":"http://",
    "address":"127.0.0.1",
    "colon":":",
    "port":"8088",
    "fandAppid":"/we/reception/fandAppid.do",
    "session": "/we/reception/session.do"
  },
  onLaunch: function () {
      //url: this.data.http + this.data.address + this.data.colon + this.data.port + this.data.fandAppid,
    // 展示本地存储能力
    //启动小程序后出发的方法
    //操作日志不应该在前段服务，需要理由后台服务器进行产生。这个log的逻辑目前只是记录了当前登陆时间
    var logs = wx.getStorageSync('logs') || []//获取指定的key的内容然后使用||[]  相当于是list增加一个数据位置
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
            url: this.data.http + this.data.address + this.data.colon + this.data.port + this.data.session,
            data: {
              js_code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success:function (datas){
              console.log(datas);
             // console.log(datas.data.openid+"获取到的openid，这个openid应该是第三方服务器生产出来的，但是目前研究的是微信端，所以直接写在了微信小程序里  ");
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
  onShow: function (options) {
    //这个地方显示内容就是。例如离开当前页面到指定内容上时options  会出现一个值例如出现1011.这个就会调用摄像头去扫描二维码

    // Do something when show.
    console.log("显示" + options);
    console.log(options);
  },
  onHide: function () {
    // Do something when hide.
    console.log("关闭");
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null
  }
})