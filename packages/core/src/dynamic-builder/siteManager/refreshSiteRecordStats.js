import countEditorPages from './countEditorPages.js';

const refreshSiteRecordStats = (editor, siteRecord) => ({
  ...siteRecord,
  updatedAt: new Date().toISOString(),
  pageCount: countEditorPages(editor) || siteRecord.pageCount || 1,
});

export default refreshSiteRecordStats;
