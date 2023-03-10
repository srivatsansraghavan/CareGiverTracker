const { Given, When, Then } = require('@cucumber/cucumber');
const mainPage = require('../../../pages/mainpage');
const helper = require('../../../helpers/form_helper');
Given(/I open Caregiver Tracker website/, async() => {
    await mainPage.openCGT();
});

When(/I enter '(.*)' in '(.*)' field/, async(value, field) => {
    await helper.enterValueInPage("signup", field, "name", value);
});

Then(/I should see the '(.*)' error message below '(.*)' field/, async(text, field) => {
    await helper.verifyErrorMessage("signup", field, "id", text);
});