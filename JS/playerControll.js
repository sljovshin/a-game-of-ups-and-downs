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
    playerMover();
    document.getElementById('roll').innerText = dice/400;
    setTimeout(()=> {
        wentDown = false;
        wentUp = false;
    }, 1500)
}

let moved = 0;

function playerMover() {
    moved = 0;
    playerDoneMoving = false;
    moving = true;
    currentX = player.x;
    console.log();
    move();
}

function move() {
    
    console.log(dice);
    console.log(moved);
    
    

    if(player.x > 1450 && playerDoneMoving === false) {
        player.x = 1368;
        moved += 318;
        player.y += 250;
        console.log('going down');
        
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    } else if (player.x < 150 && playerDoneMoving === false) {
        player.x = 168;
        moved += 382;
        player.y += 250;
        console.log('going down');
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    } else {
        moved += player.vx;
    }

    if(player.x > 1400 && player. y > 3000) {
        moving = false;
        playerDoneMoving = true;
        cancelAnimationFrame(move);
        context.drawImage(chestOpen, 1490, 3145, 90, 60);
        socket.emit('done');
        
        return;
    }

    
    if(moved > dice) {
        moving = false;
        playerDoneMoving = true;
        cancelAnimationFrame(move);
        socket.emit('done');
        return;
    }

    requestAnimationFrame(move);
}
/*
const playerMover = (length) => {
    playerDoneMoving = false;
    currentX = player.x;
    
    let move = setInterval(()=> {
        moving = true;
        console.log(moving);
        
        if(moved > length * 1000) {
            moving = false;
            playerDoneMoving = true;
            clearInterval(move);
            moved = 0;
        }


        if(player.x > 1450 && playerDoneMoving === false) {
            player.x = 1440;
            player.y += 250;
            window.scroll({
                top: player.y,
                behavior: 'smooth'
              });
        }
        if(player.x < 150 && playerDoneMoving === false) {
            player.x = 160;
            player.y += 250;
            window.scroll({
                top: player.y,
                behavior: 'smooth'
              });
        }
        if(player.x > 1400 && player. y > 3000) {
            moving = false
        }
        moved += 100;
    }, 100)

}

*/


/**
 *         if (player.x > 1200 && player.x < 1400) {
            player.y += 250;
        } else if (player.x > 150 && player.x < 250 ) {
            player.y += 250;
        }
 */

/*
let dir = 1;
let c = 0;
function direction() {
     if (c === 2) {
        if(dir === 1) {
            player.y = player.y + 250;
            dir = -1;
         } else {
            dir = 1;
        }  
    }
    c++
    
    return dir;
}   

*/
/*
console.log('moving');
for (let i = 0; i < rooms.length; i++) {
    if (player.x > rooms[i].x && player.x < rooms[i].xX && player.y > rooms[i].y && player.y < rooms[i].yY) {  
        console.log("room: "+rooms[i].roomNum);
                            
        if (rooms[i].roomNum % 4 === 0) {
            player.y = player.y + 250;
        }
     }     
}       
player.x = player.x + (400 * direction());
*/



//if(Math.floor(player.x / 400) + 1 % 4 === 0) {
//} 