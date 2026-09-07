const tabDefinitions = [
  ['site', 'Site'],
  ['page', 'This page'],
  ['preview', 'Preview'],
];

const buildSchemaTabsMarkup = () =>
  '<div class="gjs-db-button-row gjs-db-schema-tabs" role="tablist" aria-label="Structured data sections">' +
  tabDefinitions
    .map(
      ([tabName, tabLabel]) =>
        '<button type="button" class="gjs-db-button" role="tab" id="gjs-db-schema-tab-' +
        tabName +
        '" aria-controls="gjs-db-schema-panel-' +
        tabName +
        '" aria-selected="false" tabindex="-1" data-db-schema-tab="' +
        tabName +
        '">' +
        tabLabel +
        '</button>',
    )
    .join('') +
  '</div>';

export default buildSchemaTabsMarkup;
