import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaSaveRowMarkup = (sectionName, buttonLabel) =>
  [
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-schema-save="' + sectionName + '">',
    escapeHtmlText(buttonLabel),
    '</button>',
    '<span class="gjs-db-status" data-db-schema-status="' + sectionName + '" role="status"></span>',
    '</div>',
  ].join('');

export default buildSchemaSaveRowMarkup;
