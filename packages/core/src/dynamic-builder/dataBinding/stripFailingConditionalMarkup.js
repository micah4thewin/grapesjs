import evaluateConditionRecord from './evaluateConditionRecord.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import parseConditionAttribute from './parseConditionAttribute.js';
import parseMarkupDocument from './parseMarkupDocument.js';
import serializeMarkupDocument from './serializeMarkupDocument.js';

const stripFailingConditionalMarkup = (editor, htmlString) => {
  const markupText = String(htmlString == null ? '' : htmlString);
  const parsedDocument = parseMarkupDocument(markupText);
  if (!parsedDocument) return markupText;
  const registryRecord = getDataSourceRegistry(editor);
  Array.from(parsedDocument.querySelectorAll('[data-db-condition]')).forEach((conditionalElement) => {
    const conditionRecord = parseConditionAttribute(conditionalElement.getAttribute('data-db-condition'));
    if (conditionRecord && !evaluateConditionRecord(registryRecord, conditionRecord)) conditionalElement.remove();
  });
  return serializeMarkupDocument(parsedDocument, markupText);
};

export default stripFailingConditionalMarkup;
