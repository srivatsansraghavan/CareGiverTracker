const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
const { MongoClient } = require('mongodb');
const axios = require('axios');

BeforeAll(async function() {
    const mongoUrl = (process.env.NODE_ENV == 'dev') ? '' : 'mongodb://localhost:27017';
    global.client = new MongoClient(mongoUrl);
    await client.connect();
    await client.db('caregiver_tracker').collection('cgt_users').deleteMany();
    await client.db('caregiver_tracker').collection('cgt_roles').deleteMany();
    await client.db('caregiver_tracker').collection('cgt_feeding').deleteMany();
    await client.db('caregiver_tracker').collection('cgt_excretion').deleteMany();
    global.driver = new Builder().forBrowser('chrome').build();
    global.axiosInstance = axios.create({
        baseURL: (process.env.NODE_ENV == 'dev') ? '' : 'http://localhost:3000',
        timeout: 3000,
        headers: { 'Content-Type': 'application/json' }
    });
});

AfterAll(async function () {
    driver.quit();
    await client.close();
})

exports.By = By;
exports.until = until;
exports.assert = assert;