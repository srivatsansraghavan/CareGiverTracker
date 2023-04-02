const { assert, By, until } = require("../features/support/env");

async function verifyFirstTimeUserModal() {
  await driver.sleep(3000);
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

async function getTopPumpedRow() {
  const pumpedFeeds = await driver.findElements(
    By.css(".pumped-feed-timeline")
  );
  const pumpedFeedRow = await pumpedFeeds[0].getText();
  return pumpedFeedRow;
}

async function getTopFeedRow(feedText) {
  await driver.sleep(2000);
  const trackedFeeds = await driver.findElements(
    By.css(".tracked-feed-timeline")
  );
  let trackedFeedRow;
  for (let i = 0; i < trackedFeeds.length; i++) {
    let trackedFeedText = await trackedFeeds[i].getText();
    if (trackedFeedText.indexOf(feedText) > -1) {
      trackedFeedRow = trackedFeedText;
      break;
    }
  }
  return trackedFeedRow;
}

exports.verifyFirstTimeUserModal = verifyFirstTimeUserModal;
exports.verifyFeedTrackingModal = verifyFeedTrackingModal;
exports.getTopPumpedRow = getTopPumpedRow;
exports.getTopFeedRow = getTopFeedRow;
