exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../specs/home/*.js'],
    capabilities: {
        browserName: 'chrome',

    },
    baseUrl: 'http://localhost:4200/',
    resultJsonOutputFile: './results.json',
}

onPrepare: () => {
    //let faker = require('@faker-js/faker');


}