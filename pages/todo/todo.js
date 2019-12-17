const App = getApp();
Page({
  data: {
    windowHeight: App.systemInfo.windowHeight,
    todos: [],
    offset: 0,
    needRefresh: false
  },

  setTodos(todos) {
    this.setData({
      todos
    });
  },

  loadDone() {
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  queryTodos(loadmore) {
    if (!loadmore) {
      this.setData({
        offset: 0
      });
    }
    //每次获取15条数据
    App.dbTodos.limit(15).skip(this.data.offset).get().
      then(res => {
        console.log("query todo success");
        console.log(res);
        let todos = res.data;
        let currentTodos = this.data.todos;
        if (loadmore) {
          this.setTodos([...currentTodos, ...todos]);
        } else {
          this.setTodos(todos);
        }
        this.loadDone();
      },
        err => {
          console.log("query todo err");
          console.log(err);
          this.loadDone();
          wx.showToast({
            title: "数据加载失败",
            icon: "none",
            duration: 1000
          });
        });
  },

  addTodo(title) {
    let newTodo = {
      "todo_title": title,
      "checked": false
    }
    App.dbTodos.add({
      data: newTodo
    })
      .then(res => {
        console.log("add todo success");
        console.log(res);
        newTodo._id = res._id;
        this.setTodos([...this.data.todos, newTodo]);
        console.log(this.data.todos);
      },
        err => {
          console.log("add todo err");
          console.log(err);
        });
  },

  // 根据ID查找todo
  findTodo(todoId) {
    let todos = this.data.todos;
    let findedTodo = null;

    for (var i in todos) {
      let todo = todos[i];
      if (todo._id === todoId) {
        findedTodo = todo;
        break;
      }
    }

    return findedTodo;
  },

  deleteTodo() { },

  updateTodo(checkedTodoId) {
    let todos = this.data.todos;
    let checkedTodo = this.findTodo(checkedTodoId);

    if (!checkedTodo) return;

    checkedTodo.checked = !checkedTodo.checked;
    this.setTodos(todos);
    console.log(todos);

    //对比，找出已修改状态的todo
    App.dbTodos.doc(checkedTodoId).update({
      data: {
        checked: checkedTodo.checked
      }
    }).then(res => {
      console.log(res);
      console.log("update todo success");
    }, err => {
      console.log(err);
      console.log("update todo err:");
    });
  },

  onLoad() {
    wx.showLoading({
      title: "加载中"
    });
  },
  onReady() {
    this.queryTodos(false);
  },
  onShow() {
    if (App.globalData.needRefresh) {
      this.queryTodos(false);
    }
  },
  onHide() {
    this.setData({
      needRefresh: true
    });
  },
  onUnload() { },
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    this.setData({
      offset: 0
    });
    this.queryTodos(false);
  },
  onReachBottom() { },
  onShareAppMessage() { },
  onPageScroll() { },
  onTabItemTap(item) { },
  bindconfirm(event) {
    let title = event.detail.value;
    console.log(event.detail.value);
    this.setData({
      //清空input value
      inputValue: ""
    });
    if (title) {
      this.addTodo(title);
    }
  },
  scrolltolower(event) {
    //加载更多
    console.log("scrolltolower");
    console.log(event);
    this.setData({
      offset: this.data.todos.length
    });
    this.queryTodos(true);
  },
  //item点击事件 跳转至任务详情
  itemBindTap(event) {
    console.log(event);
    let checkedTodoId = event.currentTarget.id;
    let todo = this.findTodo(checkedTodoId);
    let todoJson = JSON.stringify(todo);
    wx.navigateTo({
      url: `../tododetail/tododetail?todo=${todoJson}`
    });
  },
  checkboxChange(event) {
    // console.log(event);
  },
  catchtap(event) {
    console.log(event);
    let checkedTodoId = event.currentTarget.id;
    this.updateTodo(checkedTodoId);
  }
});