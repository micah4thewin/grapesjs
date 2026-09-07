import buildKeyChipsMarkup from './buildKeyChipsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import updatePaletteActiveItem from './updatePaletteActiveItem.js';

const renderPaletteListItems = (listElement, actionRecords, activeIndex, instanceSuffix, showGroupHeadings) => {
  const optionIdPrefix = 'db-palette-option' + (instanceSuffix || '') + '-';
  const emptyMarkup = [
    '<li class="gjs-db-palette-item gjs-db-muted" role="option" aria-selected="false" aria-disabled="true">',
    'No matching actions</li>',
  ].join('');
  let previousGroupTitle = '';
  const itemsMarkup = actionRecords
    .map((actionRecord, itemIndex) => {
      const groupTitle = actionRecord.groupTitle || '';
      const needsHeading = showGroupHeadings && groupTitle && groupTitle !== previousGroupTitle;
      previousGroupTitle = groupTitle || previousGroupTitle;
      const headingMarkup = needsHeading
        ? `<li class="gjs-db-palette-group" role="presentation">${escapeHtmlText(groupTitle)}</li>`
        : '';
      const hintMarkup = actionRecord.hintText
        ? `<span class="gjs-db-badge gjs-db-palette-hint">${escapeHtmlText(actionRecord.hintText)}</span>`
        : '';
      const keysMarkup = actionRecord.keysText
        ? `<span class="gjs-db-palette-keys">${buildKeyChipsMarkup(actionRecord.keysText)}</span>`
        : '';
      return [
        headingMarkup,
        `<li class="gjs-db-palette-item" role="option" id="${optionIdPrefix}${itemIndex}"`,
        ` data-db-palette-index="${itemIndex}" aria-selected="false">`,
        getIconMarkup(actionRecord.iconName, { size: 16 }),
        `<span class="gjs-db-palette-item-label">${escapeHtmlText(actionRecord.label)}</span>`,
        hintMarkup,
        keysMarkup,
        '</li>',
      ].join('');
    })
    .join('');
  listElement.innerHTML = itemsMarkup || emptyMarkup;
  updatePaletteActiveItem(listElement, activeIndex, true);
};

export default renderPaletteListItems;
