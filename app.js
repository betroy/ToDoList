//app.js
App({
  systemInfo: null,
  dbTodos: null,
  dbFeedback: null,
  onLaunch(options) {
    const self = this;

    //初始化云函数
    wx.cloud.init({
      env: 'todolist-eea649',
      // env: 'todolist-test-80be87',
      traceUser: 'true'
    });

    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
      }
    });
    //初始化DB
    let db = wx.cloud.database({
      env: 'todolist-eea649'
      // env: 'todolist-test-80be87'
    });
    //获取todos
    self.dbTodos = db.collection('todos');
    //获取feedback
    self.dbFeedback = db.collection('feedback');
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