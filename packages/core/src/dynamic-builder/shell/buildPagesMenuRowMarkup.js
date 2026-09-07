import buildPagesMenuIconButtonMarkup from './buildPagesMenuIconButtonMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildPagesMenuRowMarkup = (rowRecord) => {
  const { pageId, pageName, fileName, isSelected, isMainPage, allowDelete } = rowRecord;
  const safePageId = escapeHtmlText(pageId);
  const safePageName = escapeHtmlText(pageName);
  const homeBadgeMarkup = isMainPage ? '<span class="gjs-db-badge gjs-db-menu-home-badge">Home</span>' : '';
  const homeActionMarkup = isMainPage
    ? ''
    : buildPagesMenuIconButtonMarkup('set-home', pageId, 'smartHome', `Set ${pageName} as home page`, 'Set as home');
  const deleteActionMarkup =
    allowDelete && !isMainPage
      ? buildPagesMenuIconButtonMarkup('delete', pageId, 'trash', `Delete ${pageName}`, 'Delete')
      : '';
  return [
    `<div class="gjs-db-menu-row" role="none" data-db-page-row="${safePageId}">`,
    `<button type="button" class="gjs-db-menu-item gjs-db-menu-item-grow" role="menuitem" data-db-page-action="select"`,
    ` data-db-page-id="${safePageId}" aria-current="${isSelected ? 'true' : 'false'}" title="Open ${safePageName}">`,
    getIconMarkup(isSelected ? 'check' : 'webpage', { size: 15 }),
    '<span class="gjs-db-menu-item-text">',
    `<span class="gjs-db-menu-item-label">${safePageName}</span>`,
    `<span class="gjs-db-menu-item-meta">${escapeHtmlText(fileName)}</span>`,
    '</span>',
    homeBadgeMarkup,
    '</button>',
    buildPagesMenuIconButtonMarkup('rename', pageId, 'edit', `Rename ${pageName}`, 'Rename'),
    buildPagesMenuIconButtonMarkup('duplicate', pageId, 'copy', `Duplicate ${pageName}`, 'Duplicate'),
    buildPagesMenuIconButtonMarkup('settings', pageId, 'seo', `Page settings for ${pageName}`, 'Page settings'),
    homeActionMarkup,
    deleteActionMarkup,
    '</div>',
  ].join('');
};

export default buildPagesMenuRowMarkup;
