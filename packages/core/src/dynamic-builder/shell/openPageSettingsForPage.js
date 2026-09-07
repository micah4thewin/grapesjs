const openPageSettingsForPage = (editor, pageId) => {
  const targetPage = editor.Pages.get(pageId);
  if (!targetPage) return;
  if (editor.Pages.getSelected() !== targetPage) editor.Pages.select(targetPage);
  editor.getModel().set('dbSeoActiveTab', 'page');
  editor.runCommand('db:open-seo-settings');
};

export default openPageSettingsForPage;
