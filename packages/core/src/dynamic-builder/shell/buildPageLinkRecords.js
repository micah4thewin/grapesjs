import getPageDisplayName from './getPageDisplayName.js';
import listPagePathEntries from '../support/listPagePathEntries.js';

const buildPageLinkRecords = (editor) =>
  listPagePathEntries(editor).map((pathEntry) => ({
    labelText: getPageDisplayName(pathEntry.page),
    hrefValue: `${pathEntry.baseName}.html`,
    isMainPage: pathEntry.isMainPage,
  }));

export default buildPageLinkRecords;
