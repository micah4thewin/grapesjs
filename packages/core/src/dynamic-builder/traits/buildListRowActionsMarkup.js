import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildActionButton = (attributeText, labelText, iconName, isDisabled) =>
  [
    `<button type="button" class="gjs-db-menu-icon-button" ${attributeText}`,
    ` aria-label="${escapeHtmlText(labelText)}" title="${escapeHtmlText(labelText)}"${isDisabled ? ' disabled' : ''}>`,
    getIconMarkup(iconName, { size: 14 }),
    '</button>',
  ].join('');

const buildListRowActionsMarkup = (rowIndex, rowCount, itemLabel) => {
  const itemText = `${itemLabel} ${rowIndex + 1}`;
  return [
    '<div class="gjs-db-menu-row-actions">',
    buildActionButton('data-db-menu-move="-1"', `Move ${itemText} up`, 'arrowUp', rowIndex === 0),
    buildActionButton('data-db-menu-move="1"', `Move ${itemText} down`, 'arrowDown', rowIndex >= rowCount - 1),
    buildActionButton('data-db-menu-remove="true"', `Remove ${itemText}`, 'trash', false),
    '</div>',
  ].join('');
};

export default buildListRowActionsMarkup;
