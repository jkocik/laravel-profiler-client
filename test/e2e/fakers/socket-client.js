const io = require('socket.io-client');

module.exports = {
    listenSocketsServer() {
        const socket = io.connect('http://localhost:1901');
        socket.on('laravel-profiler-broadcasting', data => {});

        setTimeout(() => socket.close(), 1000);
    },
};
