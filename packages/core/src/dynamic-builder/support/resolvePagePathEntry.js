import listPagePathEntries from './listPagePathEntries.js';

const resolvePagePathEntry = (editor, page) => {
  const targetPage = page || (editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected()) || null;
  if (!targetPage) return null;
  const targetId = String(targetPage.getId ? targetPage.getId() : '');
  return listPagePathEntries(editor).find((pathEntry) => pathEntry.pageId === targetId) || null;
};

export default resolvePagePathEntry;
