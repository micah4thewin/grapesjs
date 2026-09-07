import buildIconPickerGridMarkup from './buildIconPickerGridMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconCategoryRecords from './getIconCategoryRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';
import splitIconNameWords from './splitIconNameWords.js';

const buildIconPickerModalMarkup = (selectedIconName) => {
  const categoryChipsMarkup = [{ categoryId: 'all', categoryLabel: 'All icons' }, ...getIconCategoryRecords()]
    .map((categoryRecord) => {
      const activeClass = categoryRecord.categoryId === 'all' ? ' gjs-db-chip-active' : '';
      return [
        `<button type="button" class="gjs-db-chip${activeClass}"`,
        ` data-db-icon-category="${escapeHtmlText(categoryRecord.categoryId)}">`,
        escapeHtmlText(categoryRecord.categoryLabel),
        '</button>',
      ].join('');
    })
    .join('');
  const currentLabel = selectedIconName ? 'Current: ' + splitIconNameWords(selectedIconName) : 'No icon chosen yet';
  return [
    '<div class="gjs-db-form gjs-db-icon-picker">',
    '<div class="gjs-db-icon-search">',
    getIconMarkup('search', { size: 16 }),
    '<input type="search" class="gjs-db-field-input" data-db-icon-search',
    ' aria-label="Search icons" placeholder="Search icons by name, like arrow, cart or phone" autocomplete="off">',
    `<span class="gjs-db-badge gjs-db-icon-current" data-db-icon-selected>${escapeHtmlText(currentLabel)}</span>`,
    '</div>',
    `<div class="gjs-db-chip-row" data-db-icon-categories>${categoryChipsMarkup}</div>`,
    '<p class="gjs-db-field-help gjs-db-icon-picker-help">',
    'Use the arrow keys to move around the grid, Enter to choose and Escape to close.',
    '</p>',
    `<div class="gjs-db-icon-results" data-db-icon-results>${buildIconPickerGridMarkup('all', '', selectedIconName)}</div>`,
    '</div>',
  ].join('');
};

export default buildIconPickerModalMarkup;
