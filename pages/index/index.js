//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    a: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewQianDao:function(){
    app.onShuJuTiJiaoShiBai();
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    console.log(this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    var detaildata = e.detail;
    if (detaildata.errMsg == "getUserInfo:ok"){
     
      app.globalData.userInfo = detaildata.userInfo
      this.setData({
        userInfo: e.detail.userInfo,//这个一段内容就是将数据保存到userinfo中去在对应的？？？？.wxml页面中就可以通过el表达式来获取userinfo的数据，这些数据会变成这样缓存在手机中。
        hasUserInfo: true
      })
    }
  }
})
