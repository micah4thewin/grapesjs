import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildKeyValueRowsMarkup = (rowRecord, rowKind, keyPlaceholder, valuePlaceholder) => {
  const rowEntries = Object.keys(rowRecord).map((keyName) => [keyName, String(rowRecord[keyName])]);
  if (!rowEntries.length) rowEntries.push(['', '']);
  return rowEntries
    .map(
      ([keyName, keyValue]) =>
        `<div class="gjs-db-kv-row" data-db-kv-row="${rowKind}">` +
        `<input class="gjs-db-field-input" data-db-kv-key value="${escapeHtmlText(keyName)}" placeholder="${escapeHtmlText(keyPlaceholder)}" aria-label="${escapeHtmlText(keyPlaceholder)}">` +
        `<input class="gjs-db-field-input" data-db-kv-value value="${escapeHtmlText(keyValue)}" placeholder="${escapeHtmlText(valuePlaceholder)}" aria-label="${escapeHtmlText(valuePlaceholder)}">` +
        `<button type="button" class="gjs-db-menu-icon-button" data-db-kv-remove title="Remove">${getIconMarkup('trash', { size: 14, label: 'Remove' })}</button>` +
        '</div>',
    )
    .join('');
};

export default buildKeyValueRowsMarkup;
