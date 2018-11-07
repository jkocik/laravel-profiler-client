const http = require('http');
const io = require('socket.io')(http.createServer());
const express = require('express');
const bodyParser = require('body-parser');

const args = process.argv.filter((item) => {
    return item.includes('=');
}).map((item) => {
    const arg = item.split('=');
    return { [arg[0]]: parseInt(arg[1]) };
}).reduce((obj, item) => {
    const prop = Object.keys(item)[0];
    obj[prop] = item[prop];
    return obj;
}, {});

const sockets = new Map();
io.on('connection', (socket) => {
    sockets.set(socket, socket);
    console.log(`Hi Profiler Client, ${sockets.size} connected at the moment`);

    socket.on('disconnect', () => {
        sockets.delete(socket);
        console.log(`Bye Profiler Client, ${sockets.size} connected at the moment`);
    });
});
io.listen(args.ws);

const broadcast = (req) => {
    sockets.forEach(socket => socket.emit('laravel-profiler-broadcasting', req.body));
};

express().use(bodyParser.json({
    extended: true,
    limit: '100mb',
    parameterLimit: 1000000,
})).post('/', (req, res) => {
    res.end();
    broadcast(req);
}).post('/status', (req, res) => {
    res.json({
        sockets: args.ws,
        clients: sockets.size
    });
    broadcast(req);
}).listen(args.http, () => {
    console.log(`Http listening on port ${args.http}`);
    console.log(`Sockets listening on port ${args.ws}`);
});
