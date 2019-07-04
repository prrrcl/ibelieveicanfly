'use strict';

function Background(canvas){
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.height = this.canvas.height;
  this.width = 2800;
  this.x = 0;
  this.y = 0;
  this.velocity = 1;
  this.direction = -1;
  this.img = new Image();
  this.img.src = './assets/img/back.png';
}

Background.prototype.move = function(){
  if(this.x === -1400){
    this.x = 0;
  }else{
    console.log('entra')
    this.x = this.x + this.velocity * this.direction;
  }
}
Background.prototype.draw = function(){
  this.ctxCanvas.drawImage(this.img, this.x, this.y, this.width, this.height);
}