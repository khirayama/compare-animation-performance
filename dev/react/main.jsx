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
var Particles = React.createClass({
  getInitialState: function() {
    return {
      particles: []
    }
  },
  render: function() {
    return (
      <svg id="svg">
        {this.props.particles.map(function(ball) {
          return <circle key={ball.uid} cx={ball.x} cy={ball.y} r={ball.r} fill={ball.c}></circle>;
        })}
      </svg>
    );
  }
});

window.onload = function() {
  'use strict';
  Main.svgW = window.innerWidth;
  Main.svgH = window.innerHeight;

  var red = '#c0392b', blue = '#2980b9', yellow = '#f1c40f', orange = '#d35400', green = '#27ae60', purple = '#8e44ad', gray = '#7f8c8d';
  var colorBox = [red, blue, yellow, orange, green, purple, gray];

  Main.setup = function() {
    Main.objs = [];
    var color;
    for(var i = 0; i < Main.numOfParticles; i++) {
      color = colorBox[Math.round(Utils.random(colorBox.length, 0))];
      Main.objs.push(new Particle(i, Main.svgW / 2, Main.svgH / 2, Utils.random(10, -5), Utils.random(10, -5), Utils.random(10, 1), color));
    }

    Main.renderer = React.render(<Particles particles={Main.objs} />, document.body);

    setInterval(function() {
      Main.update();
    }, 1000 / Main.fps);
  };

  Main.update = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
    }
    Main.renderer.setState(Main.objs);
  };
  Main.setup();
}
