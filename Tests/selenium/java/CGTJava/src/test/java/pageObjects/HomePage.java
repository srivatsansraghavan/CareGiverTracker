package pageObjects;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import support.FormHelper;

public class HomePage {
	
	public HomePage(WebDriver driver) {
		PageFactory.initElements(driver, this);
	}
	
	@FindBy(css=".modal-dialog") WebElement firstLoginModal;
	@FindBy(css=".modal-title") WebElement firstLoginModalTitle;
	@FindBy(xpath="//button[contains(text(), 'Save')]") WebElement saveBtn;
	@FindBy(xpath="//button[contains(text(), 'Later')]") WebElement laterBtn;
	@FindBy(xpath="//button[contains(text(), 'Logout')]") WebElement logoutBtn;
	@FindBy(xpath="//button[contains(text(), 'Start Feed')]") WebElement startFeedBtn;
	@FindBy(name="care-taken-of") WebElement careTakenOf;
	@FindBy(name="care-taken-name") WebElement careTakenName;
	@FindBy(name="care-taken-dob") WebElement careTakenDOB;
	@FindBy(name="care-taken-gender") WebElement careTakenGender;
	
	public void verifyModalExists(String modalHeader) {
		Assert.assertTrue(firstLoginModal.isDisplayed());
		String actualModalHeader = firstLoginModalTitle.getText();
		Assert.assertEquals(modalHeader, actualModalHeader);
	}
	
	public void buttonDisabled(String btnText) {
		if(btnText.equals("Save")) Assert.assertEquals("true", saveBtn.getAttribute("disabled"));
	}
	
	public void buttonEnabled(String btnText) {
		if(btnText.equals("Save")) Assert.assertEquals(null, saveBtn.getAttribute("disabled"));
	}
	
	public void clickButtonInFirstLogin(String btnText) {
		if(btnText.equals("Save")) saveBtn.click();
		if(btnText.equals("Later")) laterBtn.click();
	}
	
	public void clickButtonInHomePage(String btnText) {
		if(btnText.equals("Logout")) logoutBtn.click();
	}
	
	public void buttonVisibleInHomePage(String btnText) {
		if(btnText.equals("Start Feed")) Assert.assertTrue(startFeedBtn.isDisplayed());
	}
	
	public void selectDropdownInFirstLogin(String fieldName, String option) {
		if(fieldName.equals("Care Taken Of")) FormHelper.selectOptionInDropdown(careTakenOf, option);
		if(fieldName.equals("Care Taken Gender")) FormHelper.selectOptionInDropdown(careTakenGender, option);
	}
	
	public void enterValueInFirstLogin(String fieldName, String fieldValue) {
		if(fieldName.equals("Care Taken Name")) FormHelper.enterValueInField(careTakenName, fieldValue);
		if(fieldName.equals("Care Taken DOB")) FormHelper.enterValueInField(careTakenDOB, fieldValue);
	}
}