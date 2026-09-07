import buildDataSourceEntryMarkup from './buildDataSourceEntryMarkup.js';

const buildDataSourcesModalMarkup = (editorState) => {
  const entriesMarkup = editorState.entries
    .map((sourceEntry) => buildDataSourceEntryMarkup(sourceEntry, editorState.usage[sourceEntry.name]))
    .join('');
  return [
    '<form class="gjs-db-form gjs-db-data-sources" novalidate>',
    '<p class="gjs-db-field-help gjs-db-muted">',
    'Each source is a list of items, like team members or products. Repeaters show one card per item, ',
    'and tokens such as {{db:siteInfo.name}} show a single value anywhere. Changes preview on the canvas as you type.',
    '</p>',
    `<div class="gjs-db-source-list" data-db-source-list>${entriesMarkup}</div>`,
    '<div class="gjs-db-field gjs-db-source-add">',
    '<label class="gjs-db-field-label" for="db-new-source-name">Add a source</label>',
    '<div class="gjs-db-source-add-row">',
    '<input id="db-new-source-name" type="text" class="gjs-db-field-input" data-db-source-add-name ',
    'placeholder="e.g. Partners" autocomplete="off" aria-describedby="db-new-source-hint db-new-source-error">',
    '<button type="button" class="gjs-db-button" data-db-source-add>Add source</button>',
    '</div>',
    '<p class="gjs-db-field-help gjs-db-muted" id="db-new-source-hint" data-db-source-add-hint>',
    'Type a name and press Enter. Letters and numbers only; spaces are removed.</p>',
    '<p class="gjs-db-field-error" id="db-new-source-error" data-db-source-add-error hidden></p>',
    '</div>',
    '<div class="gjs-db-button-row gjs-db-source-footer">',
    '<button type="button" class="gjs-db-button" data-db-source-cancel>Cancel</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-source-save>Save data sources</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildDataSourcesModalMarkup;
