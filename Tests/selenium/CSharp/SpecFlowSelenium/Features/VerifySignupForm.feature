Feature: Verify the signup form of Caregiver Tracker

  Scenario: Verify whether the required error message is displayed when fields are left blank in signup form
    Given I open Caregiver Tracker website
    When I enter '' in 'Email' field in signup form
    Then I should see the 'Email field is required' error message below 'Email' field in signup form
    When I enter '' in 'Password' field in signup form
    Then I should see the 'Password field is required' error message below 'Password' field in signup form
    When I enter '' in 'Repeat Password' field in signup form
    Then I should see the 'Repeat Password field is required' error message below 'Repeat Password' field in signup form
    When I enter '' in 'Full Name' field in signup form
    Then I should see the 'Full Name field is required' error message below 'Full Name' field in signup form
    When I enter '' in 'Add Verify' field in signup form
    Then I should see the 'Adding numbers is required' error message below 'Add Verify' field in signup form

  Scenario: Verify whether the required error message is displayed when invalid values are entered
    Given I open Caregiver Tracker website
    When I enter 'abc' in 'Email' field in signup form
    Then I should see the 'Please enter a valid email' error message below 'Email' field in signup form
    When I enter the following combinations in 'Password' field in signup form and should see the relevant error message
      | abc       | Password should have atleast one uppercase, lowercase, number and special character |
      | ABC       | Password should have atleast one uppercase, lowercase, number and special character |
      |       123 | Password should have atleast one uppercase, lowercase, number and special character |
      | abcABC    | Password should have atleast one uppercase, lowercase, number and special character |
      | abc123    | Password should have atleast one uppercase, lowercase, number and special character |
      | abcABC123 | Password should have atleast one uppercase, lowercase, number and special character |
      | abc@      | Password should have atleast one uppercase, lowercase, number and special character |
      | ABC@      | Password should have atleast one uppercase, lowercase, number and special character |
      |      123@ | Password should have atleast one uppercase, lowercase, number and special character |
      | abcABC@   | Password should have atleast one uppercase, lowercase, number and special character |
      | aA123@    | Password should have atleast one uppercase, lowercase, number and special character |
      | ABC@123@  | Password should have atleast one uppercase, lowercase, number and special character |
    When I enter different passwords in Password field and Repeat Password field in signup form and should see the error message
    When I enter the following combinations in 'Full Name' field in signup form and should see the relevant error message
      | Full_Name | Full name cannot have number or special characters |
      | Full1Name | Full name cannot have number or special characters |
    When I get label text of Add Verify field in signup form and enter 'incorrect value'
    Then I should see the 'Not properly added!' error message below 'Add Verify' field in signup form
    Then I should see the Sign me Up! button in signup form is disabled

  Scenario: 'Sign me Up!' button should be enabled if all required fields are given valid values
    Given I open Caregiver Tracker website
    When I enter 'abc@gmail.com' in 'Email' field in signup form
    And I enter 'abcABC123@' in 'Password' field in signup form
    And I enter 'abcABC123@' in 'Repeat Password' field in signup form
    And I enter 'Caregiver' in 'Full Name' field in signup form
    And I get label text of Add Verify field in signup form and enter 'correct value'
    Then I should see the Sign me Up! button in signup form is enabled
