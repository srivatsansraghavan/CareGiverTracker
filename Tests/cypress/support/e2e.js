// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')
const { faker } = require("@faker-js/faker");

before(function () {
  global.currentEnv = Cypress.env("CURRENT_ENV");
  cy.request(
    "GET",
    `${Cypress.env(currentEnv).apiURL}/base/clean-env-db/${currentEnv}`
  )
    .its("status")
    .should("eq", 200);

  //Creates users with role attached
  global.usersCreated = {};
  ["infant", "toddler", "child", "spouse", "friend", "parent"].forEach(
    async (role) => {
      let email = faker.internet.email();
      let password = faker.internet.password();
      cy.request("POST", `${Cypress.env(currentEnv).apiURL}/user/add-users`, {
        email: email,
        password: password,
        fullname: faker.name.fullName(),
      }).then((responseAddUser) => {
        if (responseAddUser.status === 200) {
          cy.request(
            "POST",
            `${Cypress.env(currentEnv).apiURL}/role/add-role`,
            {
              care_giver: email,
              care_taken_of: role,
              care_taken_name: faker.name.fullName(),
              care_taken_dob: faker.date.past(2),
              care_taken_gender: faker.name.gender(true),
            }
          ).then((responseAddRole) => {
            if (responseAddRole.status === 200) {
              usersCreated[role] = [email, password];
            }
          });
        }
      });
    }
  );
});
