Page({
  timer: null,
  flag: {
    intervalTime: 10,
    tomatoTime: 25 * 60 * 1000, //25分钟为一个番茄时间
    restTime: 5 * 60 * 1000, //休息时间
    totalTime: 0,
    currentProgress: 0,
    minutes: 0,
    seconds: 0
  },
  data: {
    isStartTomato: false, //是否开始番茄时间
    isStartRest: false, //是否开始休息时间
    tomatoTimeOver: false //是否结束了番茄时间
  },
  onReady() {
    this.flag.minutes = Math.floor((this.flag.tomatoTime / 1000 / 60) % 60);
    this.flag.seconds = Math.floor((this.flag.tomatoTime / 1000) % 60);
    this.flag.currentProgress = 0;
    this.flag.totalTime = this.flag.tomatoTime;
    this.drawProgressArc();
  },
  drawProgressArc() {
    var context = wx.createCanvasContext("tomatoCanvas");
    // Draw ccc arc
    context.beginPath();
    context.arc(187.5, 187.5, 120, 0, 2 * Math.PI);
    context.setStrokeStyle("#cccccc");
    context.setLineWidth(5);
    context.stroke();
    context.closePath();

    //Draw red arc
    context.beginPath();
    context.arc(
      187.5,
      187.5,
      120,
      1.5 * Math.PI,
      (1.5 + 2 * this.flag.currentProgress) * Math.PI
    );
    context.setStrokeStyle(this.data.isStartTomato ? "#e74c3c" : "#2ecc71");
    context.setLineWidth(5);
    context.stroke();
    context.closePath();

    //Draw text
    context.beginPath();
    context.setFillStyle(this.data.isStartRest ? "#2ecc71" :  "#e74c3c");
    context.setFontSize(40); 
    context.setTextAlign("center");
    context.setTextBaseline("middle");
    context.fillText(this.flag.minutes + ":" + this.flag.seconds, 187.5, 187.5);
    context.fill();
    context.closePath();

    context.draw();
  },
  initProgress() {},
  startCountdown() {
    let totalCount = this.flag.totalTime / this.flag.intervalTime;
    let currentCount = totalCount;
    this.timer = setInterval(() => {
      if (currentCount-- == 0) {
        this.stopCountdown();
        this.setData({
          isStartTomato: this.data.isStartTomato
            ? !this.data.isStartTomato
            : this.data.isStartTomato,
          isStartRest: this.data.isStartRest
            ? !this.data.isStartRest
            : this.data.isStartRest,
          tomatoTimeOver: this.data.isStartTomato
        });
        console.log(this.data);
      } else {
        let remainTime =
          this.flag.totalTime -
          (totalCount - currentCount) * this.flag.intervalTime;
        this.flag.currentProgress = 1 - currentCount / totalCount;
        this.flag.minutes = Math.floor((remainTime / 1000 / 60) % 60);
        this.flag.seconds = Math.floor((remainTime / 1000) % 60);
        this.drawProgressArc();
      }
    }, this.flag.intervalTime);
  },
  //停止，并重置
  stopCountdown() {
    clearInterval(this.timer);
    this.timer = null;
    this.onReady();
  },
  //开始/暂停专注
  bindTapTomato(event) {
    this.setData({
      isStartTomato: !this.data.isStartTomato,
      isStartRest: false,
      tomatoTimeOver: false
    });

    console.log(this.data);
    if (this.data.isStartTomato) {
      this.startCountdown();
    } else {
      this.stopCountdown();
    }
  },
  //开始/暂停休息
  bindTapRest(event) {
    this.setData({
      isStartRest: !this.data.isStartRest,
      isStartTomato: false,
      tomatoTimeOver: !this.data.isStartRest
    });

    console.log(this.data);
    if (this.data.isStartRest) {
      this.startCountdown();
    } else {
      this.stopCountdown();
    }
  },
  //退出休息
  bindTapRestExit(event) {
    this.setData({
      tomatoTimeOver: false
    });
    console.log(this.data);
  }
});
