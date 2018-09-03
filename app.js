//app.js
App({
  systemInfo: null,
  onLaunch(options) {
    const self = this;
    wx.BaaS = requirePlugin("sdkPlugin");
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment);
    //初始化知晓云
    let clientID = "e2d25da77dc83e55a453";
    wx.BaaS.init(clientID);

    // wx.BaaS.login(true).then(
    //   res => {
    //     console.log("success");
    //     let MyUser = new wx.BaaS.User();
    //     console.log(MyUser);
    //   },
    //   res => {
    //     console.log("fail");
    //   }
    // );

    wx.checkSession({
      success: function() {
        console.log("check success");
      },
      fail: function() {
        console.log("check fail");
      }
    });

    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
      }
    });
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res);
    //   }
    // });

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting["scope.userInfo"]) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res.userInfo);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo;

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res);
    //           }
    //         }
    //       });
    //     }
    //   }
    // });
  },
  onShow(options) {
    console.log("onShow");
  },
  onHide() {
    console.log("onHide");
  },
  onError(error) {
    console.log("onError");
  },
  onPageNotFound(options) {
    console.log("onPageNotFound");
  },
  globalData: {
    userInfo: null
  }
});
