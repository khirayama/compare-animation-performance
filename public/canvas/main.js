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

  Main.setup = function() {
    Main.objs = [];
    var color;
    for (var i = 0; i < Main.numOfParticles; i++) {
      color = Utils.colors[Math.round(Utils.random(Utils.colors.length - 1, 0))];
      Main.objs.push(new Particle(Main.canvasWidth / 2, Main.canvasHeight / 2, Utils.random(10, -5), Utils.random(10, -5), Utils.random(10, 1), color));
    }
    Main.update();
  };
  Main.update = function() {
    Main.context.clearRect(0, 0, Main.canvasWidth, Main.canvasHeight);
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
      Main.objs[i].draw();
    }
    requestAnimationFrame(Main.update);
  };

  Main.setup();
}
