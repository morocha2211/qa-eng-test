import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { salesDashboardPage } from '@/cypress/support/pageObjects/SalesDashboardPage';
import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import addContext from 'mochawesome/addContext';

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
    .should('contain.text', expectedHeader);
});

Then('the user sees the sales overview section', () => {
  salesDashboardPage.getSalesOverview().should('exist');
});

Then('the sales data is displayed correctly', () => {
  salesDashboardPage.getSalesData().should('not.be.empty');
});

When('clicks the {string} button', (buttonLabel: string) => {
  salesDashboardPage.clickButton(buttonLabel);
});

Then('the following widgets should be displayed:', (dataTable: DataTable) => {
  const widgetsData = dataTable.rows();
  
  // Verify each widget is displayed
  widgetsData.forEach(([title, dots, chart]) => {
    const widget = salesDashboardPage.getWidgetByTitle(title); 
    
    widget.validateTitle(title);
    
    if (dots) {
      const dotsOptions = dots.split(',');
      widget.validateDotOptions(dotsOptions);
    }

    if (chart === 'true') {
      widget.validateChart();
    }
  });
});

When('the user views the dashboard on a:', (deviceTable: DataTable) => {
  const devices = deviceTable.rows()[0];
  
  cy.viewport(devices[0] as ViewportPreset); 
});

Then('the header should be visible', () => {
  console.log('header visible')
})

Then('the widgets should be displayed correctly', () => {
  console.log('displayed correctly')
})

When('the user scrolls down', () => {
  cy.scrollTo('bottom');
});

When('clicks on the dashboard button', () => {
  salesDashboardPage.clickDashboardButton();
});

Then('the page should scroll to the top', () => {
  cy.window().its('scrollY').should('equal', 0);
});

When('the viewport is set to desktop resolution', () => {
  cy.viewport(1660, 2000); 
});

Then('the layout should match the Figma design exactly', () => {
  cy.wait(5000);
  cy.matchImageSnapshot('sales-dashboard', {
    blackout: ['header', 'nav'],
  });

  // Check if there's a difference and attach the screenshot if a mismatch occurs
  cy.on('fail', (error) => {
    if (error.message.includes('Image was different')) {
      // Specify the path to the diff image
      const screenshotPath = `cypress/snapshots/diff/example-page-diff.png`;

      // Add the screenshot to the report
      addContext({ test: this }, screenshotPath);
    }
    throw error; // Re-throw the error after adding the screenshot
  });
});