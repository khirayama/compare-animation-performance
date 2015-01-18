var Main = Main || {};

window.onload = function() {
  'use strict';
  Main.canvas = document.getElementById('canvas');
  Main.canvas.width = window.innerWidth;
  Main.canvas.height = window.innerHeight;
  Main.canvasWidth = Main.canvas.width;
  Main.canvasHeight = Main.canvas.height;
  Main.context = Main.canvas.getContext('2d');


  Main.numOfBall = 2000;
  Main.random = function(num, a) {
    return Math.abs(Math.random() * num) + a;
    // return Math.round(Math.random() * num) + a;
  };

  // color
  var red = '#c0392b';
  var blue = '#2980b9';
  var yellow = '#f1c40f';
  var orange = '#d35400';
  var green = '#27ae60';
  var purple = '#8e44ad';
  var gray = '#7f8c8d';
  var colorBox = [red, blue, yellow, orange, green, purple, gray];

  // 初期化する
  Main.setup = function() {
    Main.objs = [];
    var color;
    for(var i = 0; i < Main.numOfBall; i++) {
      color = colorBox[Math.round(Main.random(colorBox.length, 0))];
      Main.objs.push(new Main.Ball(Main.canvasWidth / 2, Main.canvasHeight / 2, Main.random(10, -5), Main.random(10, -5), Main.random(10, 1), color));
    }

    setInterval(function() {
      Main.update();
      Main.context.clearRect(0, 0, Main.canvasWidth, Main.canvasHeight);
      Main.draw();
    }, 1000 / 60);
  };
  Main.update = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
    }
  };
  Main.draw = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].draw();
    }
  };

  // class: Ball
  Main.Ball = function(x, y, vx, vy, r, c) {
    this.r = r || this.r;
    this.c = c || this.c;
    this.x = x || this.x;
    this.y = y || this.y;
    this.vx = vx || this.vx;
    this.vy = vy || this.vy;
    this.init();
  };
  Main.Ball.prototype = {
    r: 20,
    c: red,
    x: Main.canvasWidth / 2,
    y: Main.canvasHeight / 2,
    vx: 1,
    vy: 1,
    init: function() {
      var that = this;
      that.draw();
    },
    update: function() {
      var that = this;
      that.x += that.vx;
      if (that.x < 0 || that.x > Main.canvasWidth) {
        that.vx = -that.vx;
      }
      that.y += that.vy;
      if (that.y < 0 || that.y > Main.canvasHeight) {
        that.vy = -that.vy;
      }
    },
    draw: function() {
      var that = this;
      Main.context.fillStyle = that.c;
      Main.context.beginPath();
      Main.context.arc(that.x, that.y, that.r, 0, Math.PI * 2, true);
      Main.context.closePath();
      Main.context.fill();
    }
  };

  Main.setup();
}
