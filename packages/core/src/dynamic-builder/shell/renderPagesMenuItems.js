import buildMenuItemMarkup from './buildMenuItemMarkup.js';
import buildPagesMenuRowMarkup from './buildPagesMenuRowMarkup.js';
import getPageDisplayName from './getPageDisplayName.js';
import listPagePathEntries from '../support/listPagePathEntries.js';

const renderPagesMenuItems = (editor, menuElement) => {
  const selectedPage = editor.Pages.getSelected();
  const selectedPageId = selectedPage ? String(selectedPage.getId()) : '';
  const pathEntries = listPagePathEntries(editor);
  const allowDelete = pathEntries.length > 1;
  const pageRowsMarkup = pathEntries
    .map((pathEntry) =>
      buildPagesMenuRowMarkup({
        pageId: pathEntry.pageId,
        pageName: getPageDisplayName(pathEntry.page),
        fileName: `${pathEntry.baseName}.html`,
        isSelected: pathEntry.pageId === selectedPageId,
        isMainPage: pathEntry.isMainPage,
        allowDelete,
      }),
    )
    .join('');
  const addItemMarkup = buildMenuItemMarkup('New page', 'plus', 'data-db-page-action="add"');
  const hintMarkup =
    '<div class="gjs-db-menu-hint" role="none">Arrow keys move between pages and actions. Alt + arrow keys reorder.</div>';
  menuElement.innerHTML = `${pageRowsMarkup}<div class="gjs-db-menu-separator" role="none"></div>${addItemMarkup}${hintMarkup}`;
};

export default renderPagesMenuItems;
