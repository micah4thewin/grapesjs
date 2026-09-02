import runAccessibilityAudit from '../audits/runAccessibilityAudit.js';
import runPerformanceAudit from '../audits/runPerformanceAudit.js';
import runSeoAudit from '../audits/runSeoAudit.js';
import storeAuditResults from '../audits/storeAuditResults.js';

const runPublishAuditSummaries = (editor) => {
  const auditDefinitions = [
    { auditId: 'accessibility', auditLabel: 'Accessibility', runAudit: runAccessibilityAudit },
    { auditId: 'performance', auditLabel: 'Performance', runAudit: runPerformanceAudit },
    { auditId: 'seo', auditLabel: 'SEO', runAudit: runSeoAudit },
  ];
  return auditDefinitions.map((auditDefinition) => {
    let findings = [];
    try {
      const auditResult = auditDefinition.runAudit(editor, {});
      findings = Array.isArray(auditResult) ? auditResult : [];
      storeAuditResults(editor, auditDefinition.auditId, findings);
    } catch (auditError) {
      findings = [];
    }
    const severityCounts = { error: 0, warning: 0, info: 0 };
    findings.forEach((findingRecord) => {
      const severityValue = findingRecord && findingRecord.severity;
      if (severityCounts[severityValue] !== undefined) severityCounts[severityValue] += 1;
    });
    return { ...auditDefinition, severityCounts, findingCount: findings.length, commandAvailable: true };
  });
};

export default runPublishAuditSummaries;
