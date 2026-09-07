const ensureMainPageName = (editor) => {
  const mainPage = editor.Pages && editor.Pages.getMain && editor.Pages.getMain();
  if (!mainPage || String(mainPage.getName() || '').trim()) return false;
  mainPage.set('name', 'Home', { silent: true });
  editor.trigger('page', { event: 'change:name', page: mainPage, options: { silent: true } });
  return true;
};

export default ensureMainPageName;
