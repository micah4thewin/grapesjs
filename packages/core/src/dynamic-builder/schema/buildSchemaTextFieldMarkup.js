import buildSchemaFieldHelpMarkup from './buildSchemaFieldHelpMarkup.js';
import buildSchemaFieldLabelMarkup from './buildSchemaFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaTextFieldMarkup = (fieldKey, labelText, helpText, fieldValue) =>
  [
    '<div class="gjs-db-field">',
    buildSchemaFieldLabelMarkup(fieldKey, labelText),
    '<input type="text" class="gjs-db-field-input" id="gjs-db-schema-' +
      escapeHtmlText(fieldKey) +
      '" data-db-schema-field="' +
      escapeHtmlText(fieldKey) +
      '" value="' +
      escapeHtmlText(fieldValue || '') +
      '">',
    buildSchemaFieldHelpMarkup(helpText),
    '</div>',
  ].join('');

export default buildSchemaTextFieldMarkup;
