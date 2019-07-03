'use strict';

function Player(canvas) {
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.height = 20;
  this.width = 20;
  this.x = 100;
  this.y = (this.canvas.height / 2) - this.height / 2;
  this.lives = 1;
  this.velocity = 3;
  this.direction = 0;
  this.color = 'blue';
}

Player.prototype.move = function (){
  this.y = this.y + this.direction * this.velocity;
}
Player.prototype.draw = function(){
  this.ctxCanvas.fillStyle = this.color;
  this.ctxCanvas.fillRect(this.x, this.y, this.width, this.height);
}
Player.prototype.setDirection = function(dir){
  this.direction = dir;
}
Player.prototype.checkScreen = function(){
  if(this.y < 0){
    this.y = 0;
  }else if(this.y > this.canvas.height - this.height / 2){
    this.y = this.canvas.height - this.height;
  }
}