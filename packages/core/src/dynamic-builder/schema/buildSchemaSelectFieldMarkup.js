import buildSchemaFieldHelpMarkup from './buildSchemaFieldHelpMarkup.js';
import buildSchemaFieldLabelMarkup from './buildSchemaFieldLabelMarkup.js';
import buildSchemaSelectOptionsMarkup from './buildSchemaSelectOptionsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaSelectFieldMarkup = (fieldKey, labelText, helpText, selectedValue, optionEntries) =>
  [
    '<div class="gjs-db-field">',
    buildSchemaFieldLabelMarkup(fieldKey, labelText),
    '<select class="gjs-db-field-input" id="gjs-db-schema-' +
      escapeHtmlText(fieldKey) +
      '" data-db-schema-field="' +
      escapeHtmlText(fieldKey) +
      '">',
    buildSchemaSelectOptionsMarkup(optionEntries, selectedValue),
    '</select>',
    buildSchemaFieldHelpMarkup(helpText),
    '</div>',
  ].join('');

export default buildSchemaSelectFieldMarkup;
