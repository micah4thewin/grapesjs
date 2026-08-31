import getAuditDefinitions from './getAuditDefinitions.js';
import openAuditReportModal from './openAuditReportModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import runAccessibilityAudit from './runAccessibilityAudit.js';
import runPerformanceAudit from './runPerformanceAudit.js';
import runSeoAudit from './runSeoAudit.js';
import storeAuditResults from './storeAuditResults.js';

const registerAuditCommands = (editor, moduleOptions) => {
  const auditRunners = {
    accessibility: runAccessibilityAudit,
    performance: runPerformanceAudit,
    seo: runSeoAudit,
  };
  const commandDefinitions = {
    'db:open-audit-report': (commandEditor) => openAuditReportModal(commandEditor),
  };
  getAuditDefinitions().forEach((auditDefinition) => {
    commandDefinitions[auditDefinition.commandId] = (commandEditor) => {
      const findings = auditRunners[auditDefinition.id](commandEditor, moduleOptions);
      storeAuditResults(commandEditor, auditDefinition.id, findings);
      if (moduleOptions.autoOpenReport !== false) openAuditReportModal(commandEditor);
      return findings;
    };
  });
  registerCommandSet(editor, commandDefinitions);
};

export default registerAuditCommands;
