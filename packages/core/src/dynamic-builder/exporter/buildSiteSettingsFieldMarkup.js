import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSiteSettingsFieldMarkup = (fieldKey, labelText, helpText, fieldValue) =>
  [
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="gjs-db-site-' + escapeHtmlText(fieldKey) + '">',
    escapeHtmlText(labelText),
    '</label>',
    '<input type="text" class="gjs-db-field-input" id="gjs-db-site-' +
      escapeHtmlText(fieldKey) +
      '" data-db-site-field="' +
      escapeHtmlText(fieldKey) +
      '" value="' +
      escapeHtmlText(fieldValue || '') +
      '">',
    '<div class="gjs-db-field-help">' + escapeHtmlText(helpText) + '</div>',
    '</div>',
  ].join('');

export default buildSiteSettingsFieldMarkup;
