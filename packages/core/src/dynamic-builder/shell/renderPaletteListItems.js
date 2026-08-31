import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const renderPaletteListItems = (listElement, actionRecords, activeIndex) => {
  const emptyMarkup = [
    '<li class="gjs-db-palette-item gjs-db-muted" role="option" aria-selected="false" aria-disabled="true">',
    'No matching actions</li>',
  ].join('');
  const itemsMarkup = actionRecords
    .map((actionRecord, itemIndex) => {
      const selectedText = itemIndex === activeIndex ? 'true' : 'false';
      return [
        `<li class="gjs-db-palette-item" role="option" id="db-palette-option-${itemIndex}"`,
        ` data-db-palette-index="${itemIndex}" aria-selected="${selectedText}">`,
        getIconMarkup(actionRecord.iconName, { size: 16 }),
        `<span>${escapeHtmlText(actionRecord.label)}</span>`,
        '</li>',
      ].join('');
    })
    .join('');
  listElement.innerHTML = itemsMarkup || emptyMarkup;
  const activeElement = listElement.querySelector('[aria-selected="true"]');
  if (activeElement && activeElement.scrollIntoView) activeElement.scrollIntoView({ block: 'nearest' });
};

export default renderPaletteListItems;
