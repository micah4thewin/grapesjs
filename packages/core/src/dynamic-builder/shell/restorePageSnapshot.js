const restorePageSnapshot = (editor, pageSnapshot) => {
  if (!pageSnapshot) return null;
  const existingPage = editor.Pages.get(pageSnapshot.pageId);
  if (existingPage) {
    editor.Pages.select(existingPage);
    return existingPage;
  }
  const restoredPage = editor.Pages.add({ name: pageSnapshot.name }, { select: true });
  if (!restoredPage) return null;
  const restoredRoot = restoredPage.getMainComponent();
  const restoredComponents = pageSnapshot.components || [];
  if (restoredRoot && restoredComponents.length) restoredRoot.append(restoredComponents);
  if (pageSnapshot.meta) restoredPage.set('dbPageMeta', pageSnapshot.meta);
  return restoredPage;
};

export default restorePageSnapshot;
