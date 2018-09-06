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
    //实例化TableObject对象
    let todoTableObject = new wx.BaaS.TableObject("todo");
    //实例化Query对象
    let query = new wx.BaaS.Query();
    query.compare("created_by", "=", App.globalData.id);
    todoTableObject
      .setQuery(query)
      .limit(15)
      .offset(this.data.offset)
      .find()
      .then(
        res => {
          console.log("query todo success");
          console.log(res);
          let todos = res.data.objects;
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
        }
      );
  },

  addTodo(title) {
    //实例化TableObject对象
    let todoTableObject = new wx.BaaS.TableObject("todo");
    //创建一条空记录
    let todoRecord = todoTableObject.create();
    todoRecord.set("todo_title", title);
    todoRecord.set("checked", false);
    todoRecord.save().then(
      res => {
        console.log("add todo success");
        console.log(res);
        this.setTodos([...this.data.todos, res.data]);
      },
      err => {
        console.log("add todo err");
        console.log(err);
      }
    );
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

  deleteTodo() {},

  updateTodo(checkedTodoId) {
    let todos = this.data.todos;
    let checkedTodo = this.findTodo(checkedTodoId);

    if (!checkedTodo) return;

    checkedTodo.checked = !checkedTodo.checked;
    this.setTodos(todos);
    console.log(todos);

    //对比，找出已修改状态的todo
    //实例化TableObject对象
    let todoTableObject = new wx.BaaS.TableObject("todo");
    let todoRecord = todoTableObject.getWithoutData(checkedTodo._id);
    todoRecord.set("checked", checkedTodo.checked);
    todoRecord.update().then(
      res => {
        console.log("update todo success");
      },
      err => {
        console.log("update todo err");
      }
    );
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
  onUnload() {},
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    this.setData({
      offset: 0
    });
    this.queryTodos(false);
  },
  onReachBottom() {},
  onShareAppMessage() {},
  onPageScroll() {},
  onTabItemTap(item) {},
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
    wx.navigateTo({ url: `../tododetail/tododetail?todo=${todoJson}` });
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
