const profilerServer = require('http').createServer();
const profilerIO = require('socket.io')(profilerServer);
const clientServer = require('http').createServer();
const clientIO = require('socket.io')(clientServer);

let clientSockets = [];

profilerIO.on('connection', (socket) => {
    socket.on('laravel-profiler-broadcasting', (data) => {
        clientSockets.forEach(socket => socket.emit('laravel-profiler-broadcasting', data));
    });
});

clientIO.on('connection', socket => clientSockets.push(socket));

profilerServer.listen(1902);
clientServer.listen(1901);
