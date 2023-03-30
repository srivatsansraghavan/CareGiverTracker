const { BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const { assert } = require("chai");
const axios = require("axios");

BeforeAll(async function () {
  try {
    global.driver = new Builder().forBrowser("chrome").build();
    global.axiosInstance = axios.create({
      baseURL:
        process.env.NODE_ENV == "local"
          ? "http://localhost:3000"
          : "http://srivatsanssr.com:3000",
      timeout: 3000,
      headers: { "Content-Type": "application/json" },
    });
    await axiosInstance.get("base/clean-env-db/test");
  } catch (err) {
    console.log(err);
  }
});

AfterAll(async function () {
  driver.quit();
});

exports.By = By;
exports.until = until;
exports.assert = assert;
