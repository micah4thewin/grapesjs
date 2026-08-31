const sanitizeHtmlMarkup = (htmlMarkup, options = {}) => {
  const markupParser = new DOMParser();
  const parsedDocument = markupParser.parseFromString(String(htmlMarkup || ''), 'text/html');
  const forbiddenTags = ['script', 'object', 'embed', 'base', 'meta'];
  const iframeAllowed = !!options.allowIframes;
  if (!iframeAllowed) forbiddenTags.push('iframe');
  parsedDocument.body.querySelectorAll(forbiddenTags.join(', ')).forEach((forbiddenNode) => forbiddenNode.remove());
  parsedDocument.body.querySelectorAll('*').forEach((currentElement) => {
    [...currentElement.attributes].forEach((currentAttribute) => {
      const attributeName = currentAttribute.name.toLowerCase();
      const compactValue = String(currentAttribute.value || '').replace(/\s+/g, '');
      const hasEventHandler = attributeName.startsWith('on');
      const hasDangerousValue = /(javascript|vbscript|data:text\/html):/i.test(compactValue);
      if (hasEventHandler || hasDangerousValue) currentElement.removeAttribute(currentAttribute.name);
    });
    if (iframeAllowed && currentElement.tagName.toLowerCase() === 'iframe') {
      currentElement.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');
      currentElement.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      if (!currentElement.getAttribute('loading')) currentElement.setAttribute('loading', 'lazy');
    }
  });
  return parsedDocument.body.innerHTML;
};

export default sanitizeHtmlMarkup;
