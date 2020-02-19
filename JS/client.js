const socket = io();

socket.on('redirect', function(destination) {
    window.location.href = destination;
});