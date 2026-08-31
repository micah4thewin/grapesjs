import buildDataSourceEntryMarkup from './buildDataSourceEntryMarkup.js';

const buildDataSourcesModalMarkup = (sourcesRecord) => {
  const entriesMarkup = Object.keys(sourcesRecord)
    .sort()
    .map((sourceName) => buildDataSourceEntryMarkup(sourceName, sourcesRecord[sourceName]))
    .join('');
  return [
    '<form class="gjs-db-form gjs-db-data-sources">',
    '<p class="gjs-db-field-help gjs-db-muted">',
    'Data sources feed repeater components and {{db:path}} tokens across the site.',
    '</p>',
    `<div class="gjs-db-list" data-db-source-list>${entriesMarkup}</div>`,
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-new-source-name">Add source</label>',
    '<div class="gjs-db-grid-two">',
    '<input id="db-new-source-name" type="text" class="gjs-db-field-input" ',
    'data-db-source-add-name placeholder="e.g. partners">',
    '<button type="button" class="gjs-db-button" data-db-source-add>Add source</button>',
    '</div>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-source-save>Save data sources</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildDataSourcesModalMarkup;
