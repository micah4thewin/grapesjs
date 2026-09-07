import countFindingsBySeverity from '../audits/countFindingsBySeverity.js';
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
    return {
      auditId: auditDefinition.auditId,
      auditLabel: auditDefinition.auditLabel,
      severityCounts: countFindingsBySeverity(findings),
    };
  });
};

export default runPublishAuditSummaries;
