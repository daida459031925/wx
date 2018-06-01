//获取应用实例
const app = getApp()

Page({
  /**
   * 初始化数据
   */
  data: {
    phone: '',
    password: '',
    nickName:"",//微信名字
    gender:"",//性别
    language:"",//语言
    city:"",//市区
    province:"",//省份
    country:"",//国家
    avatarUrl:""//头像
  },

  /**
   * 监听手机号输入
   */
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;

  },

  /**
   * 监听密码输入
   */
  listenerPasswordInput: function (e) {
    this.data.password = e.detail.value;
  },

  /**
   * 监听登录按钮
   */
  listenerLogin: function (e) {
    //打印收入账号和密码
    // console.log('手机号为: ', this.data.phone);
    // console.log('密码为: ', this.data.password);
    // console.log(e);
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
    var phone = this.data.phone;
    if (phone == '' || phone == 'undefined' || phone.length != 11 ){
        console.log("当手机号长度不等于11的时候提示");
        app.onYanZhengShiBai();
    }else{
      if (e.detail.errMsg == "getUserInfo:fail auth deny") {
        //拒绝获取并绑定的话就不进行登陆  
      } else {
        this.data.nickName = e.detail.userInfo.nickName;
        var nickName = e.detail.userInfo.nickName;
        this.data.gender = e.detail.userInfo.gender;
        var gender = e.detail.userInfo.gender;
        this.data.language = e.detail.userInfo.language;
        var language = e.detail.userInfo.language;
        this.data.city = e.detail.userInfo.city;
        var city = e.detail.userInfo.city;
        this.data.province = e.detail.userInfo.province;
        var province = e.detail.userInfo.province;
        this.data.country = e.detail.userInfo.country;
        var country = e.detail.userInfo.country;
        this.data.avatarUrl = e.detail.userInfo.avatarUrl;
        var avatarUrl = e.detail.userInfo.avatarUrl;
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            //进入小程序后就会启动这个。目测是从本机得到的code
            console.log(res.code + "*********************登陆这个小程序的时候就会生产一个code");
            if (res.code) {
              //发起网络请求
              //这个网络请求时发到自己的服务器中的（第三方服务器），然后由第三方服务器来获取openid
              //模拟第三方服务器已经获取到code然后进行访问来获取openid
              wx.request({
                url: app.data.http + app.data.address + app.data.colon + app.data.port + app.data.session,
                data: {
                  js_code: res.code,
                  nickName: nickName,
                  gender: gender,
                  language: language,
                  city: city,
                  province: province,
                  country: country,
                  avatarUrl: avatarUrl,
                  phone: phone
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (datas) {
                  console.log(datas.data);//微信规定的所有数据加载一个data
                  // console.log(datas.data.openid+"获取到的openid，这个openid应该是第三方服务器生产出来的，但是目前研究的是微信端，所以直接写在了微信小程序里  ");
                  var sudata = datas.data;
                  if (sudata.code == 200 && sudata.data != "") {
                    console.log(sudata.data);
                    wx.setStorage({ key: "phone", data: phone });
                    //中间添加其他的数据保存
                    wx.setStorage({
                      key: '3rd_session',
                      data: sudata.data,
                      success: function () {
                        wx.redirectTo({
                          url: '../index/index'
                        })
                      }
                    });//将服务器的session放入缓存中
                  }
                },
                fail: function () {
                  console.log("异常");
                }
              });
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    }
    
  },

  listenerLogin123:function(){
    wx.getStorage({
      //获取数据的key
      key: 'session',
      success: function (res) {
        console.log(res)
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    });
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady: function () {
    // 页面渲染完成
    console.log("AaAAAAAAAAAAAAAAAAAAAAAAA************");
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          //这个网络请求时发到自己的服务器中的（第三方服务器），然后由第三方服务器来获取openid
          //模拟第三方服务器已经获取到code然后进行访问来获取openid
          wx.request({
            url: app.data.http + app.data.address + app.data.colon + app.data.port + app.data.bindingWe,
            data: {
              js_code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (datas) {
              console.log(datas)
            },
            fail: function () {
              console.log("异常");
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})