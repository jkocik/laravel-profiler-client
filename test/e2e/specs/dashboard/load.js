const data = require('./../../../fixtures/common-js');
const server = require('./../../fakers/server');
const httpLaravelClient = require('./../../fakers/http-client');
const socketOtherProfilerClient = require('./../../fakers/socket-client');

module.exports = {
    before: () => server.start(),
    after: () => server.stop(),

    'loads dashboard page with profiler data': (browser) => {
        let devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementPresent('#app', 1000)
            .waitForElementPresent('main > section', 1000);
    },

    'sees tracker received from server': (browser) => {
        socketOtherProfilerClient.listenSocketsServer();
        httpLaravelClient.send(data.dummyTrackerData);

        browser
            .pause(1000)
            .assert.containsText('table', data.dummyTrackerData.meta.env)
            .assert.containsText('table', data.dummyTrackerData.meta.type)
            .assert.containsText('table', data.dummyTrackerData.meta.method)
            .end();
    },
};
