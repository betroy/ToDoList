const App = getApp();
Page({
  data: {
    windowHeight: App.systemInfo.windowHeight,
    todos: [],
    checkedTodos: []
  },

  setTodos(todos) {
    let checkedTodos = todos
      .filter(todo => {
        return todo.checked;
      })
      .map(todo => {
        if (todo.checked) {
          return todo._id;
        }
      });

    this.setData({
      todos,
      checkedTodos
    });
  },

  loadDone() {
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  queryTodos() {
    //实例化TableObject对象
    let todoTableObject = new wx.BaaS.TableObject("todo");
    //实例化Query对象
    let query = new wx.BaaS.Query();
    query.compare("created_by", "=", App.globalData.id);
    todoTableObject
      .setQuery(query)
      .limit(15)
      .offset(this.data.todos.length)
      .find()
      .then(
        res => {
          console.log("query todo success");
          console.log(res);
          let todos = res.data.objects;
          let currentTodos = this.data.todos;
          if (todos && todos.length > 0) {
            this.setTodos([...currentTodos, ...todos]);
          }
          this.loadDone();
        },
        err => {
          console.log("query todo err");
          console.log(err);
          this.loadDone();
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

  deleteTodo() {},

  updateTodo(currentCheckedTodos) {
    //查找当前已选中的todo
    // let checkedTodos = this.data.todos.filter(todo => todo.checked);
    let checkedTodos = this.data.checkedTodos;
    //对比，找出已修改状态的todo
    //差集
    var differenceTodo = checkedTodos
      .filter(todo => {
        return currentCheckedTodos.indexOf(todo) == -1;
      })
      .concat(
        currentCheckedTodos.filter(todo => {
          return checkedTodos.indexOf(todo) == -1;
        })
      );
    console.log(checkedTodos);
    console.log(currentCheckedTodos);
    console.log(differenceTodo);
    this.setData({
      checkedTodos: currentCheckedTodos
    });
    let checkedTodoId = differenceTodo[0];

    let todos = this.data.todos;
    let currentCheckedTodo = null;

    for (var i in todos) {
      if (todos[i]._id === checkedTodoId) {
        currentCheckedTodo = todos[i];
        break;
      }
    }
    console.log(currentCheckedTodo);
    //实例化TableObject对象
    let todoTableObject = new wx.BaaS.TableObject("todo");
    let todoRecord = todoTableObject.getWithoutData(currentCheckedTodo._id);
    todoRecord.set("checked", !currentCheckedTodo.checked);
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
    this.queryTodos();
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    this.queryTodos();
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
    this.queryTodos();
  },
  //item点击事件 跳转至任务详情
  itemBindTap(event) {
    console.log(event);
    wx.navigateTo({ url: "../tododetail/tododetail" });
  },
  checkboxChange(event) {
    // console.log(event);
    // let currentCheckedTodos = event.detail.value;
    // this.updateTodo(currentCheckedTodos);
  },
  catchtap(event) {
    console.log(event);
  }
});
