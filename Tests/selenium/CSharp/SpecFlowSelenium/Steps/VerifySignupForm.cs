using OpenQA.Selenium;
using SpecFlowSelenium.Pages;
using TechTalk.SpecFlow;

namespace SpecFlowSelenium.Steps
{
    [Binding]
    public class VerifySignupForm : TechTalk.SpecFlow.Steps
    {
        MainPage mainpage;
        public VerifySignupForm(IWebDriver webdriver)
        {
            mainpage = new MainPage(webdriver);
        }
        
        [When(@"I enter '(.*)' in '(.*)' field in signup form")]
        public void IEnterValueInSignupForm(string value, string fieldName)
        {
            mainpage.EnterValueInSignupForm(fieldName, value);
        }

        [Then(@"I should see the '(.*)' error message below '(.*)' field in signup form")]
        public void ISeeErrorMessageInSignupForm(string errorMsg, string fieldName)
        {
            mainpage.VerifyErrorInSignupForm(fieldName, errorMsg);
        }

        [Then(@"I should see the Sign me Up! button in signup form is disabled")]
        public void IShouldSeeTheSignUpButtonInFormIsDisabled()
        {
            mainpage.VerifySignUpButtonDisabled();
        }

        [Then(@"I should see the Sign me Up! button in signup form is enabled")]
        public void IShouldSeeTheSignUpButtonInFormIsEnabled()
        {
            mainpage.VerifySignUpButtonEnabled();
        }

        [When(@"I enter the following combinations in '(.*)' field in signup form and should see the relevant error message")]
        public void IEnterCombinationsInSignupForm(string fieldName, Table data)
        {
            foreach (var row in data.Rows)
            {
                mainpage.EnterValueInSignupForm(fieldName, row[0]);
                mainpage.VerifyErrorInSignupForm(fieldName, row[1]);
            }
        }

        [When(@"I enter different passwords in Password field and Repeat Password field in signup form and should see the error message")]
        public void IEnterDifferentPasswordInSignupForm()
        {
            mainpage.EnterValueInSignupForm("Password", "abcA123@");
            mainpage.EnterValueInSignupForm("Repeat Password", "abcA123!");
            mainpage.VerifyErrorInSignupForm("Repeat Password", "Password and Repeat Password should be the same");
        }

        [When(@"I get label text of Add Verify field in signup form and enter '(.*)'")]
        public void IGetLabelTextAddVerifyAndEnterSum(string valueType)
        {
            int sumNumbers = mainpage.GetSumOfAddVerifyNumbers();
            if (valueType.Equals("incorrect value"))
            {
                sumNumbers--;
            }
            mainpage.EnterValueInSignupForm("Add Verify", sumNumbers.ToString());
        }
    }
}
