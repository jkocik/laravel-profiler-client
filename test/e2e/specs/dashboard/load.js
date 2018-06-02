const data = require('./../../../fixtures/common-js');
const socketsServer = require('./../../fakers/sockets-server');
const socketLaravelClient = require('./../../fakers/socket-laravel-client');
const socketOtherProfilerClient = require('./../../fakers/socket-profilter-client');

module.exports = {
    before: () => socketsServer.start(),
    after: () => socketsServer.stop(),

    'loads dashboard page with profiler data': (browser) => {
        let devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementPresent('#app', 1000)
            .waitForElementPresent('.dashboard', 1000);
    },

    'sees tracker received from server': (browser) => {
        socketOtherProfilerClient.listenSocketsServer();
        socketLaravelClient.sendToSocketsServer(data.dummyTrackerData);

        browser
            .pause(1000)
            .assert.containsText('table', data.dummyTrackerData.meta.env)
            .assert.containsText('table', data.dummyTrackerData.meta.type)
            .assert.containsText('table', data.dummyTrackerData.meta.method)
            .end();
    },
};
