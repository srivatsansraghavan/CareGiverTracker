Feature: Verify the signup form of Caregiver Tracker

  Scenario: Verify whether the required error message is displayed when fields are left blank
    Given I open Caregiver Tracker website
    When I enter '' in 'Email' field
    Then I should see the 'Email field is required' error message below 'Email' field
    When I enter '' in 'Password' field
    Then I should see the 'Password field is required' error message below 'Password' field
    When I enter '' in 'Repeat Password' field
    Then I should see the 'Repeat Password field is required' error message below 'Repeat Password' field
    When I enter '' in 'Full Name' field
    Then I should see the 'Full Name field is required' error message below 'Full Name' field
    When I enter '' in 'Add Verify' field
    Then I should see the 'Adding numbers is required' error message below 'Add Verify' field
