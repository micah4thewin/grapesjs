import buildAuditResultMeta from './buildAuditResultMeta.js';
import openAuditReportModal from './openAuditReportModal.js';
import resolveAuditScope from './resolveAuditScope.js';
import runAuditForScope from './runAuditForScope.js';
import storeAuditResults from './storeAuditResults.js';

const runAuditCommand = (editor, moduleOptions, auditDefinition, auditRunner, commandOptions) => {
  const optionsRecord = commandOptions || {};
  const scope = resolveAuditScope(editor, optionsRecord);
  const scopedResult = runAuditForScope(editor, moduleOptions, auditDefinition, auditRunner, scope);
  storeAuditResults(
    editor,
    auditDefinition.id,
    scopedResult.findings,
    buildAuditResultMeta(editor, scope, scopedResult.pageCount),
  );
  const shouldOpenReport = optionsRecord.openReport !== false && moduleOptions.autoOpenReport !== false;
  if (shouldOpenReport) {
    openAuditReportModal(editor, {
      focusSelector: optionsRecord.focusSelector || '[data-db-audit-run="' + auditDefinition.commandId + '"]',
    });
  }
  return scopedResult.findings;
};

export default runAuditCommand;
