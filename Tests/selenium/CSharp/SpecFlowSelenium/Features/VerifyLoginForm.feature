Feature: Verify the login form of Caregiver Tracker

  Scenario: Verify whether the required error message is displayed when fields are left blank or invalid in login form
    Given I open Caregiver Tracker website
    When I enter '' in 'Email' field in login form
    Then I should see the 'Email field is required' error message below 'Email' field in login form
    When I enter '' in 'Password' field in login form
    Then I should see the 'Password field is required' error message below 'Password' field in login form
    When I enter 'abc' in 'Email' field in login form
    Then I should see the 'Please enter a valid email' error message below 'Email' field in login form
    Then I should see the 'Log me In!' button in login form is disabled

  Scenario: 'Log me In!' button should be enabled if all required fields are given valid values
    Given I open Caregiver Tracker website
    When I enter 'abc@gmail.com' in 'Email' field in login form
    And I enter 'abcABC123@' in 'Password' field in login form
    Then I should see the 'Log me In!' button in login form is enabled
