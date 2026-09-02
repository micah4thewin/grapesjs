import stripControlCharacters from './stripControlCharacters.js';

const isSafeAttributeValue = (attributeValue) => {
  const compactValue = stripControlCharacters(attributeValue);
  if (/^(javascript|vbscript):/i.test(compactValue)) return false;
  if (/^data:/i.test(compactValue) && !/^data:image\//i.test(compactValue)) return false;
  return true;
};

export default isSafeAttributeValue;
