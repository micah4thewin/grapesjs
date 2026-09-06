import openPageNameModal from './openPageNameModal.js';
import validatePageName from './validatePageName.js';

const renameSitePage = (editor, pageId) => {
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  openPageNameModal(
    editor,
    'Rename page',
    targetPage.getName() || '',
    'Rename',
    (pageName) => targetPage.setName(pageName),
    (pageName) => validatePageName(editor, pageName, String(pageId)),
  );
};

export default renameSitePage;
