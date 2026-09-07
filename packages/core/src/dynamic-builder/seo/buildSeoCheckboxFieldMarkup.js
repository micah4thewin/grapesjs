import buildSeoFieldAttributesMarkup from './buildSeoFieldAttributesMarkup.js';
import buildSeoFieldHelpMarkup from './buildSeoFieldHelpMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoCheckboxFieldMarkup = (fieldKey, labelText, helpText, isChecked) =>
  [
    '<div class="gjs-db-field" data-db-seo-field-wrap="' + escapeHtmlText(fieldKey) + '">',
    '<label class="gjs-db-field-label gjs-db-seo-checkbox" for="gjs-db-seo-' + escapeHtmlText(fieldKey) + '">',
    '<input type="checkbox"' + buildSeoFieldAttributesMarkup(fieldKey) + (isChecked ? ' checked' : '') + '>',
    '<span>' + escapeHtmlText(labelText) + '</span>',
    '</label>',
    buildSeoFieldHelpMarkup(fieldKey, helpText),
    '</div>',
  ].join('');

export default buildSeoCheckboxFieldMarkup;
