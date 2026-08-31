const resolveSchemaTargetPage = (editor, page) => {
  if (page) return page;
  const pagesModule = editor.Pages;
  if (!pagesModule) return null;
  const selectedPage = pagesModule.getSelected && pagesModule.getSelected();
  if (selectedPage) return selectedPage;
  return (pagesModule.getMain && pagesModule.getMain()) || null;
};

export default resolveSchemaTargetPage;
