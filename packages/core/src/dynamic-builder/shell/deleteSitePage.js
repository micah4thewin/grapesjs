import getPageDisplayName from './getPageDisplayName.js';
import openConfirmModal from './openConfirmModal.js';
import showToastNotice from '../support/showToastNotice.js';

const deleteSitePage = (editor, pageId) => {
  if (editor.Pages.getAll().length <= 1) return;
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  const pageName = getPageDisplayName(targetPage);
  const confirmMessage = `Delete the page "${pageName}"? You can undo this with the undo shortcut.`;
  openConfirmModal(editor, 'Delete page', confirmMessage, 'Delete', () => {
    if (editor.Pages.getAll().length <= 1) {
      showToastNotice(editor, 'A site needs at least one page.', { kind: 'error' });
      return;
    }
    if (!editor.Pages.get(pageId)) return;
    const wasSelected = editor.Pages.getSelected() === targetPage;
    editor.Pages.remove(pageId);
    if (!wasSelected) return;
    const remainingPages = editor.Pages.getAll();
    remainingPages.length && editor.Pages.select(remainingPages[0]);
  });
};

export default deleteSitePage;
