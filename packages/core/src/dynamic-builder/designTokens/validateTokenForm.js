import markTokenFieldError from './markTokenFieldError.js';
import validateTokenValue from './validateTokenValue.js';

const validateTokenForm = (formElement) => {
  const invalidFields = [];
  formElement.querySelectorAll('[data-db-token-field]').forEach((fieldElement) => {
    const inputElement = fieldElement.querySelector('[data-db-token-group]');
    if (!inputElement) return;
    const errorMessage = validateTokenValue(
      inputElement.getAttribute('data-db-token-group'),
      inputElement.getAttribute('data-db-token-name'),
      inputElement.value,
    );
    markTokenFieldError(fieldElement, errorMessage);
    if (errorMessage) invalidFields.push(fieldElement);
  });
  return invalidFields;
};

export default validateTokenForm;
