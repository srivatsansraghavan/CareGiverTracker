const { assert, By } = require('../features/support/env');

async function verifyFirstTimeUserModal() {
    console.log('Verifying first time user');
    assert.equal(await driver.findElement(By.css('.modal-dialog')).isDisplayed(), true);
    assert.equal(await driver.findElement(By.css('.modal-title')).getText(), 'First time user?');
}

exports.verifyFirstTimeUserModal = verifyFirstTimeUserModal;