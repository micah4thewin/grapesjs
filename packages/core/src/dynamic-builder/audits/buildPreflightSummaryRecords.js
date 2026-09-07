import countFindingsBySeverity from './countFindingsBySeverity.js';
import runAllAuditSummaries from './runAllAuditSummaries.js';

const buildPreflightSummaryRecords = (editor, moduleOptions, items, includeAudits) => {
  const checklistSummary = {
    auditId: 'preflight',
    auditLabel: 'Publish checklist',
    severityCounts: countFindingsBySeverity(items),
  };
  if (!includeAudits) return [checklistSummary];
  const auditSummaries = runAllAuditSummaries(editor, moduleOptions).map((auditSummary) => ({
    auditId: auditSummary.auditId,
    auditLabel: auditSummary.auditLabel,
    severityCounts: auditSummary.severityCounts,
  }));
  return auditSummaries.concat([checklistSummary]);
};

export default buildPreflightSummaryRecords;
