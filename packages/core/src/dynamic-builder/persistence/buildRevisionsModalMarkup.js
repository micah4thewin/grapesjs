import escapeHtmlText from '../support/escapeHtmlText.js';

const buildRevisionsModalMarkup = (storageUsageText) =>
  [
    '<div class="gjs-db-revisions gjs-db-form" data-db-revisions-root>',
    '<p class="gjs-db-muted">Revisions are snapshots of the whole site kept in this browser. ',
    'Restore one to go back, or download it as a backup file.</p>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-revision-action="save-now"',
    ' data-db-autofocus>Save revision now</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-action="import">Import backup (.json)</button>',
    '<input type="file" accept=".json,application/json" data-db-revision-import-input hidden>',
    '</div>',
    '<div class="gjs-db-field-help" data-db-storage-usage>' + escapeHtmlText(storageUsageText || '') + '</div>',
    '<ul class="gjs-db-list" data-db-revision-list></ul>',
    '</div>',
  ].join('');

export default buildRevisionsModalMarkup;
