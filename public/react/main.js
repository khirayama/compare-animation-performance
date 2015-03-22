var Main = Main || {};

function Particle(uid, x, y, vx, vy, r, c) {
  this.uid = uid || this.uid;
  this.r = r || this.r;
  this.c = c || this.c;
  this.x = x || this.x;
  this.y = y || this.y;
  this.vx = vx || this.vx;
  this.vy = vy || this.vy;
};
Particle.prototype = {
  uid: 0,
  r: 20,
  c: '#aaa',
  x: Main.svgW / 2,
  y: Main.svgH / 2,
  vx: 1,
  vy: 1,
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
  }
};
var Particles = React.createClass({displayName: "Particles",
  getInitialState: function() {
    return {
      particles: []
    }
  },
  render: function() {
    return (
      React.createElement("svg", {id: "svg"}, 
        this.props.particles.map(function(ball) {
          return React.createElement("circle", {key: ball.uid, cx: ball.x, cy: ball.y, r: ball.r, fill: ball.c});
        })
      )
    );
  }
});

window.onload = function() {
  'use strict';
  Main.svgW = window.innerWidth;
  Main.svgH = window.innerHeight;

  Main.setup = function() {
    Main.objs = [];
    var color;
    for(var i = 0; i < Main.numOfParticles; i++) {
      color = Utils.colors[Math.round(Utils.random(Utils.colors.length - 1, 0))];
      Main.objs.push(new Particle(i, Main.svgW / 2, Main.svgH / 2, Utils.random(10, -5), Utils.random(10, -5), Utils.random(10, 1), color));
    }

    Main.renderer = React.render(React.createElement(Particles, {particles: Main.objs}), document.body);
    Main.update();
  };

  Main.update = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
    }
    Main.renderer.setState(Main.objs);
    requestAnimationFrame(Main.update);
  };
  Main.setup();
}
