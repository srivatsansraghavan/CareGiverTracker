package stepdefinitions;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.*;
import pageObjects.MainPage;
import support.FormHelper;

public class VerifySignupForm {
	MainPage mPage = new MainPage(FormHelper.getDriver());

	@When("I enter {string} in {string} field in signup form")
	public void enterFieldValue(String value, String fieldName) {
		mPage.enterValueInSignupForm(fieldName, value);
	}
	
	@Then("I should see the {string} error message below {string} field in signup form")
	public void verifyErrorMessage(String errorMsg, String fieldName) {
		mPage.verifyErrorInSignupForm(fieldName, errorMsg);
	}
	
	@Then("I should see the Sign me Up! button in signup form is disabled")
	public void verifyButtonDisabled() {
	    mPage.VerifySignupButtonDisabled();
	}
	
	@Then("I should see the Sign me Up! button in signup form is enabled")
	public void verifyButtonEnabled() {
	    mPage.VerifySignupButtonEnabled();
	}
	
	@When("I enter the following combinations in {string} field in signup form and should see the relevant error message")
	public void enterAndVerifyError(String fieldName, DataTable data) {
		for(int i=0; i < data.height(); i++) {
			mPage.enterValueInSignupForm(fieldName, data.cell(i, 0));
			mPage.verifyErrorInSignupForm(fieldName, data.cell(i,  1));
		}	
	}
	
	@When("I enter different passwords in Password field and Repeat Password field in signup form")
	public void enterDifferentPasswords() {
		mPage.enterValueInSignupForm("Password", "abcA123@");
		mPage.enterValueInSignupForm("Repeat Password", "abcA123!");
		mPage.verifyErrorInSignupForm("Repeat Password", "Password and Repeat Password should be the same");
	}
	
	@When("I get label text of Add Verify field in signup form and enter {string}")
	public void getAddVerifyNumbers(String entryType) {
		int sumNumbers = mPage.getSumOfAddVerifyNumbers();
		if(entryType.equals("incorrect value")) {
			sumNumbers--;
		}
		mPage.enterValueInSignupForm("Add Verify", Integer.toString(sumNumbers));
	}
	
	@When("I click the Sign me Up! button in signup form")
	public void clickSignMeUpButton() {
		mPage.clickButton("Sign me Up!");
	}
}
