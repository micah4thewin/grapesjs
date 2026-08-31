const sanitizeSvgMarkup = (svgMarkup) => {
  const markupParser = new DOMParser();
  const parsedDocument = markupParser.parseFromString(String(svgMarkup || ''), 'image/svg+xml');
  const rootElement = parsedDocument.documentElement;
  if (!rootElement || rootElement.nodeName.toLowerCase() !== 'svg') return '';
  const forbiddenSelector = 'script, foreignObject, iframe, object, embed, link, meta, style, animate, set';
  rootElement.querySelectorAll(forbiddenSelector).forEach((forbiddenNode) => forbiddenNode.remove());
  const allElements = [rootElement, ...rootElement.querySelectorAll('*')];
  allElements.forEach((currentElement) => {
    [...currentElement.attributes].forEach((currentAttribute) => {
      const attributeName = currentAttribute.name.toLowerCase();
      const compactValue = String(currentAttribute.value || '').replace(/\s+/g, '');
      const hasEventHandler = attributeName.startsWith('on');
      const hasDangerousValue = /(javascript|vbscript|data:text\/html):/i.test(compactValue);
      if (hasEventHandler || hasDangerousValue) currentElement.removeAttribute(currentAttribute.name);
    });
  });
  return rootElement.outerHTML;
};

export default sanitizeSvgMarkup;
