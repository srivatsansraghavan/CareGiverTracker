const { assert } = require("../features/support/env");
const baseUrl =
  process.env.NODE_ENV == "local"
    ? "http://localhost:4200/"
    : "http://srivatsanssr.com/cgtangular/";

async function openCGT() {
  await driver.get(baseUrl);
}

async function verifyTitle() {
  assert.equal(await driver.getTitle(), "Caregiver Tracker");
}

exports.openCGT = openCGT;
exports.verifyTitle = verifyTitle;
