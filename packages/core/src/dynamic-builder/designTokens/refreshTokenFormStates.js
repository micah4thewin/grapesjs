import collectTokenValuesFromForm from './collectTokenValuesFromForm.js';
import refreshTokenFieldState from './refreshTokenFieldState.js';

const refreshTokenFormStates = (formElement) => {
  const tokenRecord = collectTokenValuesFromForm(formElement);
  formElement
    .querySelectorAll('[data-db-token-field]')
    .forEach((fieldElement) => refreshTokenFieldState(fieldElement, tokenRecord));
  return tokenRecord;
};

export default refreshTokenFormStates;
