import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildSymbolCardActionMarkup = (symbolRecord, actionName, labelText, actionOptions = {}) => {
  const classNames = ['gjs-db-button', 'gjs-db-symbol-action'];
  if (actionOptions.primary) classNames.push('gjs-db-button-primary');
  if (actionOptions.iconOnly) classNames.push('gjs-db-symbol-action-icon');
  return [
    '<button type="button" class="' + classNames.join(' ') + '"',
    ' data-db-symbol-action="' + actionName + '"',
    ' data-db-symbol-id="' + escapeHtmlText(symbolRecord.id) + '"',
    ' title="' + escapeHtmlText(labelText) + '"',
    ' aria-label="' + escapeHtmlText(labelText + ' ' + symbolRecord.name) + '">',
    actionOptions.iconName ? getIconMarkup(actionOptions.iconName, { size: 15 }) : '',
    actionOptions.iconOnly ? '' : '<span>' + escapeHtmlText(labelText) + '</span>',
    '</button>',
  ].join('');
};

export default buildSymbolCardActionMarkup;
