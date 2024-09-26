import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';


export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);
      
      // Add this line to register the cypress-image-snapshot plugin
      addMatchImageSnapshotPlugin(on);


      return config;
    },
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'http://localhost:3000', 
    // report configuration
    reporter: 'mochawesome',
    reporterOptions: {
      mochawesomeReporterOptions: {
        reportDir: 'mochawesome-report',
        quiet: true,
        overwrite: false,
        html: false,
        json: true,
      },
    },
    screenshotsFolder: 'mochawesome-report/assets/',
    screenshotOnRunFailure: true
  },
});