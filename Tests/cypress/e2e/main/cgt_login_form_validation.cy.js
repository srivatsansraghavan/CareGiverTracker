describe("Validate login form of Caregiver tracker", () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(Cypress.env(currentEnv).testURL);
    cy.viewport(1280, 720);
  });

  it("verify whether page title is Caregiver tracker", () => {
    cy.title().should("eq", "Caregiver Tracker");
  });

  it("verify whether an error message is displayed for empty or invalid entries", () => {
    cy.get('input[name="loginEmail"]').focus().blur();
    cy.get("#loginEmailError").should("have.text", "Email field is required");
    cy.get('input[name="loginPassword"]').focus().blur();
    cy.get("#loginPasswordError").should(
      "have.text",
      "Password field is required"
    );
    cy.get('input[name="loginEmail"]').type("abc");
    cy.get("#loginEmailError").should(
      "have.text",
      "Please enter a valid email"
    );
    cy.get("button").contains("Log me In!").should("be.disabled");
  });

  it("verify whether Log me In! button is enabled when all valid entries are entered", () => {
    cy.get('input[name="loginEmail"]').clear().type("abc@gmail.com");
    cy.get('input[name="loginPassword"]').type("Nastavirs@q123");
    cy.get("button").contains("Log me In!").should("be.enabled");
  });
});
