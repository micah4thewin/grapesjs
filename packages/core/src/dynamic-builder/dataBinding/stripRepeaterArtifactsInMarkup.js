import expandRepeaterElement from './expandRepeaterElement.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import parseMarkupDocument from './parseMarkupDocument.js';
import serializeMarkupDocument from './serializeMarkupDocument.js';

const stripRepeaterArtifactsInMarkup = (editor, htmlString) => {
  const markupText = String(htmlString == null ? '' : htmlString);
  const parsedDocument = parseMarkupDocument(markupText);
  if (!parsedDocument) return markupText;
  Array.from(parsedDocument.querySelectorAll('[data-db-repeater-preview]')).forEach((previewElement) =>
    previewElement.remove(),
  );
  const registryRecord = getDataSourceRegistry(editor);
  Array.from(parsedDocument.querySelectorAll('[data-db-repeater]')).forEach((repeaterElement) =>
    expandRepeaterElement(registryRecord, repeaterElement),
  );
  return serializeMarkupDocument(parsedDocument, markupText);
};

export default stripRepeaterArtifactsInMarkup;
