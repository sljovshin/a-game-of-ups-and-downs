let rollbt = document.getElementById('rollBt');

rollbt.addEventListener('click', ()=> {
    if(playerDoneMoving === true) {
        rollDice();
        rollbt.style.display = 'none';
    }
});


let dice;
const diceRoll = () => {
    return Math.floor(((Math.random()*50) / 10) + 1) * 400;
}


function rollDice() {
    dice = diceRoll();
    socket.emit('rival_roll', dice);
    playerMover();
    document.getElementById('roll').innerText = dice/400;
}

let playerMoved = 0;

function playerMover() {
    setTimeout(()=> {
        playerWentDown = false;
        playerWentUp = false;
    }, 1500)
    playerMoved = 0;
    playerDoneMoving = false;
    playerMoving = true;
    playerCurrentX = player.x;
    console.log();
    playermove();
}

function playermove() {
    if(player.x > 1470 && playerDoneMoving === false) {
        player.x = 1368;
        playerMoved += 318;
        player.y += 250;
        console.log('going down');
        
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    } else if (player.x < 130 && playerDoneMoving === false) {
        player.x = 168;
        playerMoved += 382;
        player.y += 250;
        console.log('going down');
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    } else {
        playerMoved += player.vx;
    }
    if(player.x > 1400 && player. y > 3000) {
        playerMoving = false;
        playerDoneMoving = true;
        cancelAnimationFrame(playermove);
        context.drawImage(chestOpen, 1490, 3145, 90, 60);
        socket.emit('done');
        return;
    }
    if(playerMoved > dice) {
        playerMoving = false;
        playerDoneMoving = true;
        cancelAnimationFrame(playermove);
        socket.emit('done');
        return;
    }
    requestAnimationFrame(playermove);
}

let rivalDice;
let rivalMoved = 0;
function rivalmover() {
    setTimeout(()=> {
        rivalWentDown = false;
        rivalWentUp = false;
    }, 1500)
    rivalMoved = 0;
    rivalDoneMoving = false;
    rivalMoving = true;
    rivalCurrentX = rival.x;
    console.log(rivalDice)
    rivalmove();
}

function rivalmove() {
    console.log(
        rivalDice,
        rivalMoved,
    )
    
    if(rival.x > 1470 && rivalDoneMoving === false) {
        rival.x = 1368;
        rivalMoved += 318;
        rival.y += 250;        
    } else if (rival.x < 130 && rivalDoneMoving === false) {
        rival.x = 168;
        rivalMoved += 382;
        rival.y += 250;
    } else {
        rivalMoved += rival.vx;
    }
    if(rival.x > 1400 && rival. y > 3000) {
        rivalMoving = false;
        rivalDoneMoving = true;
        cancelAnimationFrame(rivalmove);
        context.drawImage(chestOpen, 1490, 3145, 90, 60);
        return;
    }
    if(rivalMoved > rivalDice) {
        rivalMoving = false;
        rivalDoneMoving = true;
        cancelAnimationFrame(rivalmove);
        return;
    }
    requestAnimationFrame(rivalmove);
}
