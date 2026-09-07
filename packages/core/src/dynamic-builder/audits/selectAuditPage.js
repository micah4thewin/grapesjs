const selectAuditPage = (editor, pageId) => {
  const targetId = String(pageId || '');
  const pagesModule = editor.Pages;
  if (!targetId || !pagesModule || !pagesModule.select) return false;
  const selectedPage = pagesModule.getSelected ? pagesModule.getSelected() : null;
  if (selectedPage && String(selectedPage.getId()) === targetId) return false;
  const targetPage = pagesModule.get ? pagesModule.get(targetId) : null;
  if (!targetPage) return false;
  pagesModule.select(targetPage);
  return true;
};

export default selectAuditPage;
