import applyAuditFix from './applyAuditFix.js';
import getAuditDefinitions from './getAuditDefinitions.js';
import locateAuditComponent from './locateAuditComponent.js';
import showToastNotice from '../support/showToastNotice.js';

const resolveRefreshCommandId = (actionElement, reportElement) => {
  const groupElement = actionElement.closest('[data-db-audit-group]');
  const groupId = groupElement ? groupElement.getAttribute('data-db-audit-group') : '';
  const auditDefinition = getAuditDefinitions().find((definition) => definition.id === groupId);
  if (auditDefinition) return auditDefinition.commandId;
  return reportElement.hasAttribute('data-db-preflight-root') ? 'db:run-preflight' : '';
};

const handleAuditReportClick = (editor, reportElement, clickEvent) => {
  const targetElement = clickEvent.target;
  if (!targetElement || !targetElement.closest) return;
  const runButton = targetElement.closest('[data-db-audit-run]');
  if (runButton) {
    editor.runCommand(runButton.getAttribute('data-db-audit-run'), { openReport: true, refresh: true });
    return;
  }
  if (targetElement.closest('[data-db-audit-run-all]')) {
    editor.runCommand('db:run-all-audits');
    return;
  }
  const showButton = targetElement.closest('[data-db-audit-show]');
  if (showButton) {
    locateAuditComponent(
      editor,
      showButton.getAttribute('data-db-audit-component'),
      showButton.getAttribute('data-db-audit-page'),
    );
    return;
  }
  const fixButton = targetElement.closest('[data-db-audit-fix]');
  if (!fixButton) return;
  const fixDefinition = applyAuditFix(
    editor,
    fixButton.getAttribute('data-db-audit-fix'),
    fixButton.getAttribute('data-db-audit-component'),
    fixButton.getAttribute('data-db-audit-page'),
  );
  if (!fixDefinition) {
    showToastNotice(editor, 'This item could not be fixed automatically. Use Show to find it.', { kind: 'warning' });
    return;
  }
  if (fixDefinition.opensPanel) return;
  showToastNotice(editor, 'Done: ' + fixDefinition.label, { kind: 'success' });
  const refreshCommandId = resolveRefreshCommandId(fixButton, reportElement);
  refreshCommandId && editor.runCommand(refreshCommandId, { openReport: true, refresh: true });
};

export default handleAuditReportClick;
