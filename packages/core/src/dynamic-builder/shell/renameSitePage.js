import openPageNameModal from './openPageNameModal.js';

const renameSitePage = (editor, pageId) => {
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  openPageNameModal(editor, 'Rename page', targetPage.getName() || '', 'Rename', (pageName) => {
    targetPage.setName(pageName);
  });
};

export default renameSitePage;
