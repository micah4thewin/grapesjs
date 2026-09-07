import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getPageDisplayName from './getPageDisplayName.js';

const buildPagesMenuMarkup = (editor) => {
  const selectedPage = editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected();
  const selectedPageName = escapeHtmlText(getPageDisplayName(selectedPage));
  return [
    '<div class="gjs-db-panel-group gjs-db-menu-host gjs-db-pages-menu-host" role="group" aria-label="Pages">',
    '<button type="button" class="gjs-db-panel-button gjs-db-menu-trigger" data-db-menu-trigger="pages"',
    ` aria-haspopup="true" aria-expanded="false" aria-label="Pages: ${selectedPageName}" title="Pages">`,
    getIconMarkup('webpage', { size: 15 }),
    `<span class="gjs-db-menu-trigger-label" data-db-pages-label>${selectedPageName}</span>`,
    getIconMarkup('chevronDown', { size: 12 }),
    '</button>',
    '<div class="gjs-db-menu gjs-db-pages-menu" data-db-menu="pages" role="menu" aria-label="Pages" hidden></div>',
    '</div>',
  ].join('');
};

export default buildPagesMenuMarkup;
