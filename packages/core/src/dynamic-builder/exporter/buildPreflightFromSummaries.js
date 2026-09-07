import isPlainRecord from '../support/isPlainRecord.js';

const buildPreflightFromSummaries = (auditSummaries, exportNotes, sourceName) => {
  const summaryList = (Array.isArray(auditSummaries) ? auditSummaries : []).filter(
    (auditSummary) => isPlainRecord(auditSummary) && isPlainRecord(auditSummary.severityCounts),
  );
  const sumSeverity = (severityKey) =>
    summaryList.reduce(
      (totalCount, auditSummary) => totalCount + (Number(auditSummary.severityCounts[severityKey]) || 0),
      0,
    );
  return {
    errorCount: sumSeverity('error'),
    warningCount: sumSeverity('warning'),
    infoCount: sumSeverity('info'),
    summaries: summaryList,
    notes: Array.isArray(exportNotes) ? exportNotes.map(String) : [],
    source: sourceName || 'audits',
  };
};

export default buildPreflightFromSummaries;
