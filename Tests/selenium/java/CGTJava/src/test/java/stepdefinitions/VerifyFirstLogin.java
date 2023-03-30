package stepdefinitions;

import io.cucumber.java.en.*;
import pageObjects.HomePage;
import support.FormHelper;

public class VerifyFirstLogin {
	
	HomePage hPage = new HomePage(FormHelper.getDriver());
	
	@When("I see the Homepage and {string} modal popup appears")
	public void verifyFirstLoginModalExists(String modalHeader) {
		hPage.verifyModalExists(modalHeader);
	}
	
	@Then("I should see the {string} button in firstlogin form is disabled")
	public void isFirstLoginButtonDisabled(String btnText) {
		hPage.buttonDisabled(btnText);
	}
	
	@Then("I should see the {string} button in firstlogin form is enabled")
	public void isFirstLoginButtonEnabled(String btnText) {
		hPage.buttonEnabled(btnText);
	}
	
	@When("I click the {string} button in firstlogin form")
	public void clickFirstLoginButton(String btnText) {
		hPage.clickButtonInFirstLogin(btnText);
	}
	
	@When("I click the {string} button in homepage")
	public void clickHomePageButton(String btnText) {
		hPage.clickButtonInHomePage(btnText);
	}
	
	@Then("I should see the {string} button in homepage")
	public void homePageButtonVisible(String btnText) {
		hPage.buttonVisibleInHomePage(btnText);
	}
	
	@When("I select {string} in {string} dropdown field in firstlogin form")
	public void selectFirstLoginDropdown(String option, String fieldName) {
		hPage.selectDropdownInFirstLogin(fieldName, option);
	}
	
	@When("I enter {string} in {string} field in firstlogin form")
	public void enterFirstLoginValue(String value, String fieldName) {
		hPage.enterValueInFirstLogin(fieldName, value);
	}
}