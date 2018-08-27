Page({
  data: {
    condition: true,
    msg: "msg",
    array: [{ message: "foo" }, { message: "bar" }],
    objectArray: [
      { id: 1, unique: "unique_1" },
      { id: 2, unique: "unique_2" },
      { id: 3, unique: "unique_3" }
    ],
    item: {
      index: 0,
      msg: "this is a template"
    }
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
  },
  switch() {
    this.setData({ objectArray: [{ id: 1, unique: "unique_1" }] });
  }
});
