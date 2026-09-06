import isSafeAttributeValue from './isSafeAttributeValue.js';

const forbiddenLocalNames = [
  'script',
  'foreignobject',
  'iframe',
  'object',
  'embed',
  'link',
  'meta',
  'style',
  'animate',
  'set',
  'animatemotion',
  'animatetransform',
  'handler',
  'audio',
  'video',
];

const isSafeReferenceValue = (referenceValue) => {
  const trimmedValue = String(referenceValue || '').trim();
  if (!trimmedValue || trimmedValue.charAt(0) === '#') return true;
  return /^(https?:)?\/\//i.test(trimmedValue) || /^data:image\//i.test(trimmedValue);
};

const sanitizeSvgMarkup = (svgMarkup) => {
  if (typeof DOMParser === 'undefined') return '';
  const markupParser = new DOMParser();
  const parsedDocument = markupParser.parseFromString(String(svgMarkup || ''), 'image/svg+xml');
  const rootElement = parsedDocument.documentElement;
  if (!rootElement || String(rootElement.localName || '').toLowerCase() !== 'svg') return '';
  if (parsedDocument.getElementsByTagName('parsererror').length) return '';
  [...rootElement.querySelectorAll('*')].forEach((currentElement) => {
    if (!rootElement.contains(currentElement)) return;
    const localName = String(currentElement.localName || '').toLowerCase();
    if (forbiddenLocalNames.indexOf(localName) >= 0) currentElement.remove();
  });
  const allElements = [rootElement, ...rootElement.querySelectorAll('*')];
  allElements.forEach((currentElement) => {
    [...currentElement.attributes].forEach((currentAttribute) => {
      const attributeName = currentAttribute.name.toLowerCase();
      const attributeValue = String(currentAttribute.value || '');
      const hasEventHandler = attributeName.indexOf('on') === 0;
      const isReference = attributeName === 'href' || attributeName === 'xlink:href';
      const hasUnsafeReference = isReference && !isSafeReferenceValue(attributeValue);
      if (hasEventHandler || hasUnsafeReference || !isSafeAttributeValue(attributeValue)) {
        currentElement.removeAttribute(currentAttribute.name);
      }
    });
  });
  return rootElement.outerHTML;
};

export default sanitizeSvgMarkup;
