import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import buildSeoFieldLabelMarkup from './buildSeoFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoTextareaFieldMarkup = (fieldKey, labelText, helpText, fieldValue, badgeMarkup) =>
  [
    '<div class="gjs-db-field">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, badgeMarkup),
    '<textarea class="gjs-db-field-input" id="gjs-db-seo-' +
      fieldKey +
      '" data-db-seo-field="' +
      fieldKey +
      '" rows="3">' +
      escapeHtmlText(fieldValue || '') +
      '</textarea>',
    buildSeoFieldHelpMarkup(helpText),
    '</div>',
  ].join('');

export default buildSeoTextareaFieldMarkup;
