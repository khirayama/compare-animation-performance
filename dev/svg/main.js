var Main = Main || {};

window.onload = function() {
  'use strict';
  Main.svg = document.getElementById('svg');
  Main.svgW = window.innerWidth;
  Main.svgH = window.innerHeight;

  Main.random = function(num, a) {
    return Math.abs(Math.random() * num) + a;
    // return Math.round(Math.random() * num) + a;
  };

  var red = '#c0392b', blue = '#2980b9', yellow = '#f1c40f', orange = '#d35400', green = '#27ae60', purple = '#8e44ad', gray = '#7f8c8d';
  var colorBox = [red, blue, yellow, orange, green, purple, gray];

  Main.setup = function() {
    Main.objs = [];
    var color;
    for(var i = 0; i < Main.numOfBall; i++) {
      color = colorBox[Math.round(Main.random(colorBox.length, 0))];
      Main.objs.push(new Main.Ball(Main.svgW / 2, Main.svgH / 2, Main.random(10, -5), Main.random(10, -5), Main.random(10, 1), color));
    }

    setInterval(function() {
      Main.update();
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
    x: Main.svgW / 2,
    y: Main.svgH / 2,
    vx: 1,
    vy: 1,
    init: function() {
      var that = this;
      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", this.x);
      circle.setAttribute("cy", this.y);
      circle.setAttribute("r", this.r);
      circle.setAttribute("fill", this.c);
      Main.svg.appendChild(circle);
      that.view = circle;
    },
    update: function() {
      var that = this;
      that.x += that.vx;
      if (that.x < 0 || that.x > Main.svgW) {
        that.vx = -that.vx;
      }
      that.y += that.vy;
      if (that.y < 0 || that.y > Main.svgH) {
        that.vy = -that.vy;
      }
    },
    draw: function() {
      var that = this;
      that.view.setAttribute("cx", this.x);
      that.view.setAttribute("cy", this.y);
    }
  };

  Main.setup();
}
