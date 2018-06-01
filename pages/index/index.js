//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../libs/amap-wx-gaodeditu.js');//如：..­/..­/libs/amap-wx.js
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "77d73c8b0f07a4087035921e79ffa0eb"//申请的高德地图key
};
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
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      //wgs84坐标系为gps坐标，gcj02为国测加密坐标
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        // console.log(res);
        that.loadCity(latitude, longitude);
      }
    })
    app.onShuJuTiJiaoShiBai();
  },
  //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
        console.log(data);
        //获得地理位置信息
        console.log(data[0].desc);//详细信息
        console.log(data[0].latitude);//纬度
        console.log(data[0].longitude);//精度
        console.log(data[0].name);//什么街道神什么的
        wx.request({
          url: '',
          success:function(){

          },
          fail:function(){
            
          }
        })
      },
      fail: function (info) { }
    });
//获得天气信息
    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          weather: data
        })
        console.log(data);
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
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
  // getUserInfo: function(e) {
  //   console.log(e)
  //   var detaildata = e.detail;
  //   if (detaildata.errMsg == "getUserInfo:ok"){
     
  //     app.globalData.userInfo = detaildata.userInfo
  //     this.setData({
  //       userInfo: e.detail.userInfo,//这个一段内容就是将数据保存到userinfo中去在对应的？？？？.wxml页面中就可以通过el表达式来获取userinfo的数据，这些数据会变成这样缓存在手机中。
  //       hasUserInfo: true
  //     })
  //   }
  // }
  mapViewTap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 28
        })
      }
    })
  },
})
