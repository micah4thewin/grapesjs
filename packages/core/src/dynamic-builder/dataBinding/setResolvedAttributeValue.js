import isSafeAttributeValue from '../support/isSafeAttributeValue.js';

const urlAttributeNames = ['href', 'src', 'srcset', 'action', 'formaction', 'poster', 'data', 'cite', 'xlink:href'];

const setResolvedAttributeValue = (element, attributeName, resolvedValue) => {
  const lowerName = String(attributeName || '').toLowerCase();
  const isUrlAttribute = urlAttributeNames.indexOf(lowerName) >= 0;
  const safeValue = isUrlAttribute && !isSafeAttributeValue(resolvedValue) ? '' : resolvedValue;
  element.setAttribute(attributeName, safeValue);
};

export default setResolvedAttributeValue;
