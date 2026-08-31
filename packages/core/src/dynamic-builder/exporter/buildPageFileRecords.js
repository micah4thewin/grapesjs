import buildPageDocumentMarkup from './buildPageDocumentMarkup.js';
import listPageExportEntries from './listPageExportEntries.js';

const buildPageFileRecords = (editor, buildOptions, targetPageId) =>
  listPageExportEntries(editor)
    .filter((pageEntry) => !targetPageId || pageEntry.pageId === targetPageId)
    .map((pageEntry) => ({
      pageId: pageEntry.pageId,
      pageName: pageEntry.pageName,
      fileName: pageEntry.fileName,
      mimeType: 'text/html',
      content: buildPageDocumentMarkup(editor, pageEntry.page, buildOptions),
    }));

export default buildPageFileRecords;
