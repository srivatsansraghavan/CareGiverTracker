using OpenQA.Selenium;

namespace SpecFlowSelenium.Support
{
    class Helper
    {
        public static void EnterValue(IWebElement elem, string value)
        {
            elem.SendKeys(value);
            elem.SendKeys(Keys.Tab);
        }
    }
}
