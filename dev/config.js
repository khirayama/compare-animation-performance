var Main = Main || {};
var Utils = Utils || {};
Main.fps = 60;
Main.numOfParticles = 2000;

Utils.random = function(num, a) {
  return Math.abs(Math.random() * num) + a;
};
