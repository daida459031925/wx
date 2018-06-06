//app.js
App({
  data:{
    "http":"https://",
    // "address":"blog.daida.ltd",
    // "colon": "",
    // "port": "",
    "address": "127.0.0.1",
    "colon": ":",
    "port": "8088",
    "fandAppid":"/we/reception/fandAppid.do",
    "session": "/we/reception/session.do",
    "bindingWe":"/we/reception/bindingWe.do",
    "addUserCheckIn":"/we/CheckIn/addUserCheckIn.do",
    "getUserCheckInAll":"/we/CheckIn/getUserCheckInAll.do"
  },
  onLaunch: function (ress) {
    console.log("************")
    console.log(ress)
      //url: this.data.http + this.data.address + this.data.colon + this.data.port + this.data.fandAppid,
    // 展示本地存储能力
    //启动小程序后出发的方法
    //操作日志不应该在前段服务，需要理由后台服务器进行产生。这个log的逻辑目前只是记录了当前登陆时间
    var logs = wx.getStorageSync('logs') || []//获取指定的key的内容然后使用||[]  相当于是list增加一个数据位置
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息   //这个接口以后升级后不能使用
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  onShuJuTiJiaoChengGong:function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    })
  },
  onShuJuTiJiaoShiBai: function () {
    wx.showToast({
      title: '失败',  //标题  
      icon: 'loading',  //图标，支持"success"、"loading"  
      //image: '../image/img.png',  //自定义图标的本地路径，image 的优先级高于 icon  
      duration: 1000, //提示的延迟时间，单位毫秒，默认：1500  
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
      success: function () { }, //接口调用成功的回调函数  
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数
    })
  },
  onYanZhengShiBai:function(){
    wx.showToast({
      title: '验证失败',  //标题  
      icon: 'loading',  //图标，支持"success"、"loading"  
      //image: '../image/img.png',  //自定义图标的本地路径，image 的优先级高于 icon  
      duration: 1000, //提示的延迟时间，单位毫秒，默认：1500  
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
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
  },
  // checkSession:function(){
  //   wx.checkSession({
  //     success: function () {
  //       //session 未过期，并且在本生命周期一直有效
  //       console.log("************************111111");
  //       console.log(this);
  //     },
  //     fail: function () {
  //       console.log("************************1");
  //       //登录态过期
  //       wx.login() //重新登录    ....
  //     }
  //     //战时不知道如何使用哦
  //   })
  // },
  onPageNotFound(res) {
    wx.redirectTo({

    })//不存在页面的路径
  },
  SuccessfulWindow: function (title) {
    wx.showToast({
      title: title,  //标题  
      icon: 'success',  //图标，支持"success"、"loading"  
      //image: '../image/img.png',  //自定义图标的本地路径，image 的优先级高于 icon  
      duration: 1000, //提示的延迟时间，单位毫秒，默认：1500  
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
      success: function () { }, //接口调用成功的回调函数  
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数
    })
  },
  FailedCartridgeFrame: function (title) {
    wx.showToast({
      title: title,  //标题  
      icon: 'loading',  //图标，支持"success"、"loading"  
      //image: '../image/img.png',  //自定义图标的本地路径，image 的优先级高于 icon  
      duration: 1000, //提示的延迟时间，单位毫秒，默认：1500  
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
    })
  },
})