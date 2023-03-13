const { Before, After } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');

Before(function() {
    global.driver = new Builder().forBrowser('chrome').build();
});

After(async function(scenario) {
    driver.quit();
});

exports.By = By;
exports.until = until;
exports.assert = assert;