import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { salesDashboardPage } from '@/cypress/support/pageObjects/SalesDashboardPage';
import { DataTable } from '@badeball/cypress-cucumber-preprocessor';


type ViewportPreset =
  | 'iphone-6'
  | 'iphone-3';


Given('the user is on the sales dashboard page', () => {
  salesDashboardPage.visit();
});

When('the user examines the header', () => {
  salesDashboardPage.getHeader().should('exist');
});

Then('the header should display {string}', (expectedHeader: string) => {
  salesDashboardPage.getHeader()
  .should('contain.text', 'Dashboard')
  .and('contain.text', 'Sales'); 
}); 

Then('the user sees the sales overview section', () => {
  salesDashboardPage.getSalesOverview().should('exist');
});

Then('the sales data is displayed correctly', () => {
  salesDashboardPage.getSalesData().should('not.be.empty');
});

When('clicks the {string} button', (buttonLabel: string) => {
  cy.contains(buttonLabel).click();
});

Then('the following widgets should be displayed:', (dataTable: DataTable) => { // Specify DataTable type
  const widgets = dataTable.rows().slice(1); // Use rows() method to get data
  // cy.get('div.panel').should('have.length', 10) // gets all widgets
  cy.get('div.panel').then(
    (widgets) => {
      console.log('widget >', widgets.length)
      widgets.each(
        (idx, ele) => {
          const cyWidget = cy.wrap(ele);
          cy.get('h5')
          .should('contain.text', widget) // Verify the widget title text
          .and('be.visible'); // Ensure the widget is visible
        }
      )
    }
  )

  // Verify each widget is displayed
  widgets.forEach(([widget]) => {
    // Define the selector based on the widget name
    let selector;

    switch (widget) {
      case 'Revenue':
        selector = '.xl\\:col-span-2 > .mb-5 > .text-lg';
        break;
      case 'Sales By Category':
        selector = ':nth-child(1) > :nth-child(2) > .mb-5 > .text-lg';
        break;
      case 'Daily Sales':
        selector = '.sm\\:col-span-2 > .mb-5 > .text-lg';
        break;
      case 'Summary':
        selector = ':nth-child(2) > :nth-child(2) > .mb-5 > .text-lg';
        break;
      case 'Transactions':
        selector = '.pb-0 > .mb-5'; // Assuming the title is directly in this class
        break;
      // Add more cases for other widgets as necessary
      default:
        throw new Error(`No selector defined for widget: ${widget}`);
    }

    // Check if the widget title is present and visible
    cy.get(selector)
      .should('contain.text', widget) // Verify the widget title text
      .and('be.visible'); // Ensure the widget is visible
  });
});

When('the user views the dashboard on a {string}', (device: string) => {
  cy.viewport(device as ViewportPreset); // Asegúrate de que el tipo coincide
});

When('the user scrolls down', () => {
  cy.scrollTo('bottom');
});


When('clicks on the dashboard button', () => {
  cy.get('.btn-outline-primary') // Selects the button with the class 'btn-outline-primary'
    .click(); // Clicks the button
});

Then('the page should scroll to the top', () => {
  cy.window().its('scrollY').should('equal', 0); // Asserts that the scroll position is at the top (0)
});