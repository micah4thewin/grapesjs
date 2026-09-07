import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';

const capAuditFindings = (findings, auditContext, group, remainderLabel) => {
  const maxCount = resolveAuditThreshold(auditContext, 'maxFindingsPerCheck');
  if (findings.length <= maxCount) return findings;
  const cappedFindings = findings.slice(0, maxCount);
  cappedFindings.push(
    createFindingRecord(
      'info',
      group,
      findings.length - maxCount + ' ' + remainderLabel + '.',
      'Fix the listed items first, then run the check again to see the rest.',
    ),
  );
  return cappedFindings;
};

export default capAuditFindings;
