const stampFindingsWithPage = (findings, auditContext) =>
  (Array.isArray(findings) ? findings : []).map((findingRecord) => ({
    ...findingRecord,
    pageId: findingRecord.pageId || auditContext.pageId || '',
    pageName: findingRecord.pageName || (findingRecord.pageId ? '' : auditContext.pageName) || '',
  }));

export default stampFindingsWithPage;
