var Main = Main || {};

function Particle(x, y, vx, vy, r, c) {
  this.r = r || this.r;
  this.c = c || this.c;
  this.x = x || this.x;
  this.y = y || this.y;
  this.vx = vx || this.vx;
  this.vy = vy || this.vy;
  this.init();
}
Particle.prototype = {
  r: 20,
  c: '#aaa',
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

window.onload = function() {
  'use strict';
  Main.canvas = document.getElementById('canvas');
  Main.canvas.width = window.innerWidth;
  Main.canvas.height = window.innerHeight;
  Main.canvasWidth = Main.canvas.width;
  Main.canvasHeight = Main.canvas.height;
  Main.context = Main.canvas.getContext('2d');

  var red = '#c0392b', blue = '#2980b9', yellow = '#f1c40f', orange = '#d35400', green = '#27ae60', purple = '#8e44ad', gray = '#7f8c8d';
  var colorBox = [red, blue, yellow, orange, green, purple, gray];

  Main.setup = function() {
    Main.objs = [];
    var color;
    for (var i = 0; i < Main.numOfParticles; i++) {
      color = colorBox[Math.round(Utils.random(colorBox.length, 0))];
      Main.objs.push(new Particle(Main.canvasWidth / 2, Main.canvasHeight / 2, Utils.random(10, -5), Utils.random(10, -5), Utils.random(10, 1), color));
    }

    setInterval(function() {
      Main.update();
      Main.context.clearRect(0, 0, Main.canvasWidth, Main.canvasHeight);
      Main.draw();
    }, 1000 / Main.fps);
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

  Main.setup();
}
