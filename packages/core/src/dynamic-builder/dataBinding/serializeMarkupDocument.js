const serializeMarkupDocument = (parsedDocument, originalMarkup) => {
  const markupText = String(originalMarkup == null ? '' : originalMarkup);
  if (!parsedDocument) return markupText;
  if (/<html[\s>]/i.test(markupText)) {
    return parsedDocument.documentElement ? parsedDocument.documentElement.outerHTML : markupText;
  }
  if (/<body[\s>]/i.test(markupText)) {
    return parsedDocument.body ? parsedDocument.body.outerHTML : markupText;
  }
  const headMarkup = parsedDocument.head ? parsedDocument.head.innerHTML : '';
  const bodyMarkup = parsedDocument.body ? parsedDocument.body.innerHTML : '';
  return `${headMarkup}${bodyMarkup}`;
};

export default serializeMarkupDocument;
