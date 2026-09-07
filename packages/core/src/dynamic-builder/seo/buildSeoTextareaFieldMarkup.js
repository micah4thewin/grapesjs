import buildSeoFieldAttributesMarkup from './buildSeoFieldAttributesMarkup.js';
import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import buildSeoFieldLabelMarkup from './buildSeoFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoTextareaFieldMarkup = (fieldKey, labelText, helpText, fieldValue, badgeMarkup) =>
  [
    '<div class="gjs-db-field" data-db-seo-field-wrap="' + escapeHtmlText(fieldKey) + '">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, badgeMarkup),
    '<textarea class="gjs-db-field-input"' +
      buildSeoFieldAttributesMarkup(fieldKey, { hasCounter: Boolean(badgeMarkup) }) +
      ' rows="3">' +
      escapeHtmlText(fieldValue || '') +
      '</textarea>',
    buildSeoFieldHelpMarkup(fieldKey, helpText),
    '</div>',
  ].join('');

export default buildSeoTextareaFieldMarkup;
