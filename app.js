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

    //同步获取id
    try {
      let localId = wx.getStorageSync("id");
      self.globalData.id = localId;
    } catch (e) {
      console.log(e);
    }

    if (!self.globalData.id) {
      wx.BaaS.login(false).then(
        res => {
          console.log("login success");
          console.log(res);
          //保存id
          wx.setStorage({
            key: "id",
            data: res.id
          });
        },
        err => {
          console.log("login fail");
          console.log(err);
        }
      );
    }

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
    userInfo: null,
    openid: null,
    id: null,
    needRefresh: false
  }
});
