var Main = Main || {};

function Particle(x, y, vx, vy, r, c) {
  this.r = r || this.r;
  this.c = c || this.c;
  this.x = x || this.x;
  this.y = y || this.y;
  this.vx = vx || this.vx;
  this.vy = vy || this.vy;
  this.init();
};
Particle.prototype = {
  r: 20,
  c: '#aaa',
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

window.onload = function() {
  'use strict';
  Main.svg = document.getElementById('svg');
  Main.svgW = window.innerWidth;
  Main.svgH = window.innerHeight;

  Main.setup = function() {
    Main.objs = [];
    var color;
    for (var i = 0; i < Main.numOfParticles; i++) {
      color = Utils.colors[Math.round(Utils.random(Utils.colors.length - 1, 0))];
      Main.objs.push(new Particle(Main.svgW / 2, Main.svgH / 2, Utils.random(10, -5), Utils.random(10, -5), Utils.random(10, 1), color));
    }
    Main.update();
  };
  Main.update = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
      Main.objs[i].draw();
    }
    requestAnimationFrame(Main.update);
  };
  Main.setup();
}
