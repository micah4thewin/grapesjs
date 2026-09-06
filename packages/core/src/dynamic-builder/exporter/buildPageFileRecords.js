import buildPageDocumentMarkup from './buildPageDocumentMarkup.js';
import buildSiteScriptText from './buildSiteScriptText.js';
import listPageExportEntries from './listPageExportEntries.js';

const buildPageFileRecords = (editor, buildOptions, targetPageId) => {
  const optionsRecord = buildOptions || {};
  const needsSiteScript = optionsRecord.separateAssets && optionsRecord.siteScriptText === undefined;
  const sharedOptions = needsSiteScript
    ? { ...optionsRecord, siteScriptText: buildSiteScriptText(editor, optionsRecord) }
    : optionsRecord;
  return listPageExportEntries(editor)
    .filter((pageEntry) => !targetPageId || pageEntry.pageId === targetPageId)
    .map((pageEntry) => ({
      pageId: pageEntry.pageId,
      pageName: pageEntry.pageName,
      fileName: pageEntry.fileName,
      mimeType: 'text/html',
      content: buildPageDocumentMarkup(editor, pageEntry.page, { ...sharedOptions, pageFileName: pageEntry.fileName }),
    }));
};

export default buildPageFileRecords;
