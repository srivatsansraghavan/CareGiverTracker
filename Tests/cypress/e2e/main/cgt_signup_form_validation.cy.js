let sumSide;

describe("Validate signup form of Caregiver tracker", () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(Cypress.env(currentEnv).testURL);
    cy.viewport(1280, 720);
  });

  it("verify whether page title is Caregiver tracker", () => {
    cy.title().should("eq", "Caregiver Tracker");
  });

  it("verify whether an error message is displayed when fields are left blank", () => {
    cy.get('input[name="signUpEmail"]').focus().blur();
    cy.get("#signUpEmailError").should("have.text", "Email field is required");
    cy.get('input[name="signUpPassword"]').focus().blur();
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password field is required"
    );
    cy.get('input[name="signUpRepeatPassword"]').focus().blur();
    cy.get("#signUpRepeatPasswordError").should(
      "have.text",
      "Repeat Password field is required"
    );
    cy.get('input[name="signUpFullName"]').focus().blur();
    cy.get("#signUpFullNameError").should(
      "have.text",
      "Full Name field is required"
    );
    cy.get('input[name="signUpAddVerify"]').focus().blur();
    cy.get("#signUpAddVerifyError").should(
      "have.text",
      "Adding numbers is required"
    );
    cy.get("button").contains("Sign me Up!").should("be.disabled", true);
  });

  it("verify whether an error message is displayed when invalid entries are entered", () => {
    cy.get('input[name="signUpEmail"]').type("abc");
    cy.get("#signUpEmailError").should(
      "have.text",
      "Please enter a valid email"
    );
    cy.get('input[name="signUpPassword"]').type("abcdefghi");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("ABCDEFGHI");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("abcABCDEFdef");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("abcde12345");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("ABCDE12345");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("ABCDEabcde12345");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("ABCDabcd@");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("ABCD1234@");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpPassword"]').clear().type("12345678@");
    cy.get("#signUpPasswordError").should(
      "have.text",
      "Password should have atleast one uppercase, lowercase, number and special character"
    );
    cy.get('input[name="signUpRepeatPassword"]').type("123456ab@");
    cy.get("#signUpRepeatPasswordError").should(
      "have.text",
      "Password and Repeat Password should be the same"
    );
    cy.get('input[name="signUpFullName"]').type("Name 123");
    cy.get("#signUpFullNameError").should(
      "have.text",
      "Full name cannot have number or special characters"
    );
    cy.get('input[name="signUpFullName"]').clear().type("Full_Name");
    cy.get("#signUpFullNameError").should(
      "have.text",
      "Full name cannot have number or special characters"
    );
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
      cy.get('input[name="signUpAddVerify"]')
        .clear()
        .type(sumSide - 1);
      cy.get("#signUpAddVerifyError").should(
        "have.text",
        "Not properly added!"
      );
    });
  });

  it("verify whether Sign me up! button is enabled when all entries are valid", () => {
    cy.get('input[name="signUpEmail"]').clear().type("abc@gmail.com");
    cy.get('input[name="signUpPassword"]').clear().type("abcABC123@");
    cy.get('input[name="signUpRepeatPassword"]').clear().type("abcABC123@");
    cy.get('input[name="signUpFullName"]').clear().type("ABC Name");
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
    cy.get("button").contains("Sign me Up!").should("be.enabled", true);
  });
});
