const { When } = require('@cucumber/cucumber');
const homePage = require('../../../pages/homepage');

When(/^I see the Homepage and 'First time User' modal popup appears$/, async() => {
    await homePage.verifyFirstTimeUserModal();
});
