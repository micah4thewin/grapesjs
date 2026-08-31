const injectStylesOnce = (targetDocument, styleId, cssText) => {
  if (!targetDocument || !targetDocument.head) return;
  const existingElement = targetDocument.getElementById(styleId);
  if (existingElement) {
    if (existingElement.textContent !== cssText) existingElement.textContent = cssText;
    return;
  }
  const styleElement = targetDocument.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = cssText;
  targetDocument.head.appendChild(styleElement);
};

export default injectStylesOnce;
