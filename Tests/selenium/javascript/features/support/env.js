const { BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const { assert } = require("chai");
const axios = require("axios");
const { faker } = require("@faker-js/faker");

BeforeAll(async function () {
  try {
    global.driver = new Builder().forBrowser("chrome").build();
    global.axiosInstance = axios.create({
      baseURL:
        process.env.CURRENT_ENV == "local"
          ? "http://localhost:3000"
          : "http://srivatsanssr.com:3002",
      timeout: 3000,
      headers: { "Content-Type": "application/json" },
    });
    await axiosInstance.get(`base/clean-env-db/${process.env.CURRENT_ENV}`);

    //Creates users with role attached
    global.usersCreated = {};
    ["infant", "toddler", "child", "spouse", "friend", "parent"].forEach(
      async (role) => {
        let email = faker.internet.email();
        let password = faker.internet.password();
        const addUser = await axiosInstance.post("/user/add-users", {
          email: email,
          password: password,
          fullname: faker.name.fullName(),
        });
        if (addUser.status === 200) {
          const addRole = await axiosInstance.post("/role/add-role", {
            care_giver: email,
            care_taken_of: role,
            care_taken_name: faker.name.fullName(),
            care_taken_dob: faker.date.past(2),
            care_taken_gender: faker.name.gender(true),
          });
          if (addRole.status === 200) {
            usersCreated[role] = [email, password];
          }
        }
      }
    );
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
