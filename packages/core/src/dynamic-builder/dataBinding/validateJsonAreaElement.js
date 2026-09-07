import isPlainRecord from '../support/isPlainRecord.js';

const describeParseError = (parseError) => {
  const messageText = String(parseError && parseError.message ? parseError.message : 'Invalid JSON');
  return `This is not valid JSON: ${messageText.replace(/^JSON\.parse: /, '')}`;
};

const validateJsonAreaElement = (jsonAreaElement) => {
  if (!jsonAreaElement) return null;
  const rawText = String(jsonAreaElement.value || '').trim();
  let parsedValue = null;
  let errorText = '';
  if (!rawText) errorText = 'Enter a list of items such as [{"name": "Ada"}], or {} for an empty record.';
  else {
    try {
      const candidateValue = JSON.parse(rawText);
      if (isPlainRecord(candidateValue) || Array.isArray(candidateValue)) parsedValue = candidateValue;
      else errorText = 'The JSON must be a list of items or a single record, not a plain value.';
    } catch (parseError) {
      errorText = describeParseError(parseError);
    }
  }
  const isValidValue = parsedValue !== null;
  jsonAreaElement.classList.toggle('gjs-db-trait-invalid', !isValidValue);
  if (isValidValue) jsonAreaElement.removeAttribute('aria-invalid');
  else jsonAreaElement.setAttribute('aria-invalid', 'true');
  const errorElement = jsonAreaElement.parentElement
    ? jsonAreaElement.parentElement.querySelector('[data-db-json-error]')
    : null;
  if (errorElement) {
    errorElement.textContent = errorText;
    errorElement.hidden = isValidValue;
  }
  return parsedValue;
};

export default validateJsonAreaElement;
