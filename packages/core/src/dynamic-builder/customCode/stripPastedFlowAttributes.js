const stripPastedFlowAttributes = (htmlMarkup) => {
  const markupText = String(htmlMarkup || '');
  if (typeof DOMParser === 'undefined' || markupText.indexOf('data-db-flows') < 0) return markupText;
  const parsedDocument = new DOMParser().parseFromString(
    '<!doctype html><html><head></head><body>' + markupText + '</body></html>',
    'text/html',
  );
  const bodyElement = parsedDocument.body;
  if (!bodyElement) return markupText;
  [...bodyElement.querySelectorAll('[data-db-flows]')].forEach((element) => element.removeAttribute('data-db-flows'));
  return bodyElement.innerHTML;
};

export default stripPastedFlowAttributes;
