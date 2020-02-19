const socket = io('/',{transports: ['websocket'],upgrade:false});

socket.on('redirect', function(destination) {
    window.location.href = destination;
});