import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildSymbolCardMarkup = (symbolRecord, instanceCount) => {
  const usageText = instanceCount === 1 ? 'Used on 1 spot' : 'Used in ' + instanceCount + ' spots';
  const symbolIdAttribute = escapeHtmlText(symbolRecord.id);
  const buildActionMarkup = (actionName, actionLabel, iconName) =>
    '<button type="button" class="gjs-db-button gjs-db-symbol-action" data-db-symbol-action="' +
    actionName +
    '" data-db-symbol-id="' +
    symbolIdAttribute +
    '" title="' +
    escapeHtmlText(actionLabel) +
    '" aria-label="' +
    escapeHtmlText(actionLabel + ' ' + symbolRecord.name) +
    '">' +
    getIconMarkup(iconName, { size: 15 }) +
    '</button>';
  return [
    '<li class="gjs-db-symbol-card">',
    '<span class="gjs-db-symbol-card-icon">' + getIconMarkup('symbols', { size: 18 }) + '</span>',
    '<span class="gjs-db-symbol-card-body">',
    '<span class="gjs-db-symbol-card-name">' + escapeHtmlText(symbolRecord.name) + '</span>',
    '<span class="gjs-db-symbol-card-meta">' + escapeHtmlText(usageText) + '</span>',
    '</span>',
    '<span class="gjs-db-symbol-card-actions">',
    buildActionMarkup('insert', 'Add to this page', 'plus'),
    buildActionMarkup('insert-all', 'Add to every page', 'copy'),
    buildActionMarkup('rename', 'Rename', 'edit'),
    buildActionMarkup('delete', 'Delete', 'trash'),
    '</span>',
    '</li>',
  ].join('');
};

export default buildSymbolCardMarkup;
