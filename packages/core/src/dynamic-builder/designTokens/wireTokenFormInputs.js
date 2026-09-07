import markTokenFieldError from './markTokenFieldError.js';
import refreshTokenFormStates from './refreshTokenFormStates.js';
import validateTokenValue from './validateTokenValue.js';

const wireTokenFormInputs = (formElement, previewNow) => {
  let previewTimer = null;
  const schedulePreview = () => {
    if (previewTimer) clearTimeout(previewTimer);
    previewTimer = setTimeout(previewNow, 150);
  };
  const findField = (targetElement) =>
    targetElement && targetElement.closest ? targetElement.closest('[data-db-token-field]') : null;
  formElement.addEventListener('input', (inputEvent) => {
    const fieldElement = findField(inputEvent.target);
    if (!fieldElement) return;
    if (inputEvent.target.hasAttribute('data-db-token-swatch')) {
      const textInput = fieldElement.querySelector('[data-db-token-group]');
      if (textInput) textInput.value = inputEvent.target.value;
    }
    refreshTokenFormStates(formElement);
    schedulePreview();
  });
  formElement.addEventListener('change', (changeEvent) => {
    const fieldElement = findField(changeEvent.target);
    const inputElement = changeEvent.target;
    if (!fieldElement || !inputElement.hasAttribute('data-db-token-group')) return;
    const errorMessage = validateTokenValue(
      inputElement.getAttribute('data-db-token-group'),
      inputElement.getAttribute('data-db-token-name'),
      inputElement.value,
    );
    markTokenFieldError(fieldElement, errorMessage);
  });
  formElement.addEventListener('click', (clickEvent) => {
    const resetButton =
      clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('[data-db-token-reset-field]') : null;
    const fieldElement = findField(resetButton);
    const textInput = fieldElement ? fieldElement.querySelector('[data-db-token-group]') : null;
    if (!textInput) return;
    textInput.value = textInput.getAttribute('data-db-token-baseline') || '';
    markTokenFieldError(fieldElement, '');
    refreshTokenFormStates(formElement);
    schedulePreview();
    textInput.focus();
  });
};

export default wireTokenFormInputs;
