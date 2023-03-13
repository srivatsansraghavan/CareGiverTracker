const { assert } = require('../features/support/env');

async function openCGT() {
    await driver.get('http://localhost:4200/');
}

async function verifyTitle() {
    assert.equal(await driver.getTitle(), 'Caregiver Tracker');
}

exports.openCGT = openCGT;
exports.verifyTitle = verifyTitle;