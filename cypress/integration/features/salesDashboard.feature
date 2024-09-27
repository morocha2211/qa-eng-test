@smoke
Feature: Vristo Sales Dashboard

  Background:
    Given the user is on the sales dashboard page
    And the user sees the sales overview section

  @dashboard
    Scenario: User views the sales dashboard
    When the user examines the header
    Then the header should display "DashboardSales"
    And the user sees the sales overview section

  @dashboard
    Scenario:Validate that the dashboard button scrolls up to the top correctly
    When the user scrolls down
    And clicks on the dashboard button
    Then the page should scroll to the top

   @widgets
    Scenario Outline: Verify that all widgets are displayed correctly on the Sales Dashboard
    Then the following widgets should be displayed:
    | Widget                | Dots   | Chart   |
    | <Widget>              | <Dots> | <Chart> |

    Examples:
    | Widget                 | Dots                                 | Chart  |
    | Revenue                | Weekly,Monthly,Yearly                | true   |
    | Daily Sales            |                                      | true   |
    | Summary                | View Report,Edit Report,Mark as Done | false  |
    | Sales By Category      |                                      | false  |
    | Wallet Balance         |                                      | false  |
    | Recent Activities      |                                      | false  |
    | Transactions           |                                      | false  |
    | Recent Orders          |                                      | false  | 
    | Top Selling Product    |                                      | false  |

    @design
    Scenario Outline: Verify that the design is displayed correctly on different mobile devices
    When the user views the dashboard on a:
    | Device   |
    | <Device> |
    
    Then the header should be visible
    And the widgets should be displayed correctly

    Examples:
    | Device      |
    | iphone-6    |
    | iphone-3    |

    @design
    Scenario: The design matches Figma on desktop
     Given the user is on the sales dashboard page
     When the viewport is set to desktop resolution
     Then the layout should match the Figma design exactly