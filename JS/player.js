let up = false;
let down = false;
let left = false;
let right = false;
let playerDoneMoving = true;
let moving = false;
let wentDown = false;
let wentUp = false;
let direction;

function drawCharacter(char, x, y, charW, CharH) {
    return context.drawImage(char, x, y, charW, CharH);
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {       
        up = true;
    } 
    if(event.key === 'a') {
        left = true;        
    } 
    if(event.key === 'd') {
        right = true;        
    } 
    if(event.key === 's') {
        down = true;
    }  
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        up = false;
    } 
    if(event.key === 'a') {
        left = false;        
    } 
    if(event.key === 'd') {
        right = false;        
    } 
    if(event.key === 's') {
        down = false;
    }
});

function playerMove() {
    if (up && moving){
        player.y -= player.vy;
    }
    if (right && moving){
        player.x += player.vx;
        
    }
    if (down && moving){
        player.y += player.vy;
    }
    if (left && moving){
        player.x -= player.vx;
    }
}



//let lastDir = player.rightSprite;

function drawPlayer() {
    if (left) {
        drawCharacter(player.leftSprite, player.x, player.y, player.width, player.height)
        lastDir = player.leftSprite;
    } else if (right) {
        drawCharacter(player.rightSprite, player.x, player.y, player.width, player.height)
        lastDir = player.rightSprite;
    } else {
        //drawCharacter(lastDir, player.x, player.y, player.width, player.height)
    }
}