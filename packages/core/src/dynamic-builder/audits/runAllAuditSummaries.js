import buildAuditResultMeta from './buildAuditResultMeta.js';
import countFindingsBySeverity from './countFindingsBySeverity.js';
import getAuditDefinitions from './getAuditDefinitions.js';
import getAuditRunnerRecords from './getAuditRunnerRecords.js';
import runAuditForScope from './runAuditForScope.js';
import storeAuditResults from './storeAuditResults.js';

const runAllAuditSummaries = (editor, moduleOptions, scope) => {
  const auditRunners = getAuditRunnerRecords();
  const resolvedScope = scope === 'site' ? 'site' : 'page';
  return getAuditDefinitions().map((auditDefinition) => {
    let findings = [];
    try {
      const scopedResult = runAuditForScope(
        editor,
        moduleOptions || {},
        auditDefinition,
        auditRunners[auditDefinition.id],
        resolvedScope,
      );
      findings = scopedResult.findings;
      storeAuditResults(
        editor,
        auditDefinition.id,
        findings,
        buildAuditResultMeta(editor, resolvedScope, scopedResult.pageCount),
      );
    } catch (auditError) {
      console.error('dynamic-builder audit run failed', auditError);
    }
    return {
      ...auditDefinition,
      auditId: auditDefinition.id,
      auditLabel: auditDefinition.label,
      findings,
      severityCounts: countFindingsBySeverity(findings),
      findingCount: findings.length,
      commandAvailable: true,
    };
  });
};

export default runAllAuditSummaries;
