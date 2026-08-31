import escapeHtmlText from '../support/escapeHtmlText.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const buildHeadLinkTagMarkup = (relValue, hrefValue) => {
  const safeHref = sanitizeUrlValue(hrefValue);
  if (!safeHref) return '';
  return '<link rel="' + escapeHtmlText(relValue) + '" href="' + escapeHtmlText(safeHref) + '">';
};

export default buildHeadLinkTagMarkup;
