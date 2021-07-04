class Game {
  constructor() {}
  getState() {
    database.ref("gameState").on("value", (data) => {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({ gameState: state });
  }
  start() {
    if (gameState == 0) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
    ball = createSprite(200, 200, 10, 10);
    ball.visible = false;
    playerPaddle = createSprite(300, 50, 50, 100);
    playerPaddle.visible = false;
    computerPaddle = createSprite(100, 50, 50, 100);
    computerPaddle.visible = false;
    players = [playerPaddle, computerPaddle];
                ball.velocityX = 3;
            ball.velocityY = 4;
  }
  play() {
    var index = 0;
    var isSpaceDown;
    background("white");
    ball.visible = true;
    playerPaddle.visible = true;
    computerPaddle.visible = true;
    form.hide();
    player.getPlayerInfo();
    player.readBall();

    database.ref("isSpaceDown").on("value", (data) => {
      isSpaceDown = data.val();

      if (isSpaceDown["isSpaceDown"] === true) {
        console.log("yo");

        database.ref("ball").on("value", (data) => {
          ball.x = data.val().x;
          console.log(ball.x);
          ball.y = data.val().y;
        });
      }
    });

    if (allPlayers != null) {
      for (var i in allPlayers) {
        index += 1;
        if ("player" + player.index === i) {
          background("white");
          //   playerPaddle.y = mouseY;
          players[index - 1].y = mouseY;
          player.y = mouseY;
          player.update();
        } else {
          background("white");
          players[index - 1].y = allPlayers[i].y;
        }
        if (player.index == 1) {
          if (keyDown("space")) {
            player.updateBall(ball.x, ball.y);
            database.ref("isSpaceDown").set({ isSpaceDown: true });
          }
        }

        if (ball.isTouching(players[index - 1])) {
          ball.bounceOff(players[index - 1]);
        } else {
          ball.bounceOff(players[index - 1]);
        }
        reset();
        net();
      }
      player.updateBall(ball.x, ball.y);
    }

    drawSprites();
    function net() {
      for (var i = 0; i < 400; i += 20) {
        line(200, i, 200, i + 10);
      }
    }
    function reset() {
      if (ball.x > 400 || ball.x < 0) {
        ball.x = 200;
        ball.y = 200;

      }
    }
  }
}
