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
  onLoad() {
    // let todoTableObject = new wx.BaaS.TableObject(49981);
    // let myRecord = todoTableObject.create();
    // myRecord.set("task_title", "task_title");
    // myRecord.save();
  },
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
  },
  bindtap1(event) {
    console.log("bindtap1");
  },
  bindtap2(event) {
    console.log("bindtap2");
  },
  bindtap3(event) {
    console.log("bindtap3");
  }
});
