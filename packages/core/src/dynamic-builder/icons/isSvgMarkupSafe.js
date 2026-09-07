import getUnsafeSvgLocalNames from './getUnsafeSvgLocalNames.js';
import isSafeAttributeValue from '../support/isSafeAttributeValue.js';
import parseSvgRootElement from './parseSvgRootElement.js';

const isSvgMarkupSafe = (svgMarkup) => {
  const rootElement = parseSvgRootElement(svgMarkup);
  if (!rootElement) return false;
  const unsafeLocalNames = getUnsafeSvgLocalNames();
  const isSafeElement = (currentElement) => {
    if (unsafeLocalNames.indexOf(String(currentElement.localName || '').toLowerCase()) >= 0) return false;
    return [...currentElement.attributes].every(
      (currentAttribute) =>
        currentAttribute.name.toLowerCase().indexOf('on') !== 0 &&
        isSafeAttributeValue(String(currentAttribute.value || '')),
    );
  };
  return [rootElement, ...rootElement.querySelectorAll('*')].every(isSafeElement);
};

export default isSvgMarkupSafe;
