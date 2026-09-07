import describeLinkCountText from './describeLinkCountText.js';
import openPageNameModal from './openPageNameModal.js';
import resolvePageFileName from '../support/resolvePageFileName.js';
import rewritePageLinkHrefs from './rewritePageLinkHrefs.js';
import showToastNotice from '../support/showToastNotice.js';
import validatePageName from './validatePageName.js';

const renameSitePage = (editor, pageId) => {
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  const isMainPage = targetPage === editor.Pages.getMain();
  openPageNameModal(editor, {
    modalTitle: 'Rename page',
    initialValue: targetPage.getName() || '',
    submitLabel: 'Rename',
    fixedAddress: isMainPage ? 'index.html' : '',
    validateName: (pageName) => validatePageName(editor, pageName, String(pageId)),
    onSubmitName: (pageName) => {
      const previousBaseName = resolvePageFileName(editor, targetPage);
      targetPage.setName(pageName);
      const nextBaseName = resolvePageFileName(editor, targetPage);
      const rewrittenCount = rewritePageLinkHrefs(editor, previousBaseName, nextBaseName);
      if (!rewrittenCount) return;
      const linkText = describeLinkCountText(rewrittenCount);
      showToastNotice(editor, `Renamed. ${linkText} updated to ${nextBaseName}.html.`, { kind: 'success' });
    },
  });
};

export default renameSitePage;
