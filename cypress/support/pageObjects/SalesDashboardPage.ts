class SalesDashboardPage {
    dateFilterSelector = '.date-filter';
    dateRangeSelector = '.date-range-selector';
    widgetSelector = '.panel';
    widgetTitleSelector = 'h5';
    buttonSelector = '.btn-outline-primary';

    visit() {
        cy.visit('');
    }

    getHeader() {
        return cy.get(':nth-child(1) > .space-x-2');
    }

    getSalesOverview() {
        return cy.get('.pt-5 > :nth-child(1)');
    }

    getSalesData() {
        return cy.get('.sales-data');
    }

    clickButton(buttonLabel: string) {
        cy.contains(buttonLabel).click();
    }

    clickDashboardButton() {
        cy.get(this.buttonSelector).click();
    }

    getWidgetByTitle(title: string) {
        const widget = cy.get(this.widgetSelector)
            .contains(this.widgetTitleSelector, title)
            .closest(this.widgetSelector)
            .as(title);

        return new WidgetSalesDashboard(title);
    }
}

class WidgetSalesDashboard {
    aliasTitle: string = '';

    constructor(aliasTitle: string) {
        this.aliasTitle = `@${aliasTitle}`;
    }
    
    validateTitle(title: string) { 
        cy.get(this.aliasTitle).within(() => {
            return cy.get('h5').contains(title);
        });
    }

    clickDotMenu() {
        cy.get(this.aliasTitle).within(() => {
            cy.get('.dropdown button').click();
        });
    }

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

    validateChart() {
        cy.get('div[id^="apexchart"]').should('exist');
    }
}

export const salesDashboardPage = new SalesDashboardPage();