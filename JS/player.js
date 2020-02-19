let playerRight = false;
let playerLeft = false;
let rivalRight = false;
let rivalLeft = false;
let playerDoneMoving = true;
let rivalDoneMoving = true;
let playerMoving = false;
let rivalMoving = false;
let playerWentDown = false;
let playerWentUp = false;
let rivlWentDown = false;
let rivalWentUp = false;
let direction;

function drawCharacter(char, x, y, charW, CharH) {
    return context.drawImage(char, x, y, charW, CharH);
}

function playerMove() {
    if (playerRight && playerMoving){
        player.x += player.vx;
    }
    if (playerLeft && playerMoving){
        player.x -= player.vx;
    }
}
function rivalMove() {
    if (rivalRight && rivalMoving){
        rival.x += rival.vx;
    }
    if (rivalLeft && rivalMoving){
        rival.x -= rival.vx;
    }
}




//let lastDir = player.rightSprite;

function drawPlayer() {
    if (playerLeft) {
        drawCharacter(player.leftSprite, player.x, player.y, player.width, player.height)
    } else if (playerRight) {
        drawCharacter(player.rightSprite, player.x, player.y, player.width, player.height)
    }
}
function drawRival() {
    if (rivalLeft) {
        drawCharacter(rival.leftSprite, rival.x, rival.y, rival.width, rival.height)
    } else if (rivalRight) {
        drawCharacter(rival.rightSprite, rival.x, rival.y, rival.width, rival.height)
    }
}