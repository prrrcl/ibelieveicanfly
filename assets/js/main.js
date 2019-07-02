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
      </section>
    `);
    var canvas = gameScreen.querySelector('#game-canvas');
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