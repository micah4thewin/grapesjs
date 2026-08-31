const getAuditResults = (editor) => editor.getModel().get('dbAuditResults') || {};

export default getAuditResults;
