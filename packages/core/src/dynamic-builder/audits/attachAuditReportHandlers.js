import handleAuditReportClick from './handleAuditReportClick.js';

const attachAuditReportHandlers = (editor, reportElement) => {
  reportElement.addEventListener('click', (clickEvent) => handleAuditReportClick(editor, reportElement, clickEvent));
  reportElement.addEventListener('change', (changeEvent) => {
    const scopeToggle = changeEvent.target;
    if (!scopeToggle || !scopeToggle.hasAttribute || !scopeToggle.hasAttribute('data-db-audit-scope')) return;
    editor.getModel().set('dbAuditScope', scopeToggle.checked ? 'site' : 'page');
  });
};

export default attachAuditReportHandlers;
