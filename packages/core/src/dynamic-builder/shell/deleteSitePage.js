import buildDeletePageMessage from './buildDeletePageMessage.js';
import capturePageSnapshot from './capturePageSnapshot.js';
import getPageDisplayName from './getPageDisplayName.js';
import listPageLinkComponents from './listPageLinkComponents.js';
import openConfirmModal from './openConfirmModal.js';
import resolvePageFileName from '../support/resolvePageFileName.js';
import restorePageSnapshot from './restorePageSnapshot.js';
import showActionToastNotice from '../support/showActionToastNotice.js';
import showToastNotice from '../support/showToastNotice.js';

const deleteSitePage = (editor, pageId) => {
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  if (editor.Pages.getAll().length <= 1) {
    showToastNotice(editor, 'A site needs at least one page.', { kind: 'warning' });
    return;
  }
  if (targetPage === editor.Pages.getMain()) {
    showToastNotice(editor, 'The home page cannot be deleted. Set another page as home first.', { kind: 'warning' });
    return;
  }
  const pageName = getPageDisplayName(targetPage);
  const linkCount = listPageLinkComponents(editor, resolvePageFileName(editor, targetPage), targetPage).length;
  openConfirmModal(editor, 'Delete page', buildDeletePageMessage(pageName, linkCount), 'Delete', () => {
    if (!editor.Pages.get(pageId) || editor.Pages.getAll().length <= 1) return;
    const pageSnapshot = capturePageSnapshot(targetPage);
    const wasSelected = editor.Pages.getSelected() === targetPage;
    editor.Pages.remove(pageId);
    if (wasSelected) editor.Pages.select(editor.Pages.getMain() || editor.Pages.getAll()[0]);
    showActionToastNotice(editor, `Deleted "${pageName}"`, {
      actionLabel: 'Undo',
      onAction: () => restorePageSnapshot(editor, pageSnapshot),
    });
  });
};

export default deleteSitePage;
