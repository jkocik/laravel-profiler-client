const childProcess = require('child_process');

module.exports = {
    server: null,

    start() {
        this.server = childProcess.fork('./server/server.js', ['http=8099', 'ws=1901']);
    },

    stop() {
        this.server.kill();
    },
};
