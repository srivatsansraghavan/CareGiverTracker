Feature: Verify the first time user modal

  Scenario: Sign up and add role as Infant
    Given I open Caregiver Tracker website
    When I enter 'abc@gmail.com' in 'Email' field in 'signup' form
    And I enter 'abcABC123@' in 'Password' field in 'signup' form
    And I enter 'abcABC123@' in 'Repeat Password' field in 'signup' form
    And I enter 'Caregiver' in 'Full Name' field in 'signup' form
    And I get label text of 'Add Verify' field in 'signup' form and enter 'correct value'
    Then I should see the 'Sign me Up!' button in 'signup' form is enabled
    When I click the 'Sign me Up!' button in 'signup' form
    And I see the Homepage and 'First time User' modal popup appears
    Then I should see the 'Save' button in 'firstlogin' form is disabled
    When I select 'Infant' in 'Care Taken Of' dropdown field in 'firstlogin' form
    And I enter 'Tvishi' in 'Care Taken Name' field in 'firstlogin' form
    And I enter '2022-12-08' in 'Care Taken DOB' field in 'firstlogin' form
    And I select 'Female' in 'Care Taken Gender' dropdown field in 'firstlogin' form
    And I should see the 'Save' button in 'firstlogin' form is enabled
    When I click the 'Save' button in 'firstlogin' form
    Then I should see the 'Start Feed' button in 'Homepage'
    When I click the 'Logout' button in 'Homepage'

  Scenario: Sign up, click Later in First time user modal, Login and add role as Child
    Given I open Caregiver Tracker website
    When I enter 'def@gmail.com' in 'Email' field in 'signup' form
    And I enter 'defDEF123@' in 'Password' field in 'signup' form
    And I enter 'defDEF123@' in 'Repeat Password' field in 'signup' form
    And I enter 'Caregiver A' in 'Full Name' field in 'signup' form
    And I get label text of 'Add Verify' field in 'signup' form and enter 'correct value'
    Then I should see the 'Sign me Up!' button in 'signup' form is enabled
    When I click the 'Sign me Up!' button in 'signup' form
    Then I see the Homepage and 'First time User' modal popup appears
    Then I should see the 'Save' button in 'firstlogin' form is disabled
    When I click the 'Later' button in 'firstlogin' form
    Then I should see the 'Log me In!' button in 'login' form
    When I enter 'def@gmail.com' in 'Email' field in 'login' form
    And I enter 'defDEF123@' in 'Password' field in 'login' form
    And I click the 'Log me In!' button in 'login' form
    Then I see the Homepage and 'First time User' modal popup appears
    When I select 'Child' in 'Care Taken Of' dropdown field in 'firstlogin' form
    And I enter 'Sadhvi' in 'Care Taken Name' field in 'firstlogin' form
    And I enter '2015-08-21' in 'Care Taken DOB' field in 'firstlogin' form
    And I select 'Female' in 'Care Taken Gender' dropdown field in 'firstlogin' form
    And I should see the 'Save' button in 'firstlogin' form is enabled
    When I click the 'Save' button in 'firstlogin' form
    Then I should see the 'Start Feed' button in 'Homepage'
    When I click the 'Logout' button in 'Homepage'
