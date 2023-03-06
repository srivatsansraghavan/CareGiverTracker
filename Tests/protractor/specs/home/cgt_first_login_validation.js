const { faker } = require('@faker-js/faker');
let email1 = faker.internet.email();
let email2 = faker.internet.email();
let fullName1 = faker.name.firstName() + ' ' + faker.name.lastName();
let fullName2 = faker.name.firstName() + ' ' + faker.name.lastName();

describe('validate first time user modal of Caregiver Tracker landing page', function() {
    beforeAll(async function() {
        await browser.get(browser.baseUrl);
        await browser.driver.manage().window().maximize();
    });

    it('should display first time user modal dialog when Sign me Up! button is clicked and should allow saving role', async function() {
        await element(by.name('signUpEmail')).sendKeys(email1);
        await element(by.name('signUpPassword')).sendKeys('Abc1234@');
        await element(by.name('signUpRepeatPassword')).sendKeys('Abc1234@');
        await element(by.name('signUpFullName')).sendKeys(fullName1);
        const addElement = await element(by.css('label[for="signUpAddVerify"]')).getText();
        const splitAddElement = addElement.split('+');
        const leftSide = parseInt(splitAddElement[0].trim());
        const rightSide = parseInt(splitAddElement[1].trim());
        const sumSide = leftSide + rightSide;
        await element(by.name('signUpAddVerify')).sendKeys(sumSide);
        await element(by.buttonText('Sign me Up!')).click();
        expect(await element(by.className('modal-dialog')).isDisplayed()).toEqual(true);
        expect(await element(by.className('modal-title')).getText()).toEqual('First time user?');
        let modalFooterElem = await element(by.css('.modal-footer'));
        expect(await modalFooterElem.element(by.buttonText('Save')).isEnabled()).toBe(false);
        let modalBodyElem = await element(by.css('.modal-body'));
        await modalBodyElem.element(by.id('care-taken-of')).element(by.cssContainingText('option', 'Child')).click();
        await modalBodyElem.element(by.id('care-taken-name')).sendKeys('Tvishi');
        await modalBodyElem.element(by.id('care-taken-dob')).sendKeys('2022-12-08');
        await modalBodyElem.element(by.id('care-taken-gender')).element(by.cssContainingText('option', 'Female')).click();
        expect(await modalFooterElem.element(by.buttonText('Save')).isEnabled()).toBe(true);
        await modalFooterElem.element(by.buttonText('Save')).click();
        //await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.cssContainingText('.role-addition-toast', 'Role Addition'))), 10000);
        //await element(by.css('.role-addition-toast')).element(by.className('btn-close')).click();
        //await browser.waitForAngularEnabled(true);
        await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.buttonText('Logout'))), 5000);
        await element(by.buttonText('Logout')).click();
        expect(await element(by.css('input[name="signUpEmail"]')).isDisplayed()).toBe(true);
    });

    it('should display first time user modal dialog when Sign me Up! button is clicked, Later is clicked which logs out and login again to add role', async function() {
        await element(by.name('signUpEmail')).sendKeys(email2);
        await element(by.name('signUpPassword')).sendKeys('Abc1234@');
        await element(by.name('signUpRepeatPassword')).sendKeys('Abc1234@');
        await element(by.name('signUpFullName')).sendKeys(fullName2);
        const addElement = await element(by.css('label[for="signUpAddVerify"]')).getText();
        const splitAddElement = addElement.split('+');
        const leftSide = parseInt(splitAddElement[0].trim());
        const rightSide = parseInt(splitAddElement[1].trim());
        const sumSide = leftSide + rightSide;
        await element(by.name('signUpAddVerify')).sendKeys(sumSide);
        await element(by.buttonText('Sign me Up!')).click();
        expect(await element(by.className('modal-dialog')).isDisplayed()).toEqual(true);
        expect(await element(by.className('modal-title')).getText()).toEqual('First time user?');
        let modalFooterElem = await element(by.css('.modal-footer'));
        expect(await modalFooterElem.element(by.buttonText('Later')).isEnabled()).toBe(true);
        await modalFooterElem.element(by.buttonText('Later')).click();
        expect(await element(by.css('input[name="loginEmail"]')).isDisplayed()).toBe(true);
        await element(by.css('input[name="loginEmail"]')).sendKeys(email2);
        await element(by.css('input[name="loginPassword"]')).sendKeys('Abc1234@');
        await element(by.buttonText('Log me In!')).click();
        let modalBodyElem = await element(by.css('.modal-body'));
        await modalBodyElem.element(by.id('care-taken-of')).element(by.cssContainingText('option', 'Child')).click();
        await modalBodyElem.element(by.id('care-taken-name')).sendKeys('Tvishi');
        await modalBodyElem.element(by.id('care-taken-dob')).sendKeys('2022-12-08');
        await modalBodyElem.element(by.id('care-taken-gender')).element(by.cssContainingText('option', 'Female')).click();
        expect(await modalFooterElem.element(by.buttonText('Save')).isEnabled()).toBe(true);
        await modalFooterElem.element(by.buttonText('Save')).click();
        //await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.cssContainingText('.role-addition-toast', 'Role Addition'))), 10000);
        //await element(by.css('.role-addition-toast')).element(by.className('btn-close')).click();
        //await browser.waitForAngularEnabled(true);
        await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.buttonText('Start Feed'))), 5000);
        await element(by.buttonText('Start Feed')).click();
    });
});