import escapeHtmlText from '../support/escapeHtmlText.js';
import formatColorAsHex from './formatColorAsHex.js';
import formatTokenCssVariableName from './formatTokenCssVariableName.js';
import getIconMarkup from '../support/getIconMarkup.js';
import resolveTokenDescription from './resolveTokenDescription.js';

const buildTokenFieldMarkup = (groupKey, tokenName, tokenValue, baselineValue) => {
  const valueText = String(tokenValue == null ? '' : tokenValue);
  const baselineText = String(baselineValue == null ? '' : baselineValue);
  const description = resolveTokenDescription(groupKey, tokenName);
  const safeGroup = escapeHtmlText(groupKey);
  const safeName = escapeHtmlText(tokenName);
  const safeLabel = escapeHtmlText(description.label);
  const fieldId = `db-token-${safeGroup}-${safeName}`;
  const variableName = escapeHtmlText(formatTokenCssVariableName(groupKey, tokenName));
  const helpText = description.help ? `${escapeHtmlText(description.help)} \u00b7 ` : '';
  const swatchMarkup =
    groupKey === 'color'
      ? [
          `<input type="color" class="gjs-db-token-swatch" value="${formatColorAsHex(valueText, '#000000')}"`,
          ` data-db-token-swatch aria-label="Pick a colour for ${safeLabel}" />`,
        ].join('')
      : '';
  return [
    `<div class="gjs-db-field gjs-db-token-field" data-db-token-field="${safeGroup}.${safeName}">`,
    `<label class="gjs-db-field-label" for="${fieldId}">${safeLabel}`,
    ' <span class="gjs-db-badge gjs-db-token-default-badge" data-db-token-default-badge hidden>Default</span>',
    '</label>',
    '<div class="gjs-db-token-row">',
    swatchMarkup,
    `<input id="${fieldId}" class="gjs-db-field-input" type="text" value="${escapeHtmlText(valueText)}"`,
    ` autocomplete="off" data-db-token-group="${safeGroup}" data-db-token-name="${safeName}"`,
    ` data-db-token-baseline="${escapeHtmlText(baselineText)}" />`,
    '<button type="button" class="gjs-db-token-reset" data-db-token-reset-field',
    ` title="Back to default" aria-label="Back to default for ${safeLabel}">`,
    getIconMarkup('undo', { size: 14 }),
    '</button>',
    '</div>',
    `<span class="gjs-db-field-help">${helpText}<code>${variableName}</code></span>`,
    '<span class="gjs-db-token-contrast" data-db-token-contrast hidden></span>',
    '<span class="gjs-db-token-usage gjs-db-muted" data-db-token-usage hidden></span>',
    '<span class="gjs-db-token-error" data-db-token-error role="alert" hidden></span>',
    '</div>',
  ].join('');
};

export default buildTokenFieldMarkup;
