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
    <h2>Instructions</h2>
    <h4>Do you want to play this game? It's so easy!!!</h4>
    </header>
    <article class="instructions-article">
    <iframe src="https://giphy.com/embed/EXHHMS9caoxAA" width="480" height="322" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <p>The man just jumped from the elastic bed, and he wants to make a dunk, but... I think he will not...</p>
      <p>Anyway, you can help him by pressing the "Space" key.</p>
      <p>The man will fall by default. You must "give him the power of flight" with the "space" key if you don't want him to die on the floor... :)</p>
      <button>Let's try</button>
    </article>
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
        <p class="score"></p>

        <button>Restart</button>
      </section>
    `);
    var scoreShow = document.querySelector('.score');
    scoreShow.innerHTML ='<h4>Great!!</h4> <p>your Score:</p> <h2>' + localStorage.getItem('score') + '</h2>';
    var restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener('click', createGameScreen);
  }

  createStartPage();

}
window.addEventListener('load',main);