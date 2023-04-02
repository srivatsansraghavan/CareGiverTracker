import { faker } from "@faker-js/faker";
let sumSide;
let email1 = faker.internet.email();
let fullName1 = faker.name.firstName() + " " + faker.name.lastName();
let email2 = faker.internet.email();
let fullName2 = faker.name.firstName() + " " + faker.name.lastName();

describe("Validate first time user modal in the homepage of Caregiver tracker", () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(Cypress.env(currentEnv).testURL);
    cy.viewport(1280, 720);
  });

  it("verify whether page title is Caregiver tracker", () => {
    cy.title().should("eq", "Caregiver Tracker");
  });

  it(
    "verify whether first time user modal dialog is displayed when Sign me up! button is clicked, and Add Role by clicking Save button",
    { defaultCommandTimeout: 5000 },
    () => {
      cy.get('input[name="signUpEmail"]').clear().type(email1);
      cy.get('input[name="signUpPassword"]').clear().type("abcABC123@");
      cy.get('input[name="signUpRepeatPassword"]').clear().type("abcABC123@");
      cy.get('input[name="signUpFullName"]').clear().type(fullName1);
      cy.get('label[for="signUpAddVerify"]')
        .invoke("text")
        .then(($addElem) => {
          const splitAddElement = $addElem.split("+");
          const leftSide = parseInt(splitAddElement[0].trim());
          const rightSide = parseInt(splitAddElement[1].trim());
          sumSide = leftSide + rightSide;
          cy.wrap(sumSide).as("sumSideVar");
        });
      cy.get("@sumSideVar").then((sumSide) => {
        cy.get('input[name="signUpAddVerify"]').clear().type(sumSide);
      });
      cy.get("button").contains("Sign me Up!").click();
      cy.get(".modal-dialog").should("be.visible");
      cy.get(".modal-title").should("have.text", "First time user?");

      cy.get(".modal-footer").within(() => {
        cy.get("button").contains("Save").should("not.be.enabled");
      });

      cy.get(".modal-body").within(() => {
        cy.get("#care-taken-of").select("Infant");
        cy.get("#care-taken-name").type("Tvishi");
        cy.get("#care-taken-dob").type("2022-12-08");
        cy.get("#care-taken-gender").select("Female");
      });

      cy.get(".modal-footer").within(() => {
        cy.get("button").contains("Save").should("be.enabled");
        cy.get("button").contains("Save").click();
      });

      // cy.get('.toast-header').contains('Role Addition').within(() => {
      //     cy.get('.btn-close').should('be.visible').click()
      // })
      cy.get("button").contains("Start Feed").should("be.visible");

      cy.get("button").contains("Logout").should("be.visible").click();
    }
  );

  it(
    "Sign up as another user, click Later button in First time user modal, then Login and Add Role",
    { defaultCommandTimeout: 5000 },
    () => {
      cy.get('input[name="signUpEmail"]').clear().type(email2);
      cy.get('input[name="signUpPassword"]').clear().type("defDEF123@");
      cy.get('input[name="signUpRepeatPassword"]').clear().type("defDEF123@");
      cy.get('input[name="signUpFullName"]').clear().type(fullName2);
      cy.get('label[for="signUpAddVerify"]')
        .invoke("text")
        .then(($addElem) => {
          const splitAddElement = $addElem.split("+");
          const leftSide = parseInt(splitAddElement[0].trim());
          const rightSide = parseInt(splitAddElement[1].trim());
          sumSide = leftSide + rightSide;
          cy.wrap(sumSide).as("sumSideVar");
        });
      cy.get("@sumSideVar").then((sumSide) => {
        cy.get('input[name="signUpAddVerify"]').clear().type(sumSide);
      });
      cy.get("button").contains("Sign me Up!").click();
      cy.get(".modal-dialog").should("be.visible");
      cy.get(".modal-title").should("have.text", "First time user?");
      cy.get(".modal-footer").within(() => {
        cy.get("button").contains("Later").should("be.visible");
        cy.get("button").contains("Later").click();
      });
      cy.get('input[name="signUpEmail"]').should("be.visible");
      cy.get('input[name="loginEmail"]').clear().type(email2);
      cy.get('input[name="loginPassword"]').clear().type("defDEF123@");
      cy.get("button").contains("Log me In!").click();
      cy.get(".modal-dialog").should("be.visible");
      cy.get(".modal-title").should("have.text", "First time user?");
      cy.get(".modal-footer").within(() => {
        cy.get("button").contains("Save").should("not.be.enabled");
      });

      cy.get(".modal-body").within(() => {
        cy.get("#care-taken-of").select("Infant");
        cy.get("#care-taken-name").type("Tvishi");
        cy.get("#care-taken-dob").type("2022-12-08");
        cy.get("#care-taken-gender").select("Female");
      });

      cy.get(".modal-footer").within(() => {
        cy.get("button").contains("Save").should("be.enabled");
        cy.get("button").contains("Save").click();
      });
      cy.get("button").contains("Start Feed").should("be.visible");
      cy.get("button").contains("Logout").should("be.visible").click();
    }
  );
});
