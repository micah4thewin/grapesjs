import getTourThemeTokenNames from './getTourThemeTokenNames.js';

const mirrorTourThemeTokens = (containerElement) => {
  const ownerDocument = containerElement && containerElement.ownerDocument;
  const targetWindow = ownerDocument && ownerDocument.defaultView;
  const rootElement = ownerDocument && ownerDocument.documentElement;
  if (!targetWindow || !rootElement || typeof targetWindow.getComputedStyle !== 'function') return false;
  const computedStyle = targetWindow.getComputedStyle(containerElement);
  getTourThemeTokenNames().forEach((tokenName) => {
    const tokenValue = String(computedStyle.getPropertyValue(tokenName) || '').trim();
    if (tokenValue) rootElement.style.setProperty(tokenName, tokenValue);
  });
  return true;
};

export default mirrorTourThemeTokens;
