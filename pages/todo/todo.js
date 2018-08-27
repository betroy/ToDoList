Page({
  data: {
    msg: "msg",
    array: [1, 2, 3, 4, 5]
  },
  onLoad() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  onPageScroll() {},
  onTabItemTap(item) {},
  viewTap() {
    this.setData({
      msg: "newMsg"
    });
  }
});
