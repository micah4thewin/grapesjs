import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoCheckboxFieldMarkup = (fieldKey, labelText, helpText, isChecked) =>
  [
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label gjs-db-seo-checkbox" for="gjs-db-seo-' + fieldKey + '">',
    '<input type="checkbox" id="gjs-db-seo-' +
      fieldKey +
      '" data-db-seo-field="' +
      fieldKey +
      '"' +
      (isChecked ? ' checked' : '') +
      '>',
    '<span>' + escapeHtmlText(labelText) + '</span>',
    '</label>',
    buildSeoFieldHelpMarkup(helpText),
    '</div>',
  ].join('');

export default buildSeoCheckboxFieldMarkup;
