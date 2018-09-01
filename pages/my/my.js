Page({
  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(
      res => {
        console.log(res);
      },
      res => {
        console.log(res);
      }
    );
  }
});
