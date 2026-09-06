import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoFieldLabelMarkup = (fieldKey, labelText, badgeMarkup) =>
  [
    '<div class="gjs-db-seo-label-row">',
    '<label class="gjs-db-field-label" for="gjs-db-seo-' + fieldKey + '">' + escapeHtmlText(labelText) + '</label>',
    badgeMarkup || '',
    '</div>',
  ].join('');

export default buildSeoFieldLabelMarkup;
