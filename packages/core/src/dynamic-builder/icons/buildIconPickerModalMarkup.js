import buildIconPickerGridMarkup from './buildIconPickerGridMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconCategoryRecords from './getIconCategoryRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

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
  return [
    '<div class="gjs-db-form gjs-db-icon-picker">',
    '<div class="gjs-db-icon-search">',
    getIconMarkup('search', { size: 16 }),
    '<input type="search" class="gjs-db-field-input" data-db-icon-search',
    ' placeholder="Search icons by name, like arrow, cart or phone" autocomplete="off">',
    '</div>',
    `<div class="gjs-db-chip-row" data-db-icon-categories>${categoryChipsMarkup}</div>`,
    `<div class="gjs-db-icon-results" data-db-icon-results>${buildIconPickerGridMarkup('all', '', selectedIconName)}</div>`,
    '</div>',
  ].join('');
};

export default buildIconPickerModalMarkup;
