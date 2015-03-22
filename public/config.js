var Main = Main || {};
var Utils = Utils || {};
Main.fps = 60;
Main.numOfParticles = 2000;

Utils.random = function(num, a) {
  return Math.abs(Math.random() * num) + a;
};

var red = '#c0392b', blue = '#2980b9', yellow = '#f1c40f', orange = '#d35400', green = '#27ae60', purple = '#8e44ad', gray = '#7f8c8d';
Utils.colors = [red, blue, yellow, orange, green, purple, gray];

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
