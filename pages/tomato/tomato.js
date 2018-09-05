Page({
  timer: null,
  flag: {
    intervalTime: 10,
    tomatoTime: 1 * 60 * 1000, //25分钟为一个番茄时间
    restTime: 2 * 60 * 1000, //休息时间
    totalTime: 0,
    currentProgress: 0,
    minutes: 0,
    seconds: 0
  },
  data: {
    isStartTomato: false, //是否开始番茄时间
    isStartRest: false, //是否开始休息时间
    tomatoTimeOver: false //番茄时间倒计时结束
  },
  onReady() {
    this.flag.minutes = Math.floor((this.flag.tomatoTime / 1000 / 60) % 60);
    this.flag.seconds = Math.floor((this.flag.tomatoTime / 1000) % 60);
    this.flag.currentProgress = 0;
    this.flag.totalTime = thsi.flag.tomatoTime;
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
    context.setStrokeStyle("#e74c3c");
    context.setLineWidth(5);
    context.stroke();
    context.closePath();

    //Draw text
    context.beginPath();
    context.setFillStyle("#e74c3c");
    context.setFontSize(20);
    context.setTextAlign("center");
    context.setTextBaseline("middle");
    context.fillText(this.flag.minutes + ":" + this.flag.seconds, 187.5, 187.5);
    context.fill();
    context.closePath();

    context.draw();
  },
  stopTomato() {
    // clearInterval(this.timer);
    // this.onReady();
  },
  startCountdown() {
    if (!this.timer) {
      let totalCount = this.flag.totalTime / this.flag.intervalTime;
      let currentCount = totalCount;
      this.timer = setInterval(() => {
        if (currentCount-- == 0) {
          // clearInterval(this.timer);
          // this.flag.currentProgress = 0;
          // this.drawProgressArc();
          // stopTomato();
          // this.setData({
          //   tomatoTimeOver: !this.data.tomatoTimeOver
          // });
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
    } else {
      this.stopTomato();
      this.timer = null;
    }
  },
  bindTapTomato(event) {
    this.setData({
      isStartTomato: !this.data.isStartTomato
    });

    this.startCountdown();
  },
  bindTapRest(event) {},
  bindTapRestExit(event) {}
});
