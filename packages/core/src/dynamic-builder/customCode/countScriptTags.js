const countScriptTags = (markupText) => {
  if (typeof DOMParser === 'undefined') return 0;
  const parsedDocument = new DOMParser().parseFromString(
    '<!doctype html><html><head></head><body>' + String(markupText || '') + '</body></html>',
    'text/html',
  );
  return parsedDocument.body ? parsedDocument.body.querySelectorAll('script').length : 0;
};

export default countScriptTags;
