import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import buildSeoFieldLabelMarkup from './buildSeoFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoTextFieldMarkup = (fieldKey, labelText, helpText, fieldValue, badgeMarkup) =>
  [
    '<div class="gjs-db-field">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, badgeMarkup),
    '<input type="text" class="gjs-db-field-input" id="gjs-db-seo-' +
      fieldKey +
      '" data-db-seo-field="' +
      fieldKey +
      '" value="' +
      escapeHtmlText(fieldValue || '') +
      '">',
    buildSeoFieldHelpMarkup(helpText),
    '</div>',
  ].join('');

export default buildSeoTextFieldMarkup;
