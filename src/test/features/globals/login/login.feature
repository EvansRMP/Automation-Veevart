Feature: Login Salesforce Veevart UAT

Background:
    Given the user is on the login page

    Scenario: Successful login with valid credentials
        When the user enters valid email and password
        And the user click in submit
        Then the user see the dashboard
   
    Scenario: Error login with invalid credentials
        When the user enters invalid email and password
        And the user click in submit
        Then the user see error mesage

    
        