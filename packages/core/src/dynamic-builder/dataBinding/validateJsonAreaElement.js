import isPlainRecord from '../support/isPlainRecord.js';

const validateJsonAreaElement = (jsonAreaElement) => {
  if (!jsonAreaElement) return null;
  const rawText = String(jsonAreaElement.value || '').trim();
  let parsedValue = null;
  if (rawText) {
    try {
      const candidateValue = JSON.parse(rawText);
      if (isPlainRecord(candidateValue) || Array.isArray(candidateValue)) parsedValue = candidateValue;
    } catch {
      parsedValue = null;
    }
  }
  const isValidValue = parsedValue !== null;
  jsonAreaElement.classList.toggle('gjs-db-trait-invalid', !isValidValue);
  if (isValidValue) jsonAreaElement.removeAttribute('title');
  else jsonAreaElement.setAttribute('title', 'Source JSON must parse as an object or an array');
  return parsedValue;
};

export default validateJsonAreaElement;
