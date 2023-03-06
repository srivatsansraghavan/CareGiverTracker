describe('validate login form of Caregiver Tracker landing page', function() {

    beforeAll(async function() {
        await browser.get(browser.baseUrl);
        await browser.driver.manage().window().maximize();
    });

    beforeEach(async function() {
        await element(by.name('loginEmail')).clear();
        await element(by.name('loginPassword')).clear();
    });

    it('should load the main page', async function () {
        expect(await browser.getTitle()).toEqual('Caregiver Tracker');
    });
    
    it('should throw error message for leaving email blank', async function() {
        await element(by.name('loginEmail')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('loginEmailError')).getText()).toEqual('Email field is required');
    });

    it('should throw error message for entering invalid email id', async function() {
        await element(by.name('loginEmail')).sendKeys('notAnEmailId');
        expect(await element(by.id('loginEmailError')).getText()).toEqual('Please enter a valid email');
    });

    it('should throw error message for leaving password blank', async function() {
        await element(by.name('loginPassword')).sendKeys(protractor.Key.TAB);
        expect(await element(by.id('loginPasswordError')).getText()).toEqual('Password field is required');
    });

    it('should have a Log me In! button which should be disabled when either email or password is blank', async function() {
        expect(await element(by.buttonText('Log me In!')).isEnabled()).toEqual(false);
    });

    it('should enable the Log me In button when both email and password fields are valid', async function() {
        await element(by.name('loginEmail')).sendKeys('abc@gmail.com');
        await element(by.name('loginPassword')).sendKeys('Nastavirs@q123');
        expect(await element(by.buttonText('Log me In!')).isEnabled()).toEqual(true);
    });

    it('should throw a toaster and remain in the same page when incorrect email or password are entered', async function() {
        await element(by.name('loginEmail')).sendKeys('abc@gmail.com');
        await element(by.name('loginPassword')).sendKeys('Nastavirs@q23');
        await element(by.buttonText('Log me In!')).click();
        expect(await element(by.css('app-toasts')).isDisplayed()).toEqual(true);
        // console.log(await element(by.css('app-toasts > div.toast-body')).isDisplayed());
        // expect(await element(by.css('app-toasts')).element(by.className('toast-body')).getText()).toEqual('Incorrect password');
    });

    it('should throw a toaster and navigate to home page when correct email and password are entered', async function() {
        await element(by.name('loginEmail')).sendKeys('abc@gmail.com');
        await element(by.name('loginPassword')).sendKeys('Nastavirs@q123');
        await element(by.buttonText('Log me In!')).click();
        // expect(await element(by.className('toast-body')).isDisplayed()).toEqual(true);
        // expect(await element(by.className('toast-body')).getText()).toEqual('User signed in successfully!');
    });

});