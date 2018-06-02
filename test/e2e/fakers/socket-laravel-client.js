const io = require('socket.io-client');

module.exports = {
    sendToSocketsServer(data) {
        const socket = io.connect('http://localhost:1902');
        socket.emit('laravel-profiler-broadcasting', data);

        setTimeout(() => socket.close(), 1000);
    },
};
