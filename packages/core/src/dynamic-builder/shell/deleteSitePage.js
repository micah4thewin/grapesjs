import openConfirmModal from './openConfirmModal.js';

const deleteSitePage = (editor, pageId) => {
  const allPages = editor.Pages.getAll();
  if (allPages.length <= 1) return;
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  const pageName = targetPage.getName() || pageId;
  openConfirmModal(editor, 'Delete page', `Delete the page "${pageName}"? This cannot be undone.`, 'Delete', () => {
    const wasSelected = editor.Pages.getSelected() === targetPage;
    editor.Pages.remove(pageId);
    if (wasSelected) {
      const remainingPages = editor.Pages.getAll();
      remainingPages.length && editor.Pages.select(remainingPages[0]);
    }
  });
};

export default deleteSitePage;
