// this attempts to start the game
let imagesLoaded = false;
socket.on('attempt_start', initialize);
//This runs everytime the server tells the player its their turn
socket.on('not_your_turn', function() {
  rollbt.style.display = 'none';
});

socket.on('your_turn', function() {
  rollbt.style.display = 'block';
});
socket.on('rival_move', (roll)=>{
  rivalDice = roll;
  rivalmover();
})



// initialize world
defineRooms();
function initWorld() {
  drawBackground(context);
}

// spawn player
function game() {
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  drawBackground(context);
  drawBoss();
  playerLocationDetection(); 
  rivalLocationDetection(); 
  playerDeterminFloor();
  rivalDeterminFloor();

  if (player.x > 1350 && player. y > 3000) {
    drawCharacter(player.victorySprite, player.x, player.y - 67, 90, 177)
  } else if(rival.x > 1350 && rival.y > 3000) {
    drawCharacter(rival.victorySprite, player.x, player.y - 67, 90, 177)
  } else {
    drawPlayer();
    drawRival();
  }

  playerMove();
  rivalMove();
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


images.forEach( (image, index) => {
  image.src = image_sources[index];
  image.onload = () => {
      loaded_images++;
      if (loaded_images === images.length) {
          imagesLoaded = true;
          initWorld();

      }
  }
});

function initialize() {
    console.log('starting game');
    

  const waitForPlayerEmit = setInterval(()=> {
    console.log('looking for players');
    console.log(playerNumber);
    
    if(playerNumber !== null && imagesLoaded === true) {
      player = assignHero(jon, danny, playerNumber);
      rival = assignRival(jon, danny, playerNumber);
      game();
      clearInterval(waitForPlayerEmit);
    }
  }, 300)
}
//detect player location in world



