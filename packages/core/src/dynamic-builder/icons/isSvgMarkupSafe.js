import parseSvgRootElement from './parseSvgRootElement.js';
import sanitizeSvgMarkup from '../support/sanitizeSvgMarkup.js';

const isSvgMarkupSafe = (svgMarkup) => {
  const rootElement = parseSvgRootElement(svgMarkup);
  if (!rootElement) return false;
  return sanitizeSvgMarkup(svgMarkup) === rootElement.outerHTML;
};

export default isSvgMarkupSafe;
