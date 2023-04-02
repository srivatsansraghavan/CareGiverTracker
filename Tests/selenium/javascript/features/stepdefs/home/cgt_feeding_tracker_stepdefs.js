const { Then } = require("@cucumber/cucumber");
const homePage = require("../../../pages/homepage");
const { assert } = require("../../support/env");

Then(
  /^I should see the 'Feed given to' modal dialog in 'Homepage'$/,
  async () => {
    await homePage.verifyFeedTrackingModal();
  }
);

Then(
  /^I should see the pumped feed available in 'Homepage' as '(.*)'$/,
  async (pumpedLine) => {
    let timelineRows = await homePage.getTopPumpedRow();
    assert.include(timelineRows, pumpedLine);
  }
);

Then(
  /^I should see the tracked feed available in 'Homepage' as '(.*)'$/,
  async (feedLine) => {
    let timelineRows = await homePage.getTopFeedRow(feedLine);
    assert.include(timelineRows, feedLine);
  }
);
