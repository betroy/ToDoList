const App = getApp();
Page({
  data: {
    currentTodo: null,
    checked: false
  },
  onLoad(option) {
    console.log(option);
    this.setData({
      currentTodo: JSON.parse(option.todo)
    });
    console.log(this.data.currentTodo);
  },
  updateTodo(newData) {
    App.dbTodos.doc(this.data.currentTodo._id).update({
      data: newData
    }).then(res => {
      App.globalData.needRefresh = true;
      console.log("update todo success");
      console.log(res);
    }, err => {
      console.log("update todo err");
      console.log(err);
    });
  },
  deleteTodo() {
    App.dbTodos.doc(this.data.currentTodo._id).remove()
      .then(res => {
        App.globalData.needRefresh = true;
        console.log("delete success");
        console.log(res);
        wx.hideLoading();
        wx.navigateBack();
      }, err => {
        console.log("delete err");
        console.log(err);
        wx.hideLoading();
      });
  },
  catchtapRadio(event) {
    console.log(event);
    let todo = this.data.currentTodo;
    todo.checked = !todo.checked;
    this.setData({
      currentTodo: todo
    });
    this.updateTodo({ "checked": todo.checked });
  },
  bindconfirmInput(event) {
    let title = event.detail.value;
    console.log(event.detail.value);
    this.updateTodo({ "todo_title": title });
  },
  bindconfirmTextarea(event) {
    let text = event.detail.value;
    console.log(event.detail.value);
    this.updateTodo({ "remark": text });
  },
  bindtapDelete(event) {
    wx.showLoading({
      title: "加载中"
    });
    this.deleteTodo();
  }
});
