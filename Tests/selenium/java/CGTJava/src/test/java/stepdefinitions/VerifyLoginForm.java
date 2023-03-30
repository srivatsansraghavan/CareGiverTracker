package stepdefinitions;

import io.cucumber.java.en.*;
import pageObjects.MainPage;
import support.FormHelper;

public class VerifyLoginForm {
    MainPage mPage = new MainPage(FormHelper.getDriver());
	
	@Given("I open Caregiver Tracker website")
	public void openCGT() {
		 FormHelper.OpenBrowser("http://localhost:4200");
	}
	
	@When("I enter {string} in {string} field in login form")
	public void enterFieldValue(String value, String fieldName) {
			mPage.enterValueInLoginForm(fieldName, value);
	}
	
	@Then("I should see the {string} error message below {string} field in login form")
	public void verifyErrorMessage(String errorMsg, String fieldName) {
			mPage.verifyErrorInLoginForm(fieldName, errorMsg);
	}
	
	@Then("I should see the Log me In! button in login form is disabled")
	public void verifyButtonDisabled() {
	    mPage.VerifyLoginButtonDisabled();
	}
	
	@Then("I should see the Log me In! button in login form is enabled")
	public void verifyButtonEnabled() {
	    mPage.VerifyLoginButtonEnabled();
	}
	
	@When("I click the Log me In! button in login form")
	public void clickLogMeInButton() {
		mPage.clickButton("Log me In!");
	}
	
	@When("I should see the Log me In! button in login form")
	public void logMeInButtonVisible() {
		mPage.buttonVisible("Log me In!");
	}

}
