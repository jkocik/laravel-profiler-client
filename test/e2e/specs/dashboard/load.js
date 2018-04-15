module.exports = {
    'loads dashboard page': function(browser) {
        let devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementPresent('#app', 1000)
            .waitForElementPresent('table', 1000)
            .end();
    },
};
