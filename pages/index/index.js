//index.js
//获取应用实例
const app = getApp();
//根据功能来实现这个问题。。这个地方是加载谷歌地图内容
//如果是做旅游项目的话直接在app里添加这个然后封装成方法后直接调用app来获取这个
//如果是普通项目个别地方那么就直接在当前内容的js填写这个。
var amapFile = require('../../libs/amap-wx-gaodeditu.js');//如：..­/..­/libs/amap-wx.js
const util = require('../../utils/util.js');
var markersData = {
  latitude: '',//纬度
  longitude: '',//经度
  key: "77d73c8b0f07a4087035921e79ffa0eb"//申请的高德地图key
};
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewQianDao:function(e){
    console.log("************aaaaaaaaaaaaaaaaaaaaa")
    console.log(e);
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      //wgs84坐标系为gps坐标，gcj02为国测加密坐标
      success: function (res) {
        console.log(res)
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        // console.log(res);
        that.loadCity(latitude, longitude);
      }
    })
  },
  //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = that.myAmapfun();
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
      success: function (data) {
            wx.getStorage({
              key: '3rd_session',
              success: function(res) {
                console.log(res.data);
                console.log(data);
                //获得地理位置信息
                console.log(data[0].desc);//详细信息
                console.log(data[0].latitude);//纬度
                console.log(data[0].longitude);//精度
                console.log(data[0].name);//什么街道神什么的
                wx.request({
                  url: app.data.http + app.data.address + app.data.colon + app.data.port + app.data.addUserCheckIn,
                  data: {
                    desc: data[0].desc,
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                    name: data[0].name,
                    session_3rd:res.data,
                  },
                  header: { "Content-Type": "application/x-www-form-urlencoded" },
                  method: "post",
                  success: function (res_data) {
                    console.log(res_data.data.data);
                    if (res_data.data.data=="1"){
                      wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.onLoad();
                    }else{
                      wx.showToast({
                        title: '已签到',
                        icon: 'loading',
                        duration: 1000
                      })
                    }
                  },
                  fail: function () {

                  }
                })
              },
              fail: function (info) { }
            });
          }, 
          fail: function () {
            console.log("获取3rd失败");
          }
        })
        

  },
  onLoad: function () {
    //从点击签到的时候获取当前位置天气信息改成了进入这个页面时候获取当前天气信息
    var that = this;
    var myAmapFun = that.myAmapfun();
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      //wgs84坐标系为gps坐标，gcj02为国测加密坐标
      success: function (res) {
        console.log(res)
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        // console.log(res);
        //获得天气信息
        myAmapFun.getWeather({
          success: function (data) {
            that.setData({
              wea: data
            })
            console.log(data);
            //成功回调
          },
          fail: function (info) {
            //失败回调
            console.log(info)
          }
        })
      }
    })


    //页面初始化完成时候展示列表

    var onLoadThis=this;

    wx.getStorage({
      key: '3rd_session',
      success: function(res) {
        wx.request({
          url: app.data.http + app.data.address + app.data.colon + app.data.port + app.data.getUserCheckInAll,
          data: {
            session_3rd:res.data
          },
          success: function (data) {
            console.log(data.data.data)

            for (var i = 0;i<data.data.data.length;i++){
              data.data.data[i].add_time = util.formatTime(new Date(data.data.data[i].add_time));
            }
            console.log(data.data.data);
            onLoadThis.setData({
              listData: data.data.data
            })
          },
          fail: function () {
            console.log("cuowu")
          }
        })
      }
    })

    // console.log(app.globalData.userInfo+"*********************************")
    // console.log(this.data.canIUse)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }


  },

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
  myAmapfun:function(){
    return new amapFile.AMapWX({ key: markersData.key });
  },
})
