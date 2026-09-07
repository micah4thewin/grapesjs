import resolveTargetPage from './resolveTargetPage.js';

const resolveSeoModalPage = (editor, rootElement) => {
  const storedPageId = rootElement.dataset.dbSeoPageId;
  const storedPage = storedPageId && editor.Pages && editor.Pages.get ? editor.Pages.get(storedPageId) : null;
  return resolveTargetPage(editor, storedPage || null);
};

export default resolveSeoModalPage;
