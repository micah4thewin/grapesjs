const resolveAuditScope = (editor, commandOptions) => {
  const requestedScope = commandOptions && commandOptions.scope;
  if (requestedScope === 'site' || requestedScope === 'page') return requestedScope;
  return editor.getModel().get('dbAuditScope') === 'site' ? 'site' : 'page';
};

export default resolveAuditScope;
