import validateTokenValue from './validateTokenValue.js';

const collectTokenValuesFromForm = (formElement, collectOptions = {}) => {
  const tokenRecord = {};
  if (!formElement || !formElement.querySelectorAll) return tokenRecord;
  formElement.querySelectorAll('[data-db-token-group]').forEach((inputElement) => {
    const groupKey = inputElement.getAttribute('data-db-token-group');
    const tokenName = inputElement.getAttribute('data-db-token-name');
    const typedValue = String(inputElement.value == null ? '' : inputElement.value).trim();
    const tokenValue = typedValue || String(inputElement.getAttribute('data-db-token-baseline') || '').trim();
    if (!groupKey || !tokenName || !tokenValue) return;
    if (collectOptions.skipInvalid && validateTokenValue(groupKey, tokenName, tokenValue)) return;
    if (!tokenRecord[groupKey]) tokenRecord[groupKey] = {};
    tokenRecord[groupKey][tokenName] = tokenValue;
  });
  return tokenRecord;
};

export default collectTokenValuesFromForm;
