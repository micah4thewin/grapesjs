import activateTabbedSections from '../support/activateTabbedSections.js';

const activateSchemaModalTab = (rootElement, tabName, options = {}) =>
  activateTabbedSections(rootElement, tabName, {
    tabAttribute: 'data-db-schema-tab',
    sectionAttribute: 'data-db-schema-section',
    focusTab: options.focusTab,
  });

export default activateSchemaModalTab;
