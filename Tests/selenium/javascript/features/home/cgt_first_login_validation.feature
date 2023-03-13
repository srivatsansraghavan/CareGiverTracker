Feature: Verify the first time user modal

  Scenario: Sign up and add role as Child
    Given I open Caregiver Tracker website
    When I enter 'abc@gmail.com' in 'Email' field in 'signup' form
    And I enter 'abcABC123@' in 'Password' field in 'signup' form
    And I enter 'abcABC123@' in 'Repeat Password' field in 'signup' form
    And I enter 'Caregiver' in 'Full Name' field in 'signup' form
    And I get label text of 'Add Verify' field in 'signup' form and enter 'correct value'
    Then I should see the 'Sign me Up!' button in 'signup' form is enabled
    And I click the 'Sign me Up!' button in 'signup' form
    When I see the Homepage and 'First time User' modal popup appears
    Then I should see the 'Save' button in 'firstlogin' form is disabled
    And I enter 'Infant' in 'Care Taken Of' field in 'firstlogin' form
    And I enter 'Tvishi' in 'Care Taken Name' field in 'firstlogin' form
    And I enter '2022-12-08' in 'Care Taken DOB' field in 'firstlogin' form
    And I enter 'Female' in 'Care Taken Gender' field in 'firstlogin' form
    And I should see the 'Save' button in 'firstlogin' form is enabled
    When I click the 'Save' button in 'firstlogin' form
