const markTokenFieldError = (fieldElement, errorMessage) => {
  const inputElement = fieldElement.querySelector('[data-db-token-group]');
  const errorElement = fieldElement.querySelector('[data-db-token-error]');
  const messageText = errorMessage || '';
  if (inputElement) {
    inputElement.classList.toggle('gjs-db-field-invalid', !!messageText);
    if (messageText) inputElement.setAttribute('aria-invalid', 'true');
    else inputElement.removeAttribute('aria-invalid');
  }
  if (errorElement) {
    errorElement.hidden = !messageText;
    errorElement.textContent = messageText;
  }
  return !messageText;
};

export default markTokenFieldError;
