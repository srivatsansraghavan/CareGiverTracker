package pageObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import java.time.Duration;
import org.junit.Assert;
import support.FormHelper;

public class MainPage {
	WebDriver pageDriver;
	
	public MainPage(WebDriver driver) {
		PageFactory.initElements(driver, this);
		this.pageDriver = driver;
	}
	
	@FindBy(name="loginEmail") WebElement loginEmail;
	@FindBy(name="loginPassword") WebElement loginPassword;
	@FindBy(id="loginEmailError") WebElement loginEmailError;
	@FindBy(id="loginPasswordError") WebElement loginPasswordError;
	@FindBy(xpath="//button[contains(text(), 'Log me In!')]") WebElement loginBtn;
	@FindBy(name="signUpEmail")	WebElement signUpEmail;
	@FindBy(name="signUpPassword")	WebElement signUpPassword;
	@FindBy(name="signUpRepeatPassword") WebElement signUpRepeatPassword;
	@FindBy(name="signUpFullName")	WebElement signUpFullName;
	@FindBy(name="signUpAddVerify")	WebElement signUpAddVerify;
	@FindBy(id="signUpEmailError")	WebElement signUpEmailError;
	@FindBy(id="signUpPasswordError") WebElement signUpPasswordError;
	@FindBy(id="signUpRepeatPasswordError")	WebElement signUpRepeatPasswordError;
	@FindBy(id="signUpFullNameError") WebElement signUpFullNameError;
	@FindBy(id="signUpAddVerifyError") WebElement signUpAddVerifyError;
	@FindBy(xpath="//button[contains(text(), 'Sign me Up!')]") WebElement signUpBtn;
	@FindBy(css="label[for=signUpAddVerify]") WebElement signUpAddVerifyText;
	
	public void enterValueInLoginForm(String fieldName, String fieldValue) {
		if(fieldName.equals("Email")) FormHelper.enterValueInField(loginEmail, fieldValue);
		if(fieldName.equals("Password")) FormHelper.enterValueInField(loginPassword, fieldValue);
	}
	
	public void verifyErrorInLoginForm(String fieldName, String errorMsg) {
		String actualErrorMsg = "";
		if(fieldName.equals("Email")) actualErrorMsg = loginEmailError.getText();
		if(fieldName.equals("Password")) actualErrorMsg = loginPasswordError.getText();
		Assert.assertEquals(errorMsg, actualErrorMsg);
	}
	
	public void VerifyLoginButtonDisabled() {
		Assert.assertEquals("true", loginBtn.getAttribute("disabled"));
	}
	
	public void VerifyLoginButtonEnabled() {
		Assert.assertEquals(null, loginBtn.getAttribute("disabled"));
	}
	
	public void enterValueInSignupForm(String fieldName, String fieldValue) {
		if(fieldName.equals("Email")) FormHelper.enterValueInField(signUpEmail, fieldValue);
		if(fieldName.equals("Password")) FormHelper.enterValueInField(signUpPassword, fieldValue);
		if(fieldName.equals("Repeat Password")) FormHelper.enterValueInField(signUpRepeatPassword, fieldValue);
		if(fieldName.equals("Full Name")) FormHelper.enterValueInField(signUpFullName, fieldValue);
		if(fieldName.equals("Add Verify")) FormHelper.enterValueInField(signUpAddVerify, fieldValue);
	}
		
	public void verifyErrorInSignupForm(String fieldName, String errorMsg) {
		String actualErrorMsg = "";
		if(fieldName.equals("Email")) actualErrorMsg = signUpEmailError.getText();
		if(fieldName.equals("Password")) actualErrorMsg = signUpPasswordError.getText();
		if(fieldName.equals("Repeat Password")) actualErrorMsg = signUpRepeatPasswordError.getText();
		if(fieldName.equals("Full Name")) actualErrorMsg = signUpFullNameError.getText();
		if(fieldName.equals("Add Verify")) actualErrorMsg = signUpAddVerifyError.getText();
		Assert.assertEquals(errorMsg, actualErrorMsg);
	}
	
	public void VerifySignupButtonDisabled() {
		String signUpBtnDisabled = signUpBtn.getAttribute("disabled");
		Assert.assertEquals("true", signUpBtnDisabled);
	}
	
	public void VerifySignupButtonEnabled() {
		String signUpBtnDisabled = signUpBtn.getAttribute("disabled");
		Assert.assertEquals(null, signUpBtnDisabled);
	}
	
	public int getSumOfAddVerifyNumbers() {
		String addVerifyText = signUpAddVerifyText.getText();
		String[] splitAddVerify = addVerifyText.split("\\+");
		int sumAddVerify = Integer.parseInt(splitAddVerify[0].trim()) + Integer.parseInt(splitAddVerify[1].replace("=", "").trim());
		return sumAddVerify;
	}
	
	public void clickButton(String btnText) {
		if(btnText.equals("Sign me Up!")) {
			pageDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
			signUpBtn.click();
		}
		if(btnText.equals("Log me In!")) {
			pageDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
			loginBtn.click();
		}
	}
	
	public void buttonVisible(String btnText) {
		if(btnText.equals("Sign me Up!")) Assert.assertTrue(signUpBtn.isDisplayed());
		if(btnText.equals("Log me In!")) Assert.assertTrue(loginBtn.isDisplayed());
	}
}