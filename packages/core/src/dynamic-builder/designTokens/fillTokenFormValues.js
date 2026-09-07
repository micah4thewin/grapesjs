import isPlainRecord from '../support/isPlainRecord.js';

const fillTokenFormValues = (formElement, tokenRecord) => {
  const safeRecord = isPlainRecord(tokenRecord) ? tokenRecord : {};
  formElement.querySelectorAll('[data-db-token-group]').forEach((inputElement) => {
    const groupRecord = safeRecord[inputElement.getAttribute('data-db-token-group')];
    const tokenValue = isPlainRecord(groupRecord) ? groupRecord[inputElement.getAttribute('data-db-token-name')] : '';
    inputElement.value = tokenValue == null ? '' : String(tokenValue);
  });
};

export default fillTokenFormValues;
