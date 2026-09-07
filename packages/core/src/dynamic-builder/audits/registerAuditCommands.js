import getAuditDefinitions from './getAuditDefinitions.js';
import getAuditRunnerRecords from './getAuditRunnerRecords.js';
import openAuditReportModal from './openAuditReportModal.js';
import openPreflightModal from './openPreflightModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import runAuditCommand from './runAuditCommand.js';
import runPublishPreflight from './runPublishPreflight.js';

const registerAuditCommands = (editor, moduleOptions) => {
  const auditRunners = getAuditRunnerRecords();
  const auditDefinitions = getAuditDefinitions();
  const commandDefinitions = {
    'db:open-audit-report': (commandEditor) => openAuditReportModal(commandEditor),
    'db:run-all-audits': (commandEditor, commandSender, commandOptions) => {
      const optionsRecord = commandOptions || {};
      const findingsByAudit = {};
      auditDefinitions.forEach((auditDefinition) => {
        findingsByAudit[auditDefinition.id] = runAuditCommand(
          commandEditor,
          moduleOptions,
          auditDefinition,
          auditRunners[auditDefinition.id],
          { ...optionsRecord, openReport: false },
        );
      });
      if (optionsRecord.openReport !== false && moduleOptions.autoOpenReport !== false) {
        openAuditReportModal(commandEditor, { focusSelector: '[data-db-audit-run-all]' });
      }
      return findingsByAudit;
    },
    'db:run-preflight': (commandEditor, commandSender, commandOptions) => {
      const optionsRecord = commandOptions || {};
      const preflightResult = runPublishPreflight(commandEditor, moduleOptions, optionsRecord);
      if (optionsRecord.openReport !== false) openPreflightModal(commandEditor, preflightResult, optionsRecord);
      return preflightResult;
    },
  };
  auditDefinitions.forEach((auditDefinition) => {
    commandDefinitions[auditDefinition.commandId] = (commandEditor, commandSender, commandOptions) =>
      runAuditCommand(commandEditor, moduleOptions, auditDefinition, auditRunners[auditDefinition.id], commandOptions);
  });
  registerCommandSet(editor, commandDefinitions);
};

export default registerAuditCommands;
