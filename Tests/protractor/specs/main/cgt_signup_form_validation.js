let sumSide;

describe('validate signup form of Caregiver Tracker landing page', function() {

    beforeAll(async function() {
        await browser.get(browser.baseUrl);
        await browser.driver.manage().window().maximize();
    });

    beforeEach(async function() {
        await element(by.name('signUpEmail')).clear();
        await element(by.name('signUpPassword')).clear();
        await element(by.name('signUpRepeatPassword')).clear();
        await element(by.name('signUpFullName')).clear();
        await element(by.name('signUpAddVerify')).clear();
    });

    it('should load the main page', async function () {
        expect(await browser.getTitle()).toEqual('Caregiver Tracker');
    });
    
    it('should throw error message for leaving email blank', async function() {
        await element(by.name('signUpEmail')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('signUpEmailError')).getText()).toEqual('Email field is required');
    });

    it('should throw error message for entering invalid email id', async function() {
        await element(by.name('signUpEmail')).sendKeys('notAnEmailId');
        expect(await element(by.id('signUpEmailError')).getText()).toEqual('Please enter a valid email');
    });

    it('should throw error message for leaving password blank', async function() {
        await element(by.name('signUpPassword')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('signUpPasswordError')).getText()).toEqual('Password field is required');
    });

    it('should throw error message for improper password', async function() {
        let passwordError = 'Password should have atleast one uppercase, lowercase, number and special character';
        await element(by.name('signUpPassword')).sendKeys('abcd');
        expect(await element(by.id('signUpPasswordError')).getText())
        .toEqual(passwordError);
        await element(by.name('signUpPassword')).clear().sendKeys('abcd123');
        expect(await element(by.id('signUpPasswordError')).getText())
        .toEqual(passwordError);
        await element(by.name('signUpPassword')).clear().sendKeys('ABCD123');
        expect(await element(by.id('signUpPasswordError')).getText())
        .toEqual(passwordError);
        await element(by.name('signUpPassword')).clear().sendKeys('ABCDabcd');
        expect(await element(by.id('signUpPasswordError')).getText())
        .toEqual(passwordError);
        await element(by.name('signUpPassword')).clear().sendKeys('123');
        expect(await element(by.id('signUpPasswordError')).getText())
        .toEqual(passwordError);
        await element(by.name('signUpPassword')).clear().sendKeys('ABcd123');
        expect(await element(by.id('signUpPasswordError')).getText())
        .toEqual(passwordError);
        await element(by.name('signUpPassword')).clear().sendKeys('ABcd123@');
        expect(await element(by.id('signUpPasswordError')).isPresent())
        .toEqual(false);
    });

    it('should throw error message for leaving Repeat Password blank', async function() {
        await element(by.name('signUpRepeatPassword')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('signUpRepeatPasswordError')).getText()).toEqual('Repeat Password field is required');
    });

    it('should throw error message for not having same Password and Repeat Password', async function() {
        await element(by.name('signUpPassword')).sendKeys('ABcd123@');
        await element(by.name('signUpRepeatPassword')).sendKeys('ABcd123');
        expect(await element(by.id('signUpRepeatPasswordError')).getText()).toEqual('Password and Repeat Password should be the same');
        await element(by.name('signUpRepeatPassword')).clear().sendKeys('ABcd123@');
        expect(await element(by.id('signUpRepeatPasswordError')).isPresent()).toEqual(false);
    });

    it('should throw error message for leaving Full Name blank', async function() {
        await element(by.name('signUpFullName')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('signUpFullNameError')).getText()).toEqual('Full Name field is required');
    });

    it('should throw error message for an improper Full Name', async function() {
        await element(by.name('signUpFullName')).sendKeys('Full_Name');
        expect(await element(by.id('signUpFullNameError')).getText()).toEqual('Full name cannot have number or special characters');
        await element(by.name('signUpFullName')).clear().sendKeys('Full 1Name');
        expect(await element(by.id('signUpFullNameError')).getText()).toEqual('Full name cannot have number or special characters');
        await element(by.name('signUpFullName')).clear().sendKeys('Full Name');
        expect(await element(by.id('signUpFullNameError')).isPresent()).toEqual(false);
    });

    it('should throw error message for leaving Verify Add blank', async function() {
        await element(by.name('signUpAddVerify')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('signUpAddVerifyError')).getText()).toEqual('Adding numbers is required');
    });

    it('should throw error message for an improper addition of numbers', async function() {
        const addElement = await element(by.css('label[for="signUpAddVerify"]')).getText();
        const splitAddElement = addElement.split('+');
        const leftSide = parseInt(splitAddElement[0].trim());
        const rightSide = parseInt(splitAddElement[1].trim());
        sumSide = leftSide + rightSide;
        await element(by.name('signUpAddVerify')).sendKeys(sumSide-1);
        expect(await element(by.id('signUpAddVerifyError')).getText()).toEqual('Not properly added!');
        await element(by.name('signUpAddVerify')).clear().sendKeys(sumSide);
        expect(await element(by.id('signUpAddVerifyError')).isPresent()).toEqual(false);
    });

    it('should keep the Sign me Up! button enabled if all the required fields are filled', async function() {
        await element(by.name('signUpEmail')).sendKeys('def@gmail.com');
        await element(by.name('signUpPassword')).sendKeys('Abc1234@');
        await element(by.name('signUpRepeatPassword')).sendKeys('Abc1234@');
        await element(by.name('signUpFullName')).sendKeys('Caregiver');
        await element(by.name('signUpAddVerify')).sendKeys(sumSide);
        expect(await element(by.buttonText('Sign me Up!')).isEnabled()).toEqual(true);
    });
});