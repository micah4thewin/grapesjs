import collectIconPickerEntries from './collectIconPickerEntries.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import splitIconNameWords from './splitIconNameWords.js';

const buildIconPickerGridMarkup = (activeCategoryId, searchQuery, selectedIconName) => {
  const categoryEntries = collectIconPickerEntries(activeCategoryId, searchQuery);
  if (!categoryEntries.length) {
    return '<p class="gjs-db-muted">No icons match that search. Try another word.</p>';
  }
  return categoryEntries
    .map((categoryEntry) => {
      const iconButtonsMarkup = categoryEntry.iconNames
        .map((iconName) => {
          const readableName = escapeHtmlText(splitIconNameWords(iconName));
          const selectedClass = iconName === selectedIconName ? ' gjs-db-icon-cell-active' : '';
          return [
            `<button type="button" class="gjs-db-icon-cell${selectedClass}"`,
            ` data-db-icon-choice="${escapeHtmlText(iconName)}" title="${readableName}">`,
            getIconMarkup(iconName, { size: 22 }),
            `<span class="gjs-db-icon-cell-name">${readableName}</span>`,
            '</button>',
          ].join('');
        })
        .join('');
      return [
        `<h4 class="gjs-db-icon-group-title">${escapeHtmlText(categoryEntry.categoryLabel)}</h4>`,
        `<div class="gjs-db-icon-grid">${iconButtonsMarkup}</div>`,
      ].join('');
    })
    .join('');
};

export default buildIconPickerGridMarkup;
