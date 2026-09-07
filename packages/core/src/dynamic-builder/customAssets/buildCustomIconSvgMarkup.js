import decodeBasicHtmlEntities from './decodeBasicHtmlEntities.js';
import parseSvgRootElement from '../icons/parseSvgRootElement.js';

const applyAccessibilityAttributes = (rootElement, accessibleLabel) => {
  rootElement.setAttribute('focusable', 'false');
  if (!accessibleLabel) {
    rootElement.removeAttribute('role');
    rootElement.removeAttribute('aria-label');
    rootElement.setAttribute('aria-hidden', 'true');
    return;
  }
  rootElement.removeAttribute('aria-hidden');
  rootElement.setAttribute('role', 'img');
  rootElement.setAttribute('aria-label', decodeBasicHtmlEntities(accessibleLabel));
};

const buildCustomIconSvgMarkup = (iconRecord, options = {}) => {
  const rootElement = iconRecord ? parseSvgRootElement(iconRecord.markup) : null;
  if (!rootElement) return '';
  const iconSize = Math.max(8, Math.round(Number(options.size) || 24));
  rootElement.setAttribute('width', String(iconSize));
  rootElement.setAttribute('height', String(iconSize));
  applyAccessibilityAttributes(rootElement, String(options.label || ''));
  return rootElement.outerHTML;
};

export default buildCustomIconSvgMarkup;
