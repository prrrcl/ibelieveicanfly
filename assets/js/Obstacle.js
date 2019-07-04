'use strict';

function Obstacle(canvas, height, y){
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.x = this.canvas.width;
  this.y = y;
  this.velocity = 3;
  this.direction = -1;
  this.color = 'red';
  this.width = height/6.25 -25;
  this.height = height - 25; 
  this.img = new Image();
  this.imgUp = new Image();
  this.img.src = './assets/img/obstacle1.png';
  this.imgUp.src = './assets/img/obstacle2.png';
}
Obstacle.prototype.move = function(){
  this.x = this.x + this.direction * this.velocity;
}
Obstacle.prototype.draw = function(){
  if(this.y === 0){
    this.ctxCanvas.drawImage(this.imgUp, this.x, this.y, this.width + 25, this.height + 25);
  }else{
    this.ctxCanvas.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
