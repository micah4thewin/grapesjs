import isSvgMarkupSafe from '../icons/isSvgMarkupSafe.js';
import sanitizeSvgMarkup from '../support/sanitizeSvgMarkup.js';

const sanitizeCustomIconMarkup = (svgMarkup) => {
  const sourceMarkup = String(svgMarkup || '');
  if (!sourceMarkup.trim() || !isSvgMarkupSafe(sourceMarkup)) return '';
  const safeMarkup = sanitizeSvgMarkup(sourceMarkup);
  return isSvgMarkupSafe(safeMarkup) ? safeMarkup : '';
};

export default sanitizeCustomIconMarkup;
