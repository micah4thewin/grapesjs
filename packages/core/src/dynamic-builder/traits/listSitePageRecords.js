import listPagePathEntries from '../support/listPagePathEntries.js';

const listSitePageRecords = (editor) =>
  listPagePathEntries(editor).map((pathEntry) => {
    const pageName = String(pathEntry.page && pathEntry.page.getName ? pathEntry.page.getName() : '').trim();
    return {
      pageId: pathEntry.pageId,
      page: pathEntry.page,
      fileName: `${pathEntry.baseName}.html`,
      label: pageName || (pathEntry.isMainPage ? 'Home' : 'Untitled page'),
    };
  });

export default listSitePageRecords;
