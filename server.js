const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const Players = require('./Players');
const nsp = io.of('/game');
const PORT = process.env.PORT || 3000;
let connections = [];
let waitingPlayer = null;
let users = [];

server.listen(PORT)
console.log('server running on port 3000...')

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '../index.html');
});
let readyPlayers = 0;
io.on('connection', onConnection);
nsp.on('connection', gamelog);


function onConnection(socket) {
  connections.push(socket);
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(connections.length);
  });

  console.log('Connected: %s sockets connected ', connections.length); 
  io.emit('greetToAll', 'Server: ',  (connections.indexOf(socket) + 1) + ' has arrived!', (connections.indexOf(socket) + 1) );
  socket.on('msg', (id, text) => io.emit('msg', id, text));
  matchMaker(socket);
  socket.on('ready', () => {
    users.push(socket)
    readyPlayers++;
    readyCheck();
  });
  
}




function matchMaker (socket) {
  if(waitingPlayer) {
    notifyGameStart(waitingPlayer, socket);
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    socket.emit('msg', 'Server:', 'You are waiting for another player');
  }
}


function notifyGameStart(player1, player2) {
  let destination = '/heroselect.html';
  var num = 1;
  [player1, player2].forEach(player => {
    player.emit('msg', 'Server: ', 'Game starting!')
    player.emit('redirect', destination);
    player.emit('hero', num);
    num++;
  })
  
}

let lastPlayersReady;
function readyCheck() {
  if (readyPlayers % 2 === 0 && readyPlayers !== 0 && readyPlayers !== lastPlayersReady) {
    let destination = '/game.html';
    io.emit('startGame', destination);
  }  
  lastPlayersReady = readyPlayers;
}


let players = [];
let current_turn = 0;
let _turn = 0;

function next_turn(){
   _turn = current_turn++ % players.length;
   players[_turn].emit('your_turn');
   console.log("next turn triggered " , _turn);
}
function firstTurn(){
  players[0].emit('not_your_turn');
}


let user = 1;
let started = false
function gamelog(socket) {
  console.log('A player connected');
  if (user < 3) {
    socket.emit('assignedHero', user)
  }
  user++;
  players.push(socket);
  if(players.length === 2 && started === false) {
    players.forEach(player => {
      player.emit('attempt_start');
    })
    started = true;
  }
  if(current_turn === 0) {
    firstTurn();
  }
  socket.on('done',function(){
     //if(players[_turn] === socket){
        next_turn();
     //}
  })
  socket.on('disconnect', function(){
    console.log('A player disconnected');
    players.splice(players.indexOf(socket),1);
    _turn--;
    console.log("A number of players now ",players.length);
  });
}