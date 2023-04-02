const { Given, When, Then } = require("@cucumber/cucumber");
const helper = require("../../helpers/form_helper");
const { assert } = require("chai");

When(
  /^I enter '(.*)' in '(.*)' field in '(.*)' form$/,
  async (value, field, form) => {
    await helper.enterValueInForm(form, field, "name", value);
  }
);

When(
  /^I select '(.*)' in '(.*)' dropdown field in '(.*)' form$/,
  async (value, field, form) => {
    await helper.selectValueInForm(form, field, "name", value);
  }
);

Then(
  /^I should see the '(.*)' error message below '(.*)' field in '(.*)' form$/,
  async (text, field, form) => {
    await helper.verifyErrorMessage(form, field, "id", text);
  }
);

When(
  /^I enter the following combinations in '(.*)' field in '(.*)' form and should see the relevant error message$/,
  async (field, form, data) => {
    for (let password of data.rawTable) {
      await helper.enterValueInForm(form, field, "name", password[0]);
      await helper.verifyErrorMessage(form, field, "id", password[1]);
    }
  }
);

Then(
  /^I should see the '(.*)' button in '(.*)' form is (enabled|disabled)$/,
  async (btnText, form, btnDisabled) => {
    let btnStatus = btnDisabled === "disabled" ? "true" : null;
    await helper.verifyButtonDisabled(form, btnText, btnStatus);
  }
);

When(/^I click the '(.*)' button in '(.*)' form$/, async (btnText, form) => {
  await helper.clickButtonByText(form, btnText);
});

Then(/^I should see the '(.*)' button in '(.*)'$/, async (btnText, page) => {
  await helper.verifyButtonExistsInPage(page, btnText);
});

Then(
  /^I should see the '(.*)' button in '(.*)' form$/,
  async (btnText, form) => {
    await helper.verifyButtonExistsInForm(form, btnText);
  }
);

Then(/^I should see the '(.*)' field in '(.*)' form$/, async (field, form) => {
  await helper.verifyFieldExistsInForm(form, field, "name");
});

When(/^I click the '(.*)' button in '(.*)'$/, async (btnText, page) => {
  await helper.clickButtonByText(page, btnText);
});

When(
  /^I wait for (.*) seconds in '(.*)' form$/,
  { timeout: 60 * 1000 },
  async (waitTime, form) => {
    await driver.sleep(waitTime * 1000);
  }
);

Given(
  /^I fetch a user who takes care of (.*) and login$/,
  async (careTakenOf) => {
    const [email, password] = usersCreated[careTakenOf];
    await helper.enterValueInForm("login", "Email", "name", email);
    await helper.enterValueInForm("login", "Password", "name", password);
    await helper.clickButtonByText("login", "Log me In!");
  }
);

Then(
  /^I verify whether the following options are displayed for '(.*)' dropdown in '(.*)' form$/,
  async (selectField, form, data) => {
    const dataArray = data.rawTable.map((x) => x[0]);
    await helper.verifySelectOptions(form, selectField, "name", dataArray);
  }
);

Then(
  /^I verify and select the option '(.*)' is displayed for '(.*)' dropdown in '(.*)' form$/,
  async (option, selectField, form) => {
    await helper.verifyAndSelectOption(form, selectField, "name", option);
  }
);
