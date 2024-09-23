import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { salesDashboardPage } from '@/cypress/support/pageObjects/SalesDashboardPage'

Given('the user is on the sales dashboard page', () => {
  salesDashboardPage.visit(); // Cambia esta URL según tu ruta real
});

When('the user looks at the header', () => {
  salesDashboardPage.getHeader().should('exist'); // Asegúrate de que la selector sea el correcto
});

Then('the header should display {string}', (expectedHeader: string) => {
  salesDashboardPage.getHeader().contains(expectedHeader).should('be.visible');
});

Then('the user sees the sales overview section', () => {
  salesDashboardPage.getSalesOverview().should('exist'); // Ajusta el selector según tu estructura
});

Then('the sales data is displayed correctly', () => {
  // Aquí puedes añadir aserciones específicas para verificar los datos
  salesDashboardPage.getSalesData().should('not.be.empty'); // Asegúrate de que los datos no estén vacíos
});

When('the user selects a date range from the filter', () => {
  salesDashboardPage.selectDateRange('Last 30 Days'); // Cambia el valor según tus opciones
});

When('clicks the {string} button', (buttonLabel: string) => {
  cy.contains(buttonLabel).click();
});

Then('the sales data should update to reflect the selected date range', () => {
  salesDashboardPage.getSalesData().should('not.be.empty'); // Asegúrate de que los datos se actualicen
});

When('the viewport is set to desktop resolution', () => {
  cy.viewport(1280, 720); // Cambia la resolución según sea necesario
});

Then('the layout should match the Figma design exactly', () => {
  // Tomar una captura de pantalla del cuerpo de la página y compararla
  cy.get('body').matchImageSnapshot('sales-dashboard-desktop');
});