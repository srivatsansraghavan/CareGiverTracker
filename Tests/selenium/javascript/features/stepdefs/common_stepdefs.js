const { When, Then } = require('@cucumber/cucumber');
const helper = require('../../helpers/form_helper');

When(/^I enter '(.*)' in '(.*)' field in '(.*)' form$/, async(value, field, form) => {
    await helper.enterValueInForm(form, field, "name", value);
});

Then(/^I should see the '(.*)' error message below '(.*)' field in '(.*)' form$/, async(text, field, form) => {
    await helper.verifyErrorMessage(form, field, "id", text);
});

When(/^I enter the following combinations in '(.*)' field in '(.*)' form and should see the relevant error message$/, async(field, form, data) => {
    for(let password of data.rawTable){
        await helper.enterValueInForm(form, field, "name", password[0]);
        await helper.verifyErrorMessage(form, field, "id", password[1]);
    }
});

Then(/^I should see the '(.*)' button in '(.*)' form is (enabled|disabled)$/, async(btnText, form, btnDisabled) => {
    let btnStatus = (btnDisabled === 'disabled') ? "true" : null;
    await helper.verifyButtonDisabled(form, btnText, btnStatus);
});

Then(/^I click the '(.*)' button in '(.*)' form$/, async(btnText, form) => {
    await helper.clickButtonByText(form, btnText);
});
