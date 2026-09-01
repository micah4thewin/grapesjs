import buildMenuItemMarkup from './buildMenuItemMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getPageDisplayName from './getPageDisplayName.js';

const renderPagesMenuItems = (editor, menuElement) => {
  const allPages = editor.Pages.getAll();
  const selectedPage = editor.Pages.getSelected();
  const selectedPageId = selectedPage ? String(selectedPage.getId()) : '';
  const allowDelete = allPages.length > 1;
  const pageRowsMarkup = allPages
    .map((pageModel) => {
      const pageId = String(pageModel.getId());
      const pageName = getPageDisplayName(pageModel);
      const safePageId = escapeHtmlText(pageId);
      const safePageName = escapeHtmlText(pageName);
      const isSelected = pageId === selectedPageId;
      const selectIconMarkup = getIconMarkup(isSelected ? 'check' : 'webpage', { size: 15 });
      const deleteButtonMarkup = allowDelete
        ? [
            `<button type="button" class="gjs-db-menu-icon-button" data-db-page-action="delete" data-db-page-id="${safePageId}"`,
            ` aria-label="Delete ${safePageName}" title="Delete">`,
            getIconMarkup('trash', { size: 14 }),
            '</button>',
          ].join('')
        : '';
      return [
        '<div class="gjs-db-menu-row" role="none">',
        `<button type="button" class="gjs-db-menu-item gjs-db-menu-item-grow" role="menuitem" data-db-page-action="select"`,
        ` data-db-page-id="${safePageId}" aria-current="${isSelected ? 'true' : 'false'}">`,
        selectIconMarkup,
        `<span class="gjs-db-menu-item-label">${safePageName}</span>`,
        '</button>',
        `<button type="button" class="gjs-db-menu-icon-button" data-db-page-action="rename" data-db-page-id="${safePageId}"`,
        ` aria-label="Rename ${safePageName}" title="Rename">`,
        getIconMarkup('edit', { size: 14 }),
        '</button>',
        deleteButtonMarkup,
        '</div>',
      ].join('');
    })
    .join('');
  const addItemMarkup = buildMenuItemMarkup('New page', 'plus', 'data-db-page-action="add"');
  menuElement.innerHTML = `${pageRowsMarkup}<div class="gjs-db-menu-separator" role="none"></div>${addItemMarkup}`;
};

export default renderPagesMenuItems;
