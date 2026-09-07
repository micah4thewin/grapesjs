import getPageDisplayName from './getPageDisplayName.js';
import resolvePageFileName from '../support/resolvePageFileName.js';
import rewritePageLinkHrefs from './rewritePageLinkHrefs.js';
import showToastNotice from '../support/showToastNotice.js';

const setSitePageAsHome = (editor, pageId) => {
  const targetPage = editor.Pages.get(pageId);
  const previousMainPage = editor.Pages.getMain();
  if (!targetPage || !previousMainPage || targetPage === previousMainPage) return false;
  const targetBaseName = resolvePageFileName(editor, targetPage);
  previousMainPage.unset('type');
  targetPage.set('type', 'main');
  editor.Pages.move(targetPage, { at: 0 });
  const previousMainBaseName = resolvePageFileName(editor, previousMainPage);
  rewritePageLinkHrefs(editor, 'index', previousMainBaseName);
  rewritePageLinkHrefs(editor, targetBaseName, 'index');
  editor.Pages.select(targetPage);
  showToastNotice(editor, `"${getPageDisplayName(targetPage)}" is now the home page (index.html).`, {
    kind: 'success',
  });
  return true;
};

export default setSitePageAsHome;
