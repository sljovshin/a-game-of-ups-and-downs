// this attempts to start the game
socket.on('attempt_start', initialize);
//This runs everytime the server tells the player its their turn
socket.on('not_your_turn', function() {
  rollbt.style.display = 'none';
});

socket.on('your_turn', function() {
  rollbt.style.display = 'block';
});



// initialize world

defineRooms();
drawBackground(context);

// spawn player
function game() {
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  drawBackground(context);
  drawBoss();
  playerLocationDetection(); 
  determinFloor();
  if (player.x > 1350 && player. y > 3000) {
    drawCharacter(player.victorySprite, player.x, player.y - 67, 90, 177)
  } else {
    drawPlayer();
  }
  playerMove();
  drawRoom(gateoverlap, 367, 0, 33, 250);
  if(player.x > 1400 && player. y > 3000) { 
    
    setTimeout(endGame, 3000);
    return;
  }
  requestAnimationFrame(game)
}

function endGame() {
  location.href = "../victory.html"
}




function initialize() {
    console.log('starting game');
    

  const waitForPlayerEmit = setInterval(()=> {
    console.log('looking for players');
    console.log(playerNumber);
    
    if(playerNumber !== null) {
      player = assignHero(jon, danny, playerNumber)
      game();
      clearInterval(waitForPlayerEmit);
    }
  }, 300)
}
//detect player location in world



