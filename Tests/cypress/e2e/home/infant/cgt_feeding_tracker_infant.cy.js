describe("Validate feeding tracker for infant", () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(Cypress.env(currentEnv).testURL);
    cy.viewport(1280, 720);
    cy.get('input[name="loginEmail"]')
      .clear()
      .type(Cypress.env(usersCreated).infant[0]);
    cy.get('input[name="loginPassword"]')
      .clear()
      .type(Cypress.env(usersCreated).infant[1]);
    cy.get("button").contains("Log me In!").click();
  });

  it(
    "verify the dropdown options in the feeding tracker modal dialog",
    { defaultCommandTimeout: 5000 },
    () => {
      cy.get("button")
        .contains("Start Feed")
        .should("be.visible")
        .and("be.enabled");
      cy.get("button").contains("Start Feed").click();
      cy.get(".modal-dialog").should("be.visible");
      cy.get(".modal-title").should("contain.text", "Feed given to");

      cy.get(".modal-body").within(() => {
        cy.get('select[name="feedingType"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Breast Pump",
              "Breast Milk",
              "Formula feeding",
              "Mashed food",
              "Juices",
              "Water",
              "Drips",
            ]);
          });
        cy.get('select[name="feedingType"]').select("Breast Pump");
        cy.get('select[name="feedingMode"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Manual Pump",
              "Electrical Pump",
            ]);
          });
        cy.get('select[name="feedingMode"]').select("Manual Pump");
        cy.get('select[name="feedingSide"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Left Breast",
              "Right Breast",
              "Both",
            ]);
          });
        cy.get('select[name="feedingMode"]').select("Electrical Pump");
        cy.get('select[name="feedingSide"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Left Breast",
              "Right Breast",
              "Both",
            ]);
          });
        cy.get('select[name="feedingType"]').select("Breast Milk");
        cy.get('select[name="feedingMode"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Pumped Milk",
              "Direct Feed",
            ]);
          });
        cy.get('select[name="feedingMode"]').select("Pumped Milk");
        cy.get('select[name="preparedFeed"]').should("be.visible");
        cy.get('select[name="feedingMode"]').select("Direct Feed");
        cy.get('select[name="feedingSide"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Left Breast",
              "Right Breast",
              "Both",
            ]);
          });
        cy.get('select[name="feedingType"]').select("Formula feeding");
        cy.get('select[name="feedingMode"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Feeding bottle",
              "Spoon",
              "Other",
            ]);
          });
        cy.get('select[name="feedingType"]').select("Mashed food");
        cy.get('select[name="feedingMode"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", ["Others feeding"]);
          });
        cy.get('select[name="feedingType"]').select("Juices");
        cy.get('select[name="feedingMode"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Feeding bottle",
              "Spoon",
              "Glass",
            ]);
          });
        cy.get('select[name="feedingType"]').select("Water");
        cy.get('select[name="feedingMode"]')
          .find("option")
          .then(($options) => {
            let optionList = [...$options].map((option) => option.label);
            cy.wrap(optionList).should("deep.equal", [
              "Feeding bottle",
              "Spoon",
              "Glass",
            ]);
          });
      });
    }
  );
});
