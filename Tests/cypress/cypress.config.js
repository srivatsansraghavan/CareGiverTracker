const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "e2e/**/*.cy.js",
    supportFile: "support/e2e.js",
    fixturesFolder: "fixtures",
    testIsolation: false,
    experimentalStudio: true,
    reporter: "mochawesome",
    env: {
      local: {
        testURL: "http://localhost:4200/",
        apiURL: "http://localhost:3000",
      },
      test: {
        testURL: "http://srivatsanssr.com/cgtangulartest/",
        apiURL: "http://srivatsanssr.com/apitest",
      },
      usersCreated: {
        infant: [],
        toddler: [],
        child: [],
        spouse: [],
        friend: [],
        parent: [],
      },
    },
  },
});
