using FluentAssertions;
using OpenQA.Selenium;
using SpecFlowSelenium.Support;
using System;

namespace SpecFlowSelenium.Pages
{
    class MainPage : BasePage
    {
        public IWebDriver driver;
        
        public MainPage(IWebDriver webdriver) : base(webdriver)
        {
            driver = webdriver;
        }


        public void EnterValueInLoginForm(string fieldName, string fieldValue)
        {
            if (fieldName.Equals("Email")) Helper.EnterValue(loginEmail, fieldValue);
            if (fieldName.Equals("Password")) Helper.EnterValue(loginPassword, fieldValue);
        }

        public void VerifyErrorInLoginForm(string fieldName, string errorMsg)
        {
            if (fieldName.Equals("Email")) loginEmailError.Text.Should().Be(errorMsg);
            if (fieldName.Equals("Password")) loginPasswordError.Text.Should().Be(errorMsg);
        }

        public void VerifyLogInButtonDisabled()
        {
            loginBtn.GetAttribute("disabled").Should().Be("true");
        }

        public void VerifyLogInButtonEnabled()
        {
            loginBtn.GetAttribute("disabled").Should().Be(null);
        }

        public void EnterValueInSignupForm(string fieldName, string fieldValue)
        {
            if (fieldName.Equals("Email")) Helper.EnterValue(signupEmail, fieldValue);
            if (fieldName.Equals("Password")) Helper.EnterValue(signupPassword, fieldValue);
            if (fieldName.Equals("Repeat Password")) Helper.EnterValue(signupRepeatPassword, fieldValue);
            if (fieldName.Equals("Full Name")) Helper.EnterValue(signupFullname, fieldValue);
            if (fieldName.Equals("Add Verify")) Helper.EnterValue(signupAddverify, fieldValue);
        }

        public void VerifyErrorInSignupForm(string fieldName, string errorMsg)
        {
            if (fieldName.Equals("Email")) signupEmailError.Text.Should().Be(errorMsg);
            if (fieldName.Equals("Password")) signupPasswordError.Text.Should().Be(errorMsg);
            if (fieldName.Equals("Repeat Password")) signupRepeatPasswordError.Text.Should().Be(errorMsg);
            if (fieldName.Equals("Full Name")) signupFullnameError.Text.Should().Be(errorMsg);
            if (fieldName.Equals("Add Verify")) signupAddverifyError.Text.Should().Be(errorMsg);
        }

        public void VerifySignUpButtonDisabled()
        {
            signupBtn.GetAttribute("disabled").Should().Be("true");
        }

        public void VerifySignUpButtonEnabled()
        {
            signupBtn.GetAttribute("disabled").Should().Be(null);
        }

        public int GetSumOfAddVerifyNumbers()
        {
            string addVerifyText = signupAddverifyText.Text;
            string[] splitAddVerify = addVerifyText.Split("+");
            int sumAddVerify = int.Parse(splitAddVerify[0].Trim()) + int.Parse(splitAddVerify[1].Replace("=", "").Trim());
            return sumAddVerify;
        }


        public IWebElement loginEmail => driver.FindElement(By.CssSelector("[name='loginEmail']"));
        public IWebElement loginEmailError => driver.FindElement(By.CssSelector("[id='loginEmailError']"));
        public IWebElement loginPassword => driver.FindElement(By.CssSelector("[name='loginPassword']"));
        public IWebElement loginPasswordError => driver.FindElement(By.CssSelector("[id='loginPasswordError']"));
        public IWebElement loginBtn => driver.FindElement(By.XPath("//button[contains(text(), 'Log me In!')]"));


        public IWebElement signupEmail => driver.FindElement(By.CssSelector("[name='signUpEmail']"));
        public IWebElement signupEmailError => driver.FindElement(By.CssSelector("[id='signUpEmailError']"));
        public IWebElement signupPassword => driver.FindElement(By.CssSelector("[name='signUpPassword']"));
        public IWebElement signupPasswordError => driver.FindElement(By.CssSelector("[id='signUpPasswordError']"));

        public IWebElement signupRepeatPassword => driver.FindElement(By.CssSelector("[name='signUpRepeatPassword']"));
        public IWebElement signupRepeatPasswordError => driver.FindElement(By.CssSelector("[id='signUpRepeatPasswordError']"));

        public IWebElement signupFullname => driver.FindElement(By.CssSelector("[name='signUpFullName']"));
        public IWebElement signupFullnameError => driver.FindElement(By.CssSelector("[id='signUpFullNameError']"));

        public IWebElement signupAddverify => driver.FindElement(By.CssSelector("[name='signUpAddVerify']"));
        public IWebElement signupAddverifyError => driver.FindElement(By.CssSelector("[id='signUpAddVerifyError']"));

        public IWebElement signupAddverifyText => driver.FindElement(By.CssSelector("label[for=signUpAddVerify]"));
        public IWebElement signupBtn => driver.FindElement(By.XPath("//button[contains(text(), 'Sign me Up!')]"));

    }
}
