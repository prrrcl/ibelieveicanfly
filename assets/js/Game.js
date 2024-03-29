'use strict';

function Game(canvas) {
  this.player = null;
  this.obstacles = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.onGameOver = null;
  this.cont = 0;
  this.score = 0;
  this.bso = new Audio('./assets/ibelieveicanfly.mp3')
}

Game.prototype.start = function () {
  this.bso.play();
  this.player = new Player(this.canvas, this.name, this.score);
  this.background = new Background(this.canvas);

  var loop = () => {
    this.cont++;
    if (this.cont % 100 === 0) {
      this.generateObstacles();
      this.deleteObstacles(this.obstacles);
    }
    if (this.cont % 60 === 0) {
      this.score++;
    }
    this.update();
    this.clear();
    this.draw();
    if (!this.isGameOver) {
      var frameID = requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }
  }
  loop();
}
Game.prototype.update = function () {
  this.checkCollisions();
  this.scoreUpdate();
  this.saveScore(this.score);
  this.obstacles.forEach(function (obstacle) {
    obstacle.move();
  });
  this.player.checkScreen();
  this.player.move();
  this.background.move();
}
Game.prototype.clear = function () {
  this.ctxCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Game.prototype.draw = function () {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function (obstacle) {
    obstacle.draw();
  })
}
Game.prototype.checkCollisions = function () {
  this.obstacles.forEach((obstacle, index) => {
    var rightLeft = this.player.x + this.player.width >= obstacle.x;
    var leftRight = this.player.x <= obstacle.x + obstacle.width;
    var bottomTop = this.player.y + this.player.height >= obstacle.y;
    var topBottom = this.player.y <= obstacle.y + obstacle.height;

    if (rightLeft && leftRight && bottomTop && topBottom) {
      this.obstacles.splice(index, 1);
      this.player.lives--;

    }
  })
  if (this.player.lives === 0) {
    this.isGameOver = true;
    this.bso.pause();
  }
}
Game.prototype.gameOverCallback = function (callback) {
  this.onGameOver = callback;
}
Game.prototype.generateObstacles = function () {
  var randomHeight = Math.floor(Math.random() * this.canvas.height);
  if (randomHeight > 400) {
    randomHeight = 400;
  }
  var newObstacle = new Obstacle(this.canvas, randomHeight, 0);
  var newObstacle2 = new Obstacle(this.canvas, this.canvas.height, randomHeight + 200)
  this.obstacles.push(newObstacle, newObstacle2);
}
Game.prototype.deleteObstacles = function (obstacles) {
  if (obstacles.length > 0) {
    obstacles.forEach(function (obstacle) {
      if (obstacle.x < 0) {
        obstacles.shift();
      }
    });
  }
}
Game.prototype.scoreUpdate = function () {
  var p = document.querySelector('.score');
  p.innerHTML = 'Score: ' + this.score;
}
Game.prototype.saveScore = function (score) {
  localStorage.setItem('score', score);
}
