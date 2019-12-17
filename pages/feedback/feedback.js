const App = getApp();
Page({
  data: {
    content: null,
    email: null
  },
  bindEmailKeyInput(event) {
    let value = event.detail.value;
    console.log(event);
    this.setData({
      email: value
    });
  },
  bindContentKeyInput(event) {
    let value = event.detail.value;
    console.log(event);
    this.setData({
      content: value
    });
  },
  bindtapSubmit(event) {
    let content = this.data.content;
    let email = this.data.email;
    //创建一条空记录
    let feedbackRecord = new Object;
    if (content && content.length > 0) {
      feedbackRecord.content = content;
    }
    if (email && email.length > 0) {
      feedbackRecord.email = email;
    }

    console.log(feedbackRecord);
    App.dbFeedback.add({ data: feedbackRecord })
      .then(res => {
        console.log("add feedback success");
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: "反馈成功",
          icon: "success",
          duration: 1000,
          complete: function () {
            wx.navigateBack();
          }
        });
      }, err => {
        console.log("add feedback err");
        console.log(err);
        wx.hideLoading();
      });
    wx.showLoading({
      title: "提交中"
    });
  }
});
