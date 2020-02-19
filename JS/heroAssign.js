const socket = io();

const jonSnow_portrait = document.getElementById('jonsnow_portrait');
const danny_portrait = document.getElementById('danarys_portrait');
const ctaText = document.getElementById('ctaText');
const cta = document.getElementById('cta');
const ctabox = document.getElementById('ctaBox');
let hero;
let player;
let room;

socket.on('hero', setHeroSelected);


function setHeroSelected (p, r) {
    if(p === 1) {
        hero = 'Jon Snow';
    } else {
        hero = 'Danerys Targaryen'
    }
    heroSelected(p);
    setPlayer(p);
    setRoom(r);
}

function setPlayer(p) {
    player = p;
}
function setRoom(r) {
    room = r;
}
function sendReady() {   
    socket.emit('ready', player)
}

function heroSelected(e) {
    if( e === 1) {
        jonSnow_portrait.classList.add('selected');
        cta.classList.add('jonSelected_cta');
        ctabox.classList.add('jonSelected_box');
    } else {
        danny_portrait.classList.add('selected');
        cta.classList.add('dannySelected_cta');
        ctabox.classList.add('dannySelected_box');
    }

    ctaText.innerText = 'ready';
    
}

document.getElementById('cta').addEventListener('click', () => {
    document.getElementById('cta').innerText = 'waiting';
    sendReady()    
    //socket.emit('ready', player, room)
})

socket.on('startGame', (destination) => {
    window.location.href = destination;
});