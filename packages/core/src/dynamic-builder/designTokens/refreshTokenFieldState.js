import formatColorAsHex from './formatColorAsHex.js';
import markTokenFieldError from './markTokenFieldError.js';
import updateTokenContrastReadout from './updateTokenContrastReadout.js';
import validateTokenValue from './validateTokenValue.js';

const refreshTokenFieldState = (fieldElement, tokenRecord) => {
  const inputElement = fieldElement.querySelector('[data-db-token-group]');
  if (!inputElement) return;
  const groupKey = inputElement.getAttribute('data-db-token-group');
  const tokenName = inputElement.getAttribute('data-db-token-name');
  const value = String(inputElement.value || '').trim();
  const baselineValue = inputElement.getAttribute('data-db-token-baseline') || '';
  const isDefault = !value || value === baselineValue;
  const badgeElement = fieldElement.querySelector('[data-db-token-default-badge]');
  if (badgeElement) badgeElement.hidden = !isDefault;
  const resetButton = fieldElement.querySelector('[data-db-token-reset-field]');
  if (resetButton) resetButton.hidden = isDefault;
  const swatchElement = fieldElement.querySelector('[data-db-token-swatch]');
  if (swatchElement) swatchElement.value = formatColorAsHex(value, swatchElement.value);
  const contrastElement = fieldElement.querySelector('[data-db-token-contrast]');
  if (contrastElement && groupKey === 'color') updateTokenContrastReadout(contrastElement, tokenName, tokenRecord);
  const wasInvalid = inputElement.classList.contains('gjs-db-field-invalid');
  if (wasInvalid) markTokenFieldError(fieldElement, validateTokenValue(groupKey, tokenName, value));
};

export default refreshTokenFieldState;
