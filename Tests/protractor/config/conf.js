var reporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../specs/home/*.js'],
    capabilities: {
        browserName: 'chrome',

    },
    baseUrl: 'http://localhost:4200/',
    resultJsonOutputFile: './results.json',
    onPrepare: () => {
        jasmine.getEnv().addReporter(
            new reporter({
                savePath: '../screenshots',
                takeScreenshots: false
            })
        )
    }
}