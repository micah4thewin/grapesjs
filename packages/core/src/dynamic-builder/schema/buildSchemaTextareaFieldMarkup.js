import buildSchemaFieldHelpMarkup from './buildSchemaFieldHelpMarkup.js';
import buildSchemaFieldLabelMarkup from './buildSchemaFieldLabelMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaTextareaFieldMarkup = (fieldKey, labelText, helpText, fieldValue) =>
  [
    '<div class="gjs-db-field">',
    buildSchemaFieldLabelMarkup(fieldKey, labelText),
    '<textarea class="gjs-db-field-input" id="gjs-db-schema-' +
      escapeHtmlText(fieldKey) +
      '" data-db-schema-field="' +
      escapeHtmlText(fieldKey) +
      '" rows="3">' +
      escapeHtmlText(fieldValue || '') +
      '</textarea>',
    buildSchemaFieldHelpMarkup(helpText),
    '</div>',
  ].join('');

export default buildSchemaTextareaFieldMarkup;
