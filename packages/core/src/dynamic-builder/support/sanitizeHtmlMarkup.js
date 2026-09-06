import isSafeAttributeValue from './isSafeAttributeValue.js';

const alwaysForbiddenTags = [
  'object',
  'embed',
  'base',
  'noscript',
  'template',
  'xmp',
  'plaintext',
  'applet',
  'frame',
  'frameset',
  'animate',
  'set',
  'animatemotion',
  'animatetransform',
  'handler',
];

const isAllowedFrameSource = (sourceValue) => {
  const trimmedValue = String(sourceValue || '').trim();
  if (!trimmedValue || trimmedValue === 'about:blank') return true;
  return /^(https?:)?\/\//i.test(trimmedValue);
};

const sanitizeParsedElement = (currentElement, options) => {
  [...currentElement.attributes].forEach((currentAttribute) => {
    const attributeName = currentAttribute.name.toLowerCase();
    const attributeValue = String(currentAttribute.value || '');
    const hasEventHandler = attributeName.indexOf('on') === 0;
    const isInlineDocument = attributeName === 'srcdoc';
    const hasDangerousStyle = attributeName === 'style' && /expression\s*\(|javascript\s*:/i.test(attributeValue);
    if (hasEventHandler || isInlineDocument || hasDangerousStyle || !isSafeAttributeValue(attributeValue)) {
      currentElement.removeAttribute(currentAttribute.name);
    }
  });
  const localName = String(currentElement.localName || '').toLowerCase();
  if (localName === 'meta' && currentElement.hasAttribute('http-equiv')) currentElement.removeAttribute('http-equiv');
  if (localName === 'iframe') {
    if (!isAllowedFrameSource(currentElement.getAttribute('src'))) currentElement.removeAttribute('src');
    currentElement.setAttribute('sandbox', 'allow-scripts allow-popups allow-forms');
    currentElement.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    if (!currentElement.getAttribute('loading')) currentElement.setAttribute('loading', 'lazy');
  }
  if ((localName === 'a' || localName === 'area') && options.forceBlankTargetRel) {
    const targetValue = String(currentElement.getAttribute('target') || '').toLowerCase();
    if (targetValue === '_blank') currentElement.setAttribute('rel', 'noopener noreferrer');
  }
};

const sanitizeOnce = (htmlMarkup, options) => {
  const markupParser = new DOMParser();
  const parsedDocument = markupParser.parseFromString(
    '<!doctype html><html><head></head><body>' + String(htmlMarkup || '') + '</body></html>',
    'text/html',
  );
  const bodyElement = parsedDocument.body;
  if (!bodyElement) return '';
  const forbiddenTags = alwaysForbiddenTags.slice();
  if (!options.allowScripts) forbiddenTags.push('script');
  if (!options.allowIframes) forbiddenTags.push('iframe');
  [...bodyElement.querySelectorAll('*')].forEach((currentElement) => {
    if (!bodyElement.contains(currentElement)) return;
    const localName = String(currentElement.localName || '').toLowerCase();
    if (forbiddenTags.indexOf(localName) >= 0) {
      currentElement.remove();
      return;
    }
    sanitizeParsedElement(currentElement, options);
  });
  return bodyElement.innerHTML;
};

const sanitizeHtmlMarkup = (htmlMarkup, options = {}) => {
  const resolvedOptions = { allowIframes: false, allowScripts: false, forceBlankTargetRel: true, ...options };
  if (typeof DOMParser === 'undefined') return '';
  return sanitizeOnce(sanitizeOnce(htmlMarkup, resolvedOptions), resolvedOptions);
};

export default sanitizeHtmlMarkup;
