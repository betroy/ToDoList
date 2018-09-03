const App = getApp();
Page({
  data: {
    windowHeight: App.systemInfo.windowHeight,
    condition: true,
    msg: "msg",
    array: [{ message: "foo" }, { message: "bar" }],
    objectArray: [
      { id: 1, unique: "unique_1" },
      { id: 2, unique: "unique_2" },
      { id: 3, unique: "unique_3" }
    ],
    items: [
      { value: "USA", name: "美国" },
      { value: "CHN", name: "中国", checked: "true" },
      { value: "BRA", name: "巴西" },
      { value: "JPN", name: "日本" },
      { value: "JPN", name: "日本" },
      { value: "JPN", name: "日本" },
      { value: "JPN", name: "日本" },
      { value: "JPN", name: "日本" },
      { value: "ENG", name: "英国" },
      { value: "ENG", name: "英国" },
      { value: "ENG", name: "英国" },
      { value: "ENG", name: "英国" },
      { value: "ENG", name: "英国" },
      { value: "ENG", name: "英国" },
      { value: "ENG", name: "英国" },
      { value: "FRA", name: "法国" }
    ]
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
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    wx.stopPullDownRefresh();
  },
  onReachBottom() {},
  onShareAppMessage() {},
  onPageScroll() {},
  onTabItemTap(item) {},
  bindconfirm(event) {
    var value = event.detail.value;
    console.log(event.detail.value);
    this.setData({
      //清空input value
      inputValue: ""
    });
  },
  scrolltolower(event) {
    console.log("scrolltolower");
    console.log(event);
  },
  //item点击事件 跳转至任务详情
  itemBindTap(event) {
    console.log(event);
    wx.navigateTo({ url: "../tododetail/tododetail" });
  },
  checkboxChange(event) {
    console.log(event);
  },
  catchtap(event) {
    // console.log(event);
  }
});
