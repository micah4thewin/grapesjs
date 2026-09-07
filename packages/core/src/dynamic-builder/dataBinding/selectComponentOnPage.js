const selectComponentOnPage = (editor, targetPage, targetComponent) => {
  const pagesModule = editor.Pages;
  const currentPage = pagesModule && pagesModule.getSelected ? pagesModule.getSelected() : null;
  const needsPageSwitch = targetPage && currentPage !== targetPage && pagesModule && pagesModule.select;
  if (needsPageSwitch) pagesModule.select(targetPage);
  const selectTarget = () => {
    if (!targetComponent) return;
    editor.select(targetComponent);
    if (editor.Canvas && editor.Canvas.scrollTo) editor.Canvas.scrollTo(targetComponent, { behavior: 'smooth' });
  };
  if (needsPageSwitch) setTimeout(selectTarget, 80);
  else selectTarget();
};

export default selectComponentOnPage;
