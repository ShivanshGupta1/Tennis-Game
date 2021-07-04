var database;
var gameState = 0;
var playerCount = 0;
var form, player, game;
var allPlayers;
var ballinfo;
var players;

//create the ball, playerPaddle and computerPaddle as sprite objects
var ball;
var playerPaddle;
var computerPaddle;


function setup(){
  database = firebase.database();

  createCanvas(windowWidth-50,windowHeight-50);
  game = new Game();
  game.getState();
  game.start();

  
}

function draw(){
  background("white");


  if (playerCount===2){
    game.update(1);
    game.getState();
  }
  
 
  
  if (gameState==1){
game.play()
 

  
}
}


