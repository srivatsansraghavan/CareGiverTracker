using OpenQA.Selenium;
using SpecFlowSelenium.Pages;
using TechTalk.SpecFlow;

namespace SpecFlowSelenium.Steps
{
    [Binding]
    public class VerifyLoginForm : TechTalk.SpecFlow.Steps
    {
        MainPage mainpage;
        public VerifyLoginForm(IWebDriver webdriver)
        {
            mainpage = new MainPage(webdriver);
        }
        [Given(@"I open Caregiver Tracker website")]
        public void IOpenCaregiverTrackerWebsite()
        {
            mainpage.openCGT("http://localhost:4200");
        }
                
        [When(@"I enter '(.*)' in '(.*)' field in login form")]
        public void IEnterValueInLoginForm(string value, string fieldName)
        {
            mainpage.EnterValueInLoginForm(fieldName, value);
        }

        [Then(@"I should see the '(.*)' error message below '(.*)' field in login form")]
        public void ISeeErrorMessageInLoginForm(string errorMsg, string fieldName)
        {
            mainpage.VerifyErrorInLoginForm(fieldName, errorMsg);
        }
        
        [Then(@"I should see the 'Log me In!' button in login form is disabled")]
        public void IShouldSeeTheButtonInFormIsDisabled()
        {
            mainpage.VerifyLogInButtonDisabled();
        }
        
        [Then(@"I should see the 'Log me In!' button in login form is enabled")]
        public void IShouldSeeTheButtonInFormIsEnabled()
        {
            mainpage.VerifyLogInButtonEnabled();
        }
    }
}
