import listPagePathEntries from '../support/listPagePathEntries.js';

const listPageExportEntries = (editor) =>
  listPagePathEntries(editor).map((pathEntry, pageIndex) => {
    const storedName = String((pathEntry.page.getName && pathEntry.page.getName()) || '').trim();
    const fallbackName = pathEntry.isMainPage ? 'Home' : 'Page ' + (pageIndex + 1);
    return {
      page: pathEntry.page,
      pageId: pathEntry.pageId,
      pageName: storedName || fallbackName,
      fileName: pathEntry.baseName + '.html',
      isMainPage: pathEntry.isMainPage,
    };
  });

export default listPageExportEntries;
