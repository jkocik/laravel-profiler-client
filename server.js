const profilerServer = require('http').createServer();
const profilerIO = require('socket.io')(profilerServer);
const clientServer = require('http').createServer();
const clientIO = require('socket.io')(clientServer);

let profilerSocket;
let clientSocket;

profilerIO.on('connection', socket => {
    profilerSocket = socket;
    profilerSocket.on('laravel-profiler-broadcasting', data => {
        if (clientSocket) {
            clientSocket.emit('laravel-profiler-broadcasting', data);
        }
    });
});

clientIO.on('connection', socket => clientSocket = socket);

profilerServer.listen(1902);
clientServer.listen(1901);
