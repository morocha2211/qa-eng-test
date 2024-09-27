import './commands';
const addContext = require('mochawesome/addContext');

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
    const screenshotFolder = `assets/${Cypress.spec.name}`;
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`;
    
    addContext({ test }, `${screenshotFolder}/${encodeURIComponent(screenshotFileName)}`);
    }
  });

Cypress.on('uncaught:exception', () => false);

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});