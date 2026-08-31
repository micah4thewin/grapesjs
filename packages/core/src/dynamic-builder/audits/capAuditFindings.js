import createFindingRecord from './createFindingRecord.js';

const capAuditFindings = (findings, maxCount, group, remainderLabel) => {
  if (findings.length <= maxCount) return findings;
  const cappedFindings = findings.slice(0, maxCount);
  cappedFindings.push(
    createFindingRecord(
      'info',
      group,
      findings.length - maxCount + ' ' + remainderLabel + '.',
      'Fix the listed items first, then re-run the audit to see the rest.',
    ),
  );
  return cappedFindings;
};

export default capAuditFindings;
