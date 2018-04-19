const profiler = require('./../../fakers/profiler');
const data = require('./../../../fixtures/common-js');
const socketsServer = require('./../../fakers/sockets-server');

module.exports = {
    before: () => socketsServer.start(),
    after: () => socketsServer.stop(),

    'loads dashboard page': (browser) => {
        let devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementPresent('#app', 1000)
            .waitForElementPresent('#app > header', 1000);
    },

    'sees tracker received from server': (browser) => {
        profiler.sendToSocketsServer(data.dummyTrackerData);

        browser
            .pause(1000)
            .assert.containsText('table', data.dummyTrackerData.meta.id)
            .assert.containsText('table', data.dummyTrackerData.meta.version)
            .assert.containsText('table', data.dummyTrackerData.meta.env)
            .end();
    },
};
