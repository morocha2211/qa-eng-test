/**
 * Class representing the Sales Dashboard page.
 * Provides methods to interact with various elements on the page.
 */
class SalesDashboardPage {
    dateFilterSelector = '.date-filter';
    dateRangeSelector = '.date-range-selector';
    widgetSelector = '.panel';
    widgetTitleSelector = 'h5';
    buttonSelector = '.btn-outline-primary';

    /**
     * Visits the Sales Dashboard page.
     */
    visit() {
        cy.visit('');
    }

    /**
     * Gets the header element of the Sales Dashboard.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The header element.
     */
    getHeader() {
        return cy.get(':nth-child(1) > .space-x-2');
    }

    /**
     * Gets the Sales Overview section element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The Sales Overview element.
     */
    getSalesOverview() {
        return cy.get('.pt-5 > :nth-child(1)');
    }

    /**
     * Gets the Sales Data section element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The Sales Data element.
     */
    getSalesData() {
        return cy.get('.sales-data');
    }

    /**
     * Clicks a button with the given label.
     * @param {string} buttonLabel - The label of the button to click.
     */
    clickButton(buttonLabel: string) {
        cy.contains(buttonLabel).click();
    }

    /**
     * Clicks the default dashboard button.
     */
    clickDashboardButton() {
        cy.get(this.buttonSelector).click();
    }

    /**
     * Finds a widget by its title.
     * @param {string} title - The title of the widget to find.
     * @returns {WidgetSalesDashboard} A new instance of WidgetSalesDashboard for the specified widget.
     */
    getWidgetByTitle(title: string) {
        const widget = cy.get(this.widgetSelector)
            .contains(this.widgetTitleSelector, title)
            .closest(this.widgetSelector)
            .as(title);

        return new WidgetSalesDashboard(title);
    }
}

/**
 * Class representing a specific widget on the Sales Dashboard.
 */
class WidgetSalesDashboard {
    aliasTitle: string = '';

    /**
     * Creates an instance of WidgetSalesDashboard.
     * @param {string} aliasTitle - The alias title used for referencing the widget.
     */
    constructor(aliasTitle: string) {
        this.aliasTitle = `@${aliasTitle}`;
    }
    
    /**
     * Validates that the widget contains the expected title.
     * @param {string} title - The title to validate.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The title element within the widget.
     */
    validateTitle(title: string) { 
        cy.get(this.aliasTitle).within(() => {
            return cy.get('h5').contains(title);
        });
    }

    /**
     * Clicks the dot menu (dropdown) of the widget.
     */
    clickDotMenu() {
        cy.get(this.aliasTitle).within(() => {
            cy.get('.dropdown button').click();
        });
    }

    /**
     * Validates that the expected options exist in the widget's dot menu.
     * @param {string[]} options - The list of options to validate.
     */
    validateDotOptions(options: string[]) {
        this.clickDotMenu();
        
        cy.get(this.aliasTitle).within(() => {
            cy.get('.dropdown').within(() => {
                options.forEach(option => {
                    cy.contains(option).should('exist'); // Ensure each option exists
                });    
            });
        });
    }

    /**
     * Validates that the chart exists within the widget.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The chart element within the widget.
     */
    validateChart() {
        cy.get('div[id^="apexchart"]').should('exist');
    }
}

export const salesDashboardPage = new SalesDashboardPage();
