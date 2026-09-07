import escapeHtmlText from '../support/escapeHtmlText.js';
import formatTokenCssVariableName from '../designTokens/formatTokenCssVariableName.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveTokenDescription from '../designTokens/resolveTokenDescription.js';

const buildTokenBindingMenuMarkup = (groupKey, tokenRecord, currentValue) => {
  const groupRecord = isPlainRecord(tokenRecord) && isPlainRecord(tokenRecord[groupKey]) ? tokenRecord[groupKey] : {};
  const itemsMarkup = Object.keys(groupRecord)
    .map((tokenName) => {
      const variableValue = `var(${formatTokenCssVariableName(groupKey, tokenName)})`;
      const isCurrent = String(currentValue || '').trim() === variableValue;
      const dotMarkup =
        groupKey === 'color'
          ? `<span class="gjs-db-token-dot" style="background-color:${escapeHtmlText(groupRecord[tokenName])}"></span>`
          : '';
      return [
        `<button type="button" class="gjs-db-menu-item" role="menuitemradio" aria-checked="${isCurrent ? 'true' : 'false'}"`,
        ` data-db-token-value="${escapeHtmlText(variableValue)}">`,
        dotMarkup,
        `<span>${escapeHtmlText(resolveTokenDescription(groupKey, tokenName).label)}</span>`,
        `<span class="gjs-db-token-menu-value">${escapeHtmlText(groupRecord[tokenName])}</span>`,
        '</button>',
      ].join('');
    })
    .join('');
  return [
    '<div class="gjs-db-menu gjs-db-token-menu" role="menu" aria-label="Site values">',
    itemsMarkup || '<span class="gjs-db-menu-item gjs-db-muted">No site values for this field</span>',
    '<div class="gjs-db-menu-separator"></div>',
    '<button type="button" class="gjs-db-menu-item" role="menuitem" data-db-token-clear>Use a fixed value instead</button>',
    '</div>',
  ].join('');
};

export default buildTokenBindingMenuMarkup;
