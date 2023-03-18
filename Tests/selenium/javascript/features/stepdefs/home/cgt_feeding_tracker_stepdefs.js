const { Then } = require('@cucumber/cucumber');
const homePage = require('../../../pages/homepage');
const { assert } = require('../../support/env');

Then(/^I should see the 'Feed given to' modal dialog in 'Homepage'$/, async() => {
    await homePage.verifyFeedTrackingModal();
});

Then(/^I should see the tracked feed available in 'Homepage' as '(.*)'$/, async(feedLine) => {
    let timelineRows = await homePage.getTopFeedRow();
    assert.include(timelineRows, feedLine);
})
