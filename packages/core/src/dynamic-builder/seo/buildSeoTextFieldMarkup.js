import buildSeoFieldAttributesMarkup from './buildSeoFieldAttributesMarkup.js';
import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import buildSeoFieldLabelMarkup from './buildSeoFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoTextFieldMarkup = (fieldKey, labelText, helpText, fieldValue, badgeMarkup, options = {}) =>
  [
    '<div class="gjs-db-field" data-db-seo-field-wrap="' + escapeHtmlText(fieldKey) + '">',
    buildSeoFieldLabelMarkup(fieldKey, labelText, badgeMarkup),
    '<input type="text" class="gjs-db-field-input"' +
      buildSeoFieldAttributesMarkup(fieldKey, { ...options, hasCounter: Boolean(badgeMarkup) }) +
      ' value="' +
      escapeHtmlText(fieldValue || '') +
      '">',
    buildSeoFieldHelpMarkup(fieldKey, helpText),
    '</div>',
  ].join('');

export default buildSeoTextFieldMarkup;
