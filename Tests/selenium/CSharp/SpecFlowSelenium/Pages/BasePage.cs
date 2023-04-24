using OpenQA.Selenium;

namespace SpecFlowSelenium.Pages
{
    public class BasePage
    {
        private readonly IWebDriver driver;

        public BasePage(IWebDriver webdriver)
        {
            driver = webdriver;
        }

         public void openCGT(string url)
        {
            driver.Navigate().GoToUrl(url);
        }

    }
}
