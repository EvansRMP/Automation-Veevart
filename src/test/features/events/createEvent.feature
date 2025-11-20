Feature: Create a new Exhibition and Event`

  @event
  Scenario: Create a new Exhibition and Event
    Given the user is on the login page
    When the user enters valid email and password
    And the user click in submit
    When A user click on Exhibitions & Events
    And user create new event
    Then user should see the event title 
    
    Then user delete the created event
