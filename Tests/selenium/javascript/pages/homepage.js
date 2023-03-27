const { assert, By, until } = require("../features/support/env");

async function verifyFirstTimeUserModal() {
  assert.equal(
    await driver.findElement(By.css(".modal-dialog")).isDisplayed(),
    true
  );
  assert.equal(
    await driver.findElement(By.css(".modal-title")).getText(),
    "First time user?"
  );
}

async function verifyFeedTrackingModal() {
  await driver.wait(until.elementLocated(By.css(".modal-dialog")), 10000);
  assert.equal(
    await driver.findElement(By.css(".modal-dialog")).isDisplayed(),
    true
  );
  assert.include(
    await driver.findElement(By.css(".modal-title")).getText(),
    "Feed given to"
  );
}

async function getTopFeedRow() {
  const trackedFeeds = await driver.findElements(
    By.css(".tracked-feed-timeline")
  );
  for (let elemFeed of await driver.findElements(
    By.css(".tracked-feed-timeline")
  )) {
    console.log("elemFeed", await elemFeed.getText());
  }
  console.log("trackedFeeds", await trackedFeeds);
  const pumpedFeeds = await driver.findElements(
    By.css(".pumped-feed-timeline")
  );
  if (pumpedFeeds.length > 0) {
    for (const elemPump of pumpedFeeds) {
      console.log("elemPump", await elemPump.getText());
    }
  }

  console.log("pumpedFeeds", await pumpedFeeds);
  const trackedFeedRow = await trackedFeeds[0].getText();
  return trackedFeedRow;
}

exports.verifyFirstTimeUserModal = verifyFirstTimeUserModal;
exports.verifyFeedTrackingModal = verifyFeedTrackingModal;
exports.getTopFeedRow = getTopFeedRow;
