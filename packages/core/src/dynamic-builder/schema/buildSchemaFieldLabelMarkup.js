import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaFieldLabelMarkup = (fieldKey, labelText) =>
  '<label class="gjs-db-field-label" for="gjs-db-schema-' +
  escapeHtmlText(fieldKey) +
  '">' +
  escapeHtmlText(labelText) +
  '</label>';

export default buildSchemaFieldLabelMarkup;
