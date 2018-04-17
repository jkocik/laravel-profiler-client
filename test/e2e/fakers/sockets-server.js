const childProcess = require('child_process');

module.exports = {
    server: null,

    start() {
        this.server = childProcess.fork('./server.js');
    },

    stop() {
        this.server.kill();
    },
};
