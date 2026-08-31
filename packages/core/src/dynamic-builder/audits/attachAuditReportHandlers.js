import getAuditDefinitions from './getAuditDefinitions.js';

const attachAuditReportHandlers = (editor, reportElement) => {
  reportElement
    .querySelectorAll('[data-db-audit-run]')
    .forEach((runButton) =>
      runButton.addEventListener('click', () => editor.runCommand(runButton.getAttribute('data-db-audit-run'))),
    );
  const runAllButton = reportElement.querySelector('[data-db-audit-run-all]');
  runAllButton &&
    runAllButton.addEventListener('click', () =>
      getAuditDefinitions().forEach((auditDefinition) => editor.runCommand(auditDefinition.commandId)),
    );
};

export default attachAuditReportHandlers;
