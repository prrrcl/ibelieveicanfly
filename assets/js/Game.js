'use strict';

function Game(canvas){
  this.player = null;
  this.obstacles = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctxCanvas = this.canvas.getContext('2d');
  this.onGameOver = null;
}

