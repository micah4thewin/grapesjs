const collectTokenValuesFromForm = (formElement) => {
  const tokenRecord = {};
  if (!formElement || !formElement.querySelectorAll) return tokenRecord;
  formElement.querySelectorAll('[data-db-token-group]').forEach((inputElement) => {
    const groupKey = inputElement.getAttribute('data-db-token-group');
    const tokenName = inputElement.getAttribute('data-db-token-name');
    const tokenValue = String(inputElement.value == null ? '' : inputElement.value).trim();
    if (!groupKey || !tokenName || !tokenValue) return;
    if (!tokenRecord[groupKey]) tokenRecord[groupKey] = {};
    tokenRecord[groupKey][tokenName] = tokenValue;
  });
  return tokenRecord;
};

export default collectTokenValuesFromForm;
