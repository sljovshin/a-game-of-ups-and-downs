
const stairsup = [{
                        room: 10,
                        x: 400,
                        y: levels[2].y,
                    },
                    {
                        room: 28,
                        x: 1200,
                        y: levels[6].y,
                    },
                    {
                        room: 41,
                        x: 0,
                        y: levels[10].y,
                    },
                    {
                        room: 51,
                        x: 800,
                        y: levels[12].y,
                    }]

const stairsdown = [{
                       room: 4,
                       x: 1200,
                       y: levels[0].y,
                    },
                    {
                        room: 19,
                        x: 800,
                        y: levels[4].y,
                    },
                    {
                        room: 34,
                        x: 400,
                        y: levels[8].y,
                    },
                    {
                        room: 48,
                        x: 1200,
                        y: levels[11].y,
                    }]


function openDoor(i) {
    stairsdown.forEach( room => {       
        if(rooms[i].roomNum === room.room) {
            drawRoom(halldown, rooms[i].x, rooms[i].y, 400, 250); 
            setTimeout(stairDown(stairsdown.indexOf(room)), 1000);
         }
    })
    stairsup.forEach( room => {
        if(rooms[i].roomNum === room.room) {
            drawRoom(hallup, rooms[i].x, rooms[i].y, 400, 250);        
            setTimeout(stairsUp(stairsup.indexOf(room)), 1000);
         }
    })
}

function stairDown(i) {   
    if (!moving && !wentUp && playerDoneMoving) {
        wentDown = true;       
        player.x = stairsup[i].x + 168;
        player.y = stairsup[i].y + 90;
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    }
}
function stairsUp(i) {
    if (!moving && !wentDown && playerDoneMoving) {
        wentUp = true;
        player.x = stairsdown[i].x + 168;
        player.y = stairsdown[i].y + 90;
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    }
}



function playerLocationDetection() {
    //console.log(player.y);
    for (let i = 0; i < rooms.length; i++) {
        if (player.x > rooms[i].x && player.x < rooms[i].xX && player.y > rooms[i].y && player.y < rooms[i].yY) {
            openDoor(i);                      
        }     
    }
    if(player.x > 1200 && player. y > 3000) {
        context.drawImage(chestOpen, 1490, 3145, 90, 60);
    } else {
        context.drawImage(chestClosed, 1490, 3145, 90, 60);
    }
}

function determinFloor() {
    for (let i = 0; i < levels.length; i++) {
        if (player.y > levels[i].y && player.y < levels[i].yY) {
            if (levels[i].level % 2 === 1) {
                left = false;
                right = true;
            } else {
                right = false;
                left = true;
            }
           if (levels[i].level === 12) {
                bossIdle = false;
            } else {
                bossIdle = true;
            }
        }
    } 
}

/**
 *     if(rooms[i].roomNum === 4) {

        drawRoom(halldown, rooms[i].x, rooms[i].y, 400, 250);        
     }
 */