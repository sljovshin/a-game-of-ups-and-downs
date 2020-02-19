const socket = io('/game');

let screen = document.getElementById('main')
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let starttile = document.getElementById('start');
let gateoverlap = document.getElementById('gateoverlap');
let hall = document.getElementById('hallway');
let halldoor = document.getElementById('hallwayDoor');
let hallup = document.getElementById('hallwayUp');
let halldown = document.getElementById('hallwayDown');
let chestClosed = document.getElementById('chestClosed');
let chestOpen = document.getElementById('chestOpen');
let playerNumber = null; 
let rooms= [];

let jon = {
    leftSprite: document.getElementById('jonSnowL'),
    rightSprite: document.getElementById('jonSnowR'),
    victorySprite: document.getElementById('jonSnowV'),
    x: 168,
    y: 90,
    height: 110,
    width: 76,
    vx: 5,
    vy: 6,
};
let danny = {
    leftSprite: document.getElementById('danerysL'),
    rightSprite: document.getElementById('danerysR'),
    victorySprite: document.getElementById('danerysV'),
    x: 168,
    y: 90,
    height: 110,
    width: 76,
    vx: 5,
    vy: 6,
}

let player = jon;
socket.on('assignedHero', assignedHero);

function assignedHero(num) {
    playerNumber = num
}
function assignHero (p1, p2, num) {
    return num === 1 ? p1 : p2;
  }

const randomRoom = () => {
    return Math.floor(Math.random()*100);
};
function drawRoom(room, x, y, roomWidth, roomHeight) {
    return context.drawImage(room, x, y, roomWidth, roomHeight);
}

const levels = [
     {
        y: 0,
        yY: 249,
        level: 1,
    },
    {
        y: 250,
        yY: 499,
        level: 2,
    },
   {
        y: 500,
        yY: 749,
        level: 3,
    },
    {
        y: 750,
        yY: 999,
        level: 4,
    },
    {
        y: 1000,
        yY: 1249,
        level: 5,
    },
    {
        y: 1250,
        yY: 1499,
        level: 6,
    },
    {
        y: 1500,
        yY: 1749,
        level: 7,
    },
    {
        y: 1750,
        yY: 1999,
        level: 8,
    },
    {
        y: 2000,
        yY: 2249,
        level: 9,
    },
    {
        y: 2250,
        yY: 2499,
        level: 10,
    },
    {
        y: 2500,
        yY: 2749,
        level: 11,
    },
    {
        y: 2750,
        yY: 2999,
        level: 12,
    },
    {
        y: 3000,
        yY: 3249,
        level: 13,
    },
];

function drawBackground(context) {
    const roomWidth = 400;
    const roomHeight = 250;
    let roomsCount = 53;
    const doors = [4,10,19,28,34,41,48,51]

    let x = 0;
    let y = 0;
    
    for (let i = 0; i < roomsCount; i++) {  
        context.drawImage(hall, x, y, roomWidth, roomHeight);
        if (i === 0) {
            drawRoom(starttile, x, y, roomWidth, roomHeight);
        }
        doors.forEach(room => {
            if(i === room - 1) {
                drawRoom(halldoor, x, y, roomWidth, roomHeight);
            }
        })

        x = x + roomWidth;      
        if (x >= 4 * roomWidth) {
            y = y + roomHeight;
            x = 0;
        }
    }

}

function defineRooms() {
    let x = 0;
    let y = 0;
    const width = 400;
    const height = 250;
    let xX = x + width;
    let yY = y + height;
    let roomsCount = 52;

    for (let i = 0; i < roomsCount; i++) {
        rooms.push({
            roomNum: i + 1,
            x: x,
            y: y,
            xX: xX,
            yY: yY
        })

        
        x = xX;
        xX = xX + (width); 

        if (x > 3 * width) {
            y = yY;
            yY = yY +(height);
            x = 0;
            xX = x + width
        }
    }

}



defineRooms();



