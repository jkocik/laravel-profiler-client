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

const sockets = [];
io.on('connection', socket => sockets.push(socket));
io.listen(args.ws);

express().use(bodyParser.json({
    extended: true,
    limit: '100mb',
    parameterLimit: 1000000,
})).post('/', (req, res) => {
    res.end();
    sockets.forEach(socket => socket.emit('laravel-profiler-broadcasting', req.body));
}).listen(args.http, () => {
    console.log(`Laravel Profiler http server listening on port ${args.http}, socket server listening on port ${args.ws}`);
});
