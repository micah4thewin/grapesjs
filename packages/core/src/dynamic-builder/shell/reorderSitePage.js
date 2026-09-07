const reorderSitePage = (editor, pageId, stepDirection) => {
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return false;
  const pageList = editor.Pages.getAll();
  const currentIndex = pageList.indexOf(targetPage);
  const nextIndex = currentIndex + stepDirection;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= pageList.length) return false;
  return Boolean(editor.Pages.move(targetPage, { at: nextIndex }));
};

export default reorderSitePage;
