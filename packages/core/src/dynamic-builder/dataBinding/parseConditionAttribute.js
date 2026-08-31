import isPlainRecord from '../support/isPlainRecord.js';

const parseConditionAttribute = (attributeValue) => {
  const rawText = String(attributeValue == null ? '' : attributeValue).trim();
  if (!rawText) return null;
  try {
    const parsedValue = JSON.parse(rawText);
    return isPlainRecord(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
};

export default parseConditionAttribute;
