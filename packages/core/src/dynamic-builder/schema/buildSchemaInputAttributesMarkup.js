import escapeHtmlText from '../support/escapeHtmlText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildSchemaInputAttributesMarkup = (attributesRecord) =>
  Object.entries(isPlainRecord(attributesRecord) ? attributesRecord : {})
    .filter(([attributeName, attributeValue]) => /^[a-z-]+$/.test(attributeName) && attributeValue != null)
    .map(([attributeName, attributeValue]) => ' ' + attributeName + '="' + escapeHtmlText(attributeValue) + '"')
    .join('');

export default buildSchemaInputAttributesMarkup;
