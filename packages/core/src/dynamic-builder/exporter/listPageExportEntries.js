import listPagePathEntries from '../support/listPagePathEntries.js';

const listPageExportEntries = (editor) =>
  listPagePathEntries(editor).map((pathEntry) => ({
    page: pathEntry.page,
    pageId: pathEntry.pageId,
    pageName: (pathEntry.page.getName ? pathEntry.page.getName() : '') || pathEntry.baseName,
    fileName: pathEntry.baseName + '.html',
    isMainPage: pathEntry.isMainPage,
  }));

export default listPageExportEntries;
