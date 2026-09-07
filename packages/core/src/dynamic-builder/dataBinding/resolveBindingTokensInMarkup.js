import expandNestedRepeaters from './expandNestedRepeaters.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import parseMarkupDocument from './parseMarkupDocument.js';
import replaceBindingTokensInElement from './replaceBindingTokensInElement.js';
import serializeMarkupDocument from './serializeMarkupDocument.js';
import stripFailingConditionsInElement from './stripFailingConditionsInElement.js';

const resolveBindingTokensInMarkup = (editor, htmlString) => {
  const markupText = String(htmlString == null ? '' : htmlString);
  const parsedDocument = parseMarkupDocument(markupText);
  const rootElement = parsedDocument && (parsedDocument.documentElement || parsedDocument.body);
  if (!rootElement) return markupText;
  const registryRecord = getDataSourceRegistry(editor);
  Array.from(rootElement.querySelectorAll('[data-db-repeater-preview]')).forEach((previewElement) =>
    previewElement.remove(),
  );
  expandNestedRepeaters(registryRecord, rootElement);
  stripFailingConditionsInElement(registryRecord, rootElement);
  replaceBindingTokensInElement(registryRecord, rootElement);
  return serializeMarkupDocument(parsedDocument, markupText);
};

export default resolveBindingTokensInMarkup;
