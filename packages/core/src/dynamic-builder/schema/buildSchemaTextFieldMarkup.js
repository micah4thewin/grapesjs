import buildSchemaFieldHelpMarkup from './buildSchemaFieldHelpMarkup.js';
import buildSchemaFieldLabelMarkup from './buildSchemaFieldLabelMarkup.js';
import buildSchemaInputAttributesMarkup from './buildSchemaInputAttributesMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaTextFieldMarkup = (fieldKey, labelText, helpText, fieldValue, inputAttributes) => {
  const attributesRecord = { type: 'text', ...(inputAttributes || {}) };
  return [
    '<div class="gjs-db-field">',
    buildSchemaFieldLabelMarkup(fieldKey, labelText),
    '<input class="gjs-db-field-input" id="gjs-db-schema-' +
      escapeHtmlText(fieldKey) +
      '" data-db-schema-field="' +
      escapeHtmlText(fieldKey) +
      '" value="' +
      escapeHtmlText(fieldValue || '') +
      '"' +
      buildSchemaInputAttributesMarkup(attributesRecord) +
      '>',
    buildSchemaFieldHelpMarkup(helpText),
    '</div>',
  ].join('');
};

export default buildSchemaTextFieldMarkup;
