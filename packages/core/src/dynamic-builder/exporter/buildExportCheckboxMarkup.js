import escapeHtmlText from '../support/escapeHtmlText.js';

const buildExportCheckboxMarkup = (optionKey, labelText, helpText, checkedFlag, disabledFlag) =>
  [
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label">',
    '<input type="checkbox" data-db-export-option="' +
      escapeHtmlText(optionKey) +
      '"' +
      (checkedFlag ? ' checked' : '') +
      (disabledFlag ? ' disabled' : '') +
      '> ',
    escapeHtmlText(labelText),
    '</label>',
    helpText ? '<div class="gjs-db-field-help">' + escapeHtmlText(helpText) + '</div>' : '',
    '</div>',
  ].join('');

export default buildExportCheckboxMarkup;
