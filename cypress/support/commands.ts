/// <reference types="cypress" />
import {
    addMatchImageSnapshotCommand
} from '@simonsmith/cypress-image-snapshot/command';

addMatchImageSnapshotCommand(
    {
        snapFilenameExtension: '.snap',
        diffFilenameExtension: '.diff',
        disableTimersAndAnimations: true,
        failureThreshold: 0.1,
        failureThresholdType: 'percent',
        customSnapshotsDir: 'cypress/screenshots',
        capture: 'fullPage',
    }
)