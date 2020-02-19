const socket = io('/game');
let loaded_images = 0;
let starttile = new Image,
gateoverlap = new Image,
hall = new Image,
halldoor = new Image,
hallup = new Image,
halldown = new Image,
chestClosed = new Image,
chestOpen = new Image,
js_leftSprite = new Image,
js_rightSpirte = new Image,
js_victorySprite = new Image,
dt_leftSprite = new Image,
dt_rightSprite = new Image,
dt_victorySprite= new Image,
nk_idleSprite = new Image,
nk_activeSprite = new Image;

let images = [
     starttile,
     gateoverlap,
     hall,
     halldoor,
     hallup,
     halldown,
     chestClosed,
     chestOpen,
     js_leftSprite,
     js_rightSpirte,
     js_victorySprite,
     dt_leftSprite,
     dt_rightSprite,
     dt_victorySprite,
     nk_idleSprite,
     nk_activeSprite
]
let image_sources = [
    '../ASSETS/start.png',   
    '../ASSETS/gateoverlap.png',
    '../ASSETS/hallway.png',
    '../ASSETS/hallwayClosedDoor.png',
    '../ASSETS/hallwayStairsUp.png',
    '../ASSETS/hallwayStairsDown.png',
    '../ASSETS/dragonglasschest.png',
    '../ASSETS/dragonglasschestopen.png',
    '../ASSETS/JonSnowL.png',
    '../ASSETS/JonSnowR.png',
    '../ASSETS/jonSnowVictory.png',
    '../ASSETS/danerysL.png',
    '../ASSETS/danerysR.png',
    '../ASSETS/dannyVictory.png',
    '../ASSETS/nightkingidle.png',
    '../ASSETS/nkactiveAura.png'
]
let screen = document.getElementById('main')
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

starttile = images[0];
gateoverlap = images[1];
hall = images[2];
halldoor = images[3];
hallup = images[4];
halldown = images[5];
chestClosed = images[6];
chestOpen = images[7];


let rooms= [];

let jon = {
    leftSprite: images[8],
    rightSprite: images[9],
    victorySprite: images[10],
    x: 210,
    y: 90,
    height: 110,
    width: 76,
    vx: 5,
    vy: 6,
};
let danny = {
    leftSprite: images[11],
    rightSprite: images[12],
    victorySprite: images[13],
    x: 131,
    y: 90,
    height: 110,
    width: 76,
    vx: 5,
    vy: 6,
}

let playerNumber = null; 
let player = jon;
let rival = danny;

socket.on('assignedHero', assignedHero);

function assignedHero(num) {
    playerNumber = num
}
function assignHero (p1, p2, num) {
    return num === 1 ? p1 : p2;
  }
  function assignRival (p1, p2, num) {
    return num === 1 ? p2 : p1;
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



