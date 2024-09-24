Feature: Vristo Sales Dashboard

  Background:
    Given the user is on the sales dashboard page
    And the user sees the sales overview section

  @dashboard
    Scenario: User views the sales dashboard
    When the user examines the header
    Then the header should display "Dashboard / Sales"
    And the user sees the sales overview section

    Scenario:Validate that the dashboard button scrolls up to the top correctly
    When the user scrolls down
    And clicks on the dashboard button
    Then the page should scroll to the top

   @widgets
  Scenario Outline: Verify that all widgets are displayed correctly on the Sales Dashboard
    Then the following widgets should be displayed:
    | Widget                |
    | <Widget>              |

    Examples:
    | Widget               |
    | Revenue              |
    # | Daily Sales          |
    # | Summary              |
    # | Sales by category    |
    # | Wallet Balance       |
    # | Recent Activities    |
    # | Transactions         |
    # | Recent Orders        | 
    # | Top Selling Product  |


# Scenario Outline: Verify that the design is displayed correctly on different mobile devices
#     When the user views the dashboard on a <device>
#     Then the header should be visible
#     And the widgets should be displayed correctly

#   Examples:
#     | device       |
#     | iphone-6    |
#     | iphone-3    |