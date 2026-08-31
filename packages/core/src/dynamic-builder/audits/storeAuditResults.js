const storeAuditResults = (editor, auditName, findings) => {
  const editorModel = editor.getModel();
  const existingResults = editorModel.get('dbAuditResults') || {};
  const auditResults = {
    ...existingResults,
    [auditName]: { findings: Array.isArray(findings) ? findings : [], completedAt: Date.now() },
  };
  editorModel.set('dbAuditResults', auditResults);
  editor.trigger('db:audit:complete', { auditName, findings: auditResults[auditName].findings, results: auditResults });
  return auditResults;
};

export default storeAuditResults;
