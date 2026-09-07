import collectSchemaFormValues from './collectSchemaFormValues.js';

const collectSchemaSnapshot = (rootElement) =>
  JSON.stringify({
    site: collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="site"]')),
    page: collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="page"]')),
  });

export default collectSchemaSnapshot;
