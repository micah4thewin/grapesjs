import escapeHtmlText from '../support/escapeHtmlText.js';
import formatTokenCssVariableName from './formatTokenCssVariableName.js';
import formatTokenLabelText from './formatTokenLabelText.js';

const buildTokenFieldMarkup = (groupKey, tokenName, tokenValue) => {
  const valueText = String(tokenValue == null ? '' : tokenValue);
  const usesColorInput = groupKey === 'color' && /^#[0-9a-fA-F]{6}$/.test(valueText);
  const inputType = usesColorInput ? 'color' : 'text';
  const safeValue = escapeHtmlText(valueText);
  const safeLabel = escapeHtmlText(formatTokenLabelText(tokenName));
  const safeVariable = escapeHtmlText(formatTokenCssVariableName(groupKey, tokenName));
  return [
    '<label class="gjs-db-field">',
    `<span class="gjs-db-field-label">${safeLabel}</span>`,
    `<input class="gjs-db-field-input" type="${inputType}" value="${safeValue}"`,
    ` data-db-token-group="${escapeHtmlText(groupKey)}" data-db-token-name="${escapeHtmlText(tokenName)}" />`,
    `<span class="gjs-db-field-help gjs-db-muted">${safeVariable}</span>`,
    '</label>',
  ].join('');
};

export default buildTokenFieldMarkup;
