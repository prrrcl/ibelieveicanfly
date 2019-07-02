'use strict';

function Game(canvas){
  this.player = null;
  this.obstacles = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.onGameOver = null;
}

Game.prototype.start = function(){
  this.player = new Player (this.canvas);
  var loop = () => {
    if(Math.random() > 0.99){
      var randomHeight = Math.random() * this.canvas.randomHeight - 10;
      var newObstacle = new Obstacle(this.canvas, randomHeight);
      this.obstacles.push(newObstacle);
    }
    this.update();
    this.clear();
    this.draw();
    this.checkCollisions();
    
    if(!this.isGameOver){
      var frameID = requestAnimationFrame(loop);
    }else{
      this.onGameOver();
    }
    
   
  }
  loop();

}
Game.prototype.update = function(){
  this.obstacles.forEach(function(obstacle){
    obstacle.move();
  })
}
Game.prototype.clear = function(){
  this.ctxCanvas.clearRect(0,0,this.canvas.width, this.canvas.randomHeight)
}

Game.prototype.draw = function(){
  this.player.draw();
  this.obstacles.forEach(function(obstacle){
    obstacle.draw();
  })
}
Game.prototype.checkCollisions = function(){
  this.obstacles.forEach((obstacle, index) =>{
    var rightLeft = this.player.x + this.player.width >= obstacle.x;
    var leftRight = this.player.x <= obstacle.x + obstacle.width;
    var bottomTop = this.player.y + this.player.height >= obstacle.y;
    var topBottom = this.player.y <= obstacle.y + obstacle.height;
    
    if(rightLeft && leftRight && bottomTop && topBottom){
      this.enemies.splice(index,1);
      this.player.lives--;
      if(this.player.lives === 0){
        this.isGameOver = true;
      }
    }
  })
}
Game.prototype.gameOverCallback = function(callback){
  this.onGameOver = callback;
}