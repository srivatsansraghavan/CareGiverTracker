using BoDi;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using TechTalk.SpecFlow;
using WebDriverManager.DriverConfigs.Impl;

namespace SpecFlowSelenium.Hooks
{
    [Binding]
    public class Hooks
    {

        [BeforeFeature]
        public static void CreateDriver(IObjectContainer container)
        {
            new WebDriverManager.DriverManager().SetUpDriver(new ChromeConfig());
            ChromeDriver driver = new ChromeDriver();
            container.RegisterInstanceAs<IWebDriver>(driver);
        }

        [AfterFeature]
        public static void DestroyDriver(IObjectContainer container)
        {
            IWebDriver driver = container.Resolve<IWebDriver>();
            driver.Close();
            driver.Dispose();
        }
    }
}
