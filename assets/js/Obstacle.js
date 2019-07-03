'use strict';

function Obstacle(canvas, height, y){
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.x = this.canvas.width;
  this.y = y;
  this.velocity = 3;
  this.direction = -1;
  this.color = 'red';
  this.width = 20;
  this.height = height;  
}
Obstacle.prototype.move = function(){
  this.x = this.x + this.direction * this.velocity;
}
Obstacle.prototype.draw = function(){
  this.ctxCanvas.fillStyle = this.color;
  this.ctxCanvas.fillRect(this.x,this.y,this.width,this.height);
}
