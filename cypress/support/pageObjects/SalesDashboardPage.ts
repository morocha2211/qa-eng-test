class SalesDashboardPage {
    dateFilterSelector = '.date-filter';
    dateRangeSelector = '.date-range-selector';

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
    /**
     * this function selects a date range option
     * 
     * @param range (string) range option that will selected.
     */
    selectDateRange(range:string) {
        cy.get(this.dateFilterSelector).click(); // Ajusta el selector según tu diseño
        cy.get(this.dateRangeSelector).select(range); // Cambia el valor según tus opciones
    }
}

export const salesDashboardPage = new SalesDashboardPage();
