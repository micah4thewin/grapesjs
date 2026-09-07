const setSeoFieldError = (fieldElement, validationRecord) => {
  const messageText = validationRecord ? String(validationRecord.message || '') : '';
  const isBlocking = Boolean(validationRecord && validationRecord.isBlocking && messageText);
  fieldElement.classList.toggle('gjs-db-field-invalid', isBlocking);
  if (isBlocking) fieldElement.setAttribute('aria-invalid', 'true');
  else fieldElement.removeAttribute('aria-invalid');
  const fieldWrapper = fieldElement.closest('[data-db-seo-field-wrap]');
  const errorElement = fieldWrapper && fieldWrapper.querySelector('[data-db-seo-error]');
  if (!errorElement) return;
  errorElement.textContent = messageText;
  errorElement.hidden = !messageText;
  errorElement.classList.toggle('gjs-db-field-error-note', Boolean(messageText) && !isBlocking);
};

export default setSeoFieldError;
