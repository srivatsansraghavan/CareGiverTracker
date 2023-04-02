Feature: Verify the feeding tracker of Caregiver Tracker for Toddler

  Scenario Outline: Verify the options in Feeding tracker modal dialog for Toddler
    Given I open Caregiver Tracker website
    And I fetch a user who takes care of toddler and login
    Then I should see the 'Start Feed' button in 'Homepage'
    When I click the 'Start Feed' button in 'Homepage'
    Then I should see the 'Feed given to' modal dialog in 'Homepage'
    And I verify whether the following options are displayed for 'Feed Type' dropdown in 'feeding tracker' form
      | Breast Pump     |
      | Breast Milk     |
      | Formula feeding |
      | Normal food     |
      | Mashed food     |
      | Juices          |
      | Water           |
      | Drips           |
    When I select 'Breast Pump' in 'Feed Type' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Breast Pump Mode' dropdown in 'feeding tracker' form
      | Manual Pump     |
      | Electrical Pump |
    When I select 'Manual Pump' in 'Breast Pump Mode' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Breast side' dropdown in 'feeding tracker' form
      | Left Breast  |
      | Right Breast |
      | Both         |
    When I select 'Electrical Pump' in 'Breast Pump Mode' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Breast side' dropdown in 'feeding tracker' form
      | Left Breast  |
      | Right Breast |
      | Both         |
    When I select 'Breast Milk' in 'Feed Type' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Feed Mode' dropdown in 'feeding tracker' form
      | Pumped Milk |
      | Direct Feed |
    When I select 'Direct Feed' in 'Feed Mode' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Breast side' dropdown in 'feeding tracker' form
      | Left Breast  |
      | Right Breast |
      | Both         |
    When I select 'Pumped Milk' in 'Feed Mode' dropdown field in 'feeding tracker' form
    Then I should see the 'Choose pumped feed' field in 'feeding tracker' form
    When I select 'Formula feeding' in 'Feed Type' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Feed Mode' dropdown in 'feeding tracker' form
      | Feeding bottle |
      | Spoon          |
      | Other          |
    When I select 'Mashed food' in 'Feed Type' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Feed Mode' dropdown in 'feeding tracker' form
      | Self-feeding   |
      | Others feeding |
    When I select 'Juices' in 'Feed Type' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Feed Mode' dropdown in 'feeding tracker' form
      | Feeding bottle |
      | Spoon          |
      | Glass          |
    When I select 'Water' in 'Feed Type' dropdown field in 'feeding tracker' form
    Then I verify whether the following options are displayed for 'Feed Mode' dropdown in 'feeding tracker' form
      | Feeding bottle |
      | Spoon          |
      | Glass          |
    Then I click the 'Close' button in 'feeding tracker' form
    And I should see the 'Start Feed' button in 'Homepage'

  Scenario: Verify pump is tracked for toddler
    When I click the 'Start Feed' button in 'Homepage'
    Then I should see the 'Feed given to' modal dialog in 'Homepage'
    When I select 'Breast Pump' in 'Feed Type' dropdown field in 'feeding tracker' form
    And I select 'Electric Pump' in 'Breast Pump Mode' dropdown field in 'feeding tracker' form
    And I select 'Right Breast' in 'Breast side' dropdown field in 'feeding tracker' form
    Then I should see the 'Start Tracking' button in 'feeding tracker' form is enabled
    When I click the 'Start Tracking' button in 'feeding tracker' form
    Then I should see the 'Stop Tracking' button in 'feeding tracker' form
    When I wait for 5 seconds in 'feeding tracker' form
    And I click the 'Stop Tracking' button in 'feeding tracker' form
    Then I should see the 'Feed Quantity' field in 'feeding tracker' form
    When I enter '10' in 'Feed Quantity' field in 'feeding tracker' form
    Then I should see the 'Save & Close' button in 'feeding tracker' form is enabled
    When I click the 'Save & Close' button in 'feeding tracker' form
    Then I should see the pumped feed available in 'Homepage' as 'Pumped: Electric Pump - Right Breast - 10 ml'
    When I click the 'Start Feed' button in 'Homepage'
    Then I should see the 'Feed given to' modal dialog in 'Homepage'
    When I select 'Breast Milk' in 'Feed Type' dropdown field in 'feeding tracker' form
    And I select 'Pumped Milk' in 'Feed Mode' dropdown field in 'feeding tracker' form
    Then I verify and select the option 'Right Breast - Electric Pump' is displayed for 'Choose pumped feed' dropdown in 'feeding tracker' form
    And I should see the 'Start Tracking' button in 'feeding tracker' form is enabled
    When I click the 'Start Tracking' button in 'feeding tracker' form
    Then I should see the 'Stop Tracking' button in 'feeding tracker' form
    When I wait for 5 seconds in 'feeding tracker' form
    And I click the 'Stop Tracking' button in 'feeding tracker' form
    Then I should see the 'Feed Quantity' field in 'feeding tracker' form
    When I enter '10' in 'Feed Quantity' field in 'feeding tracker' form
    Then I should see the 'Save & Close' button in 'feeding tracker' form is enabled
    When I click the 'Save & Close' button in 'feeding tracker' form
    Then I should see the tracked feed available in 'Homepage' as 'Feed: Breast Milk - Pumped Milk - 10 ml'

  Scenario: Verify direct feed for toddler
    When I click the 'Start Feed' button in 'Homepage'
    Then I should see the 'Feed given to' modal dialog in 'Homepage'
    When I select 'Breast Milk' in 'Feed Type' dropdown field in 'feeding tracker' form
    And I select 'Direct Feed' in 'Feed Mode' dropdown field in 'feeding tracker' form
    And I select 'Left Breast' in 'Breast side' dropdown field in 'feeding tracker' form
    Then I should see the 'Start Tracking' button in 'feeding tracker' form is enabled
    When I click the 'Start Tracking' button in 'feeding tracker' form
    Then I should see the 'Stop Tracking' button in 'feeding tracker' form
    When I wait for 5 seconds in 'feeding tracker' form
    And I click the 'Stop Tracking' button in 'feeding tracker' form
    Then I should see the 'Feed Quantity' field in 'feeding tracker' form
    When I enter '10' in 'Feed Quantity' field in 'feeding tracker' form
    Then I should see the 'Save & Close' button in 'feeding tracker' form is enabled
    When I click the 'Save & Close' button in 'feeding tracker' form
    Then I should see the tracked feed available in 'Homepage' as 'Feed: Breast Milk - Direct Feed - Left Breast - 10 ml'

  Scenario Outline: Verify other feeds for toddler
    When I click the 'Start Feed' button in 'Homepage'
    Then I should see the 'Feed given to' modal dialog in 'Homepage'
    When I select '<feed_type>' in 'Feed Type' dropdown field in 'feeding tracker' form
    And I select '<feed_mode>' in 'Feed Mode' dropdown field in 'feeding tracker' form
    Then I should see the 'Start Tracking' button in 'feeding tracker' form is enabled
    When I click the 'Start Tracking' button in 'feeding tracker' form
    Then I should see the 'Stop Tracking' button in 'feeding tracker' form
    When I wait for 5 seconds in 'feeding tracker' form
    And I click the 'Stop Tracking' button in 'feeding tracker' form
    Then I should see the 'Feed Quantity' field in 'feeding tracker' form
    When I enter '<feed_quantity>' in 'Feed Quantity' field in 'feeding tracker' form
    Then I should see the 'Save & Close' button in 'feeding tracker' form is enabled
    When I click the 'Save & Close' button in 'feeding tracker' form
    Then I should see the tracked feed available in 'Homepage' as 'Feed: <feed_type> - <feed_mode> - <feed_quantity> ml'

    Examples: 
      | feed_type       | feed_mode      | feed_quantity |
      | Formula feeding | Feeding bottle |            10 |
      | Formula feeding | Spoon          |            10 |
      | Formula feeding | Other          |            10 |
      | Mashed food     | Self-feeding   |            10 |
      | Mashed food     | Others feeding |            10 |
      | Juices          | Feeding bottle |            10 |
      | Juices          | Spoon          |            10 |
      | Juices          | Glass          |            10 |
      | Water           | Feeding bottle |            10 |
      | Water           | Spoon          |            10 |
      | Water           | Glass          |            10 |
