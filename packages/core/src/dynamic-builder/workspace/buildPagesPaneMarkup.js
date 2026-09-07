import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getPageDisplayName from '../shell/getPageDisplayName.js';

const buildPagesPaneMarkup = (editor) => {
  const pageManager = editor.Pages;
  const selectedPage = pageManager.getSelected ? pageManager.getSelected() : null;
  const selectedPageId = selectedPage ? String(selectedPage.getId()) : '';
  const mainPage = pageManager.getMain ? pageManager.getMain() : null;
  const mainPageId = mainPage ? String(mainPage.getId()) : '';
  const rowsMarkup = pageManager
    .getAll()
    .map((pageModel) => {
      const pageId = String(pageModel.getId());
      const isCurrent = pageId === selectedPageId;
      return [
        `<li><button type="button" class="gjs-db-page-row" data-db-page-id="${escapeHtmlText(pageId)}"`,
        ` aria-current="${isCurrent ? 'true' : 'false'}">`,
        getIconMarkup('file', { size: 15 }),
        `<span class="gjs-db-page-name">${escapeHtmlText(getPageDisplayName(pageModel))}</span>`,
        pageId === mainPageId ? '<span class="gjs-db-page-tag">Home</span>' : '',
        '</button></li>',
      ].join('');
    })
    .join('');
  return [
    `<ul class="gjs-db-page-list">${rowsMarkup}</ul>`,
    '<div class="gjs-db-page-actions">',
    '<button type="button" class="gjs-db-dock-action" data-db-page-command="db:add-page">',
    getIconMarkup('plus', { size: 14 }),
    '<span>Add page</span></button>',
    '<button type="button" class="gjs-db-dock-action" data-db-page-command="db:open-page-settings">',
    getIconMarkup('settings', { size: 14 }),
    '<span>Page settings</span></button>',
    '</div>',
  ].join('');
};

export default buildPagesPaneMarkup;
