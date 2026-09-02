import isSafeAttributeValue from './isSafeAttributeValue.js';

const sanitizeUrlValue = (urlValue) => {
  const trimmedValue = String(urlValue || '').trim();
  if (!trimmedValue) return '';
  return isSafeAttributeValue(trimmedValue) ? trimmedValue : '';
};

export default sanitizeUrlValue;
