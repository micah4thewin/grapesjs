const restorePageSnapshot = (editor, pageSnapshot) => {
  if (!pageSnapshot) return null;
  const existingPage = editor.Pages.get(pageSnapshot.pageId);
  if (existingPage) {
    editor.Pages.select(existingPage);
    return existingPage;
  }
  const restoredPage = editor.Pages.add(
    { name: pageSnapshot.name, component: pageSnapshot.component },
    { select: true },
  );
  if (restoredPage && pageSnapshot.meta) restoredPage.set('dbPageMeta', pageSnapshot.meta);
  return restoredPage;
};

export default restorePageSnapshot;
