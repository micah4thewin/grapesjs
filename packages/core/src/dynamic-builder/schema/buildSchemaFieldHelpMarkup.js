import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSchemaFieldHelpMarkup = (helpText) =>
  helpText ? '<span class="gjs-db-field-help gjs-db-muted">' + escapeHtmlText(helpText) + '</span>' : '';

export default buildSchemaFieldHelpMarkup;
