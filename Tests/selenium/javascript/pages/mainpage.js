const { assert } = require('../features/support/env');
const baseUrl = process.env.NODE_ENV == 'dev' ? 'http://54.204.248.179/' : 'http://localhost:4200';

async function openCGT() {
    await driver.get(baseUrl);
}

async function verifyTitle() {
    assert.equal(await driver.getTitle(), 'Caregiver Tracker');
}

exports.openCGT = openCGT;
exports.verifyTitle = verifyTitle;