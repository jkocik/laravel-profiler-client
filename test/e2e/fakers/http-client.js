const http = require('http');

module.exports = {
    send(data) {
        const options = {
            hostname: 'localhost',
            port: 8099,
            path: '/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        const req = http.request(options);
        req.write(JSON.stringify(data));
        req.end();
    },
};
