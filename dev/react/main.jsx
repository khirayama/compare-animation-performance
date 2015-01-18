var Main = Main || {};

var Balls = React.createClass({
  getInitialState: function() {
    return {
      balls: Main.objs
    }
  },
  render: function() {
    var dom = [];
    var len = this.state.balls.length;
    var ball;
    for(var i = 0; i < len; i++) {
      ball = this.state.balls[i];
      dom.push(<circle cx={ball.x} cy={ball.y} r={ball.r} fill={ball.c}></circle>);
    }
    return (
      <svg id="svg">{dom}</svg>
    );
  }
});

window.onload = function() {
  'use strict';
  Main.svgW = window.innerWidth;
  Main.svgH = window.innerHeight;

  Main.numOfBall = 2000;
  Main.random = function(num, a) {
    return Math.abs(Math.random() * num) + a;
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
      Main.objs.push(new Main.Ball(Main.svgW / 2, Main.svgH / 2, Main.random(10, -5), Main.random(10, -5), Main.random(10, 1), color));
    }

    Main.renderer = React.render(<Balls />, document.body);
    setInterval(function() {
      Main.update();
      Main.renderer.forceUpdate();
    }, 1000 / 60);
  };
  Main.update = function() {
    var i = 0;
    for (i = 0; i < Main.objs.length; i++) {
      Main.objs[i].update();
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
    x: Main.svgW / 2,
    y: Main.svgH / 2,
    vx: 1,
    vy: 1,
    init: function() {
      var that = this;
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
    }
  };

  Main.setup();
}
