import buildFontListMarkup from './buildFontListMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getFontCategoryRecords from './getFontCategoryRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFontLibraryModalMarkup = (currentChoices) => {
  const chips = getFontCategoryRecords()
    .map((categoryRecord) => {
      const activeClass = categoryRecord.categoryId === 'all' ? ' gjs-db-chip-active' : '';
      return `<button type="button" class="gjs-db-chip${activeClass}" data-db-font-category-chip="${categoryRecord.categoryId}">${escapeHtmlText(categoryRecord.categoryLabel)}</button>`;
    })
    .join('');
  const pane = (roleName, roleLabel) =>
    [
      `<section class="gjs-db-font-pane" data-db-font-pane="${roleName}">`,
      `<h4 class="gjs-db-icon-group-title">${roleLabel}<span data-db-font-current="${roleName}">${escapeHtmlText(currentChoices[roleName] || 'Site default')}</span></h4>`,
      `<div class="gjs-db-font-list" data-db-font-list="${roleName}">${buildFontListMarkup(roleName, currentChoices[roleName], 'all', '')}</div>`,
      '</section>',
    ].join('');
  return [
    '<div class="gjs-db-form gjs-db-font-library">',
    '<p class="gjs-db-muted">Every family here is open licence (SIL Open Font License or Apache) and free for commercial use. Pick one for headings and one for body text.</p>',
    '<div class="gjs-db-icon-search">',
    getIconMarkup('search', { size: 16 }),
    '<input type="search" class="gjs-db-field-input" data-db-font-search placeholder="Search fonts" autocomplete="off">',
    '</div>',
    `<div class="gjs-db-chip-row">${chips}</div>`,
    '<div class="gjs-db-font-panes">',
    pane('display', 'Headings'),
    pane('body', 'Body text'),
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-font-reset>Back to site defaults</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-font-apply>Apply fonts</button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildFontLibraryModalMarkup;
