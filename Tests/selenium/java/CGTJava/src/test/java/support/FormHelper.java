package support;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class FormHelper {
	private static WebDriver driver;
	
	public static WebDriver startDriver() {
		driver = new ChromeDriver();
		return driver;
	}
	
	public static WebDriver getDriver() {
		return driver;
	}
	
	public static void OpenBrowser(String url) {
		driver.get(url);
	}
	
	public static void maximiseBrowser(WebDriver driver) {
		driver.manage().window().maximize();
	}
	
	public static void teardown() {
		//driver.close();
		driver.quit();
	}
	
	public static void enterValueInField(WebElement elem, String value) {
		elem.clear();
		elem.click();
		elem.sendKeys(value, Keys.TAB);
	}
	
	public static void selectOptionInDropdown(WebElement elem, String option) {
		Select selectElem = new Select(elem);
		selectElem.selectByVisibleText(option);
	}
	
}