const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "e2e/**/*.cy.js",
    supportFile: "support/e2e.js",
    testIsolation: false,
    experimentalStudio: true,
    reporter: 'mochawesome',
  },
});
