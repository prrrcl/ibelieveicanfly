'use strict';

function main(){

  var gameParent = document.querySelector('#game');

  function buildDom(html){
    gameParent.innerHTML = html;
    return gameParent;
  }

  function createStartPage(){
    var startScreen = buildDom(`
      <section>
        <header>
          <h1>IBelieveICanFly &reg; The Game.</h1>
        </header>
        <button>Start</button>
      </section>
    `);
    var startButton = startScreen.querySelector('button');
    startButton.addEventListener('click', createGameScreen);
  };

  function createGameScreen(){
    var gameScreen = buildDom(`
      <section>
        <canvas id="game-canvas" width="700" height="500"></canvas>
        <p class="score"></p>
      </section>
    `);
    var canvas = gameScreen.querySelector('#game-canvas');
    var game = new Game(canvas);
    game.gameOverCallback(createGameOverScreen);

    game.start();
    document.addEventListener('keydown', function(event){
       if(event.keyCode === 32){
        game.player.setDirection(-1);
      }
      document.addEventListener('keyup', function(event){
        if(event.keyCode === 32){
          game.player.setDirection(1);
        }
      })
    });
  }


  function createGameOverScreen(){
    var gameOverScreen = buildDom(`
      <section>
        <h2>GAME OVER </h2>
        <button>Restart</button>
      </section>
    `);
    var restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener('click', createGameScreen);
  }

  createStartPage();

}
window.addEventListener('load',main);