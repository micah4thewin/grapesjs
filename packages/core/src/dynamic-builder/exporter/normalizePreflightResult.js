import buildPreflightFromSummaries from './buildPreflightFromSummaries.js';
import countFindingsBySeverity from '../audits/countFindingsBySeverity.js';
import isPlainRecord from '../support/isPlainRecord.js';

const normalizePreflightResult = (resultValue) => {
  const findings = Array.isArray(resultValue)
    ? resultValue
    : isPlainRecord(resultValue) && Array.isArray(resultValue.findings)
      ? resultValue.findings
      : null;
  if (findings) {
    const summaries =
      isPlainRecord(resultValue) && Array.isArray(resultValue.summaries)
        ? resultValue.summaries
        : [{ auditId: 'preflight', auditLabel: 'Site checks', severityCounts: countFindingsBySeverity(findings) }];
    const notes = isPlainRecord(resultValue) && Array.isArray(resultValue.notes) ? resultValue.notes : [];
    return buildPreflightFromSummaries(summaries, notes, 'command');
  }
  if (!isPlainRecord(resultValue)) return null;
  const hasCounts =
    Number.isFinite(Number(resultValue.errorCount)) || Number.isFinite(Number(resultValue.warningCount));
  if (!hasCounts) return null;
  const summaries = Array.isArray(resultValue.summaries) ? resultValue.summaries : [];
  return {
    errorCount: Math.max(0, Number(resultValue.errorCount) || 0),
    warningCount: Math.max(0, Number(resultValue.warningCount) || 0),
    infoCount: Math.max(0, Number(resultValue.infoCount || resultValue.noteCount) || 0),
    summaries: summaries.filter(
      (auditSummary) => isPlainRecord(auditSummary) && isPlainRecord(auditSummary.severityCounts),
    ),
    notes: Array.isArray(resultValue.notes) ? resultValue.notes.map(String) : [],
    source: 'command',
  };
};

export default normalizePreflightResult;
