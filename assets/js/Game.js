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
  this.player = newPlayer (this.canvas);
  var loop = () => {
    if(Math.random() > 0.99){
      var randomHeight = Math.random() * this.canvas.randomHeight - 10;
      var newObstacle = new Obstacle(this.canvas, randomHeight);
      this.obstacles.push(newObstacle);
    }
    // this.update();
    // this.clear();
    // this.draw();
    // this.checkCollisions();
    
    if(!this.isGameOver){
      var frameID = requestAnimationFrame(loop);
    }else{
      this.onGameOver();
    }
    
   
  }
  loop();

}
