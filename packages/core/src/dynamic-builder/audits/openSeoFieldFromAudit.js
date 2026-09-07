const siteFieldKeys = [
  'siteName',
  'titleTemplate',
  'defaultDescription',
  'canonicalBase',
  'language',
  'favicon',
  'ogSiteName',
  'twitterHandle',
  'robotsExtra',
];

const focusSeoField = (editor, fieldKey) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const fieldElement = containerElement && containerElement.querySelector('#gjs-db-seo-' + fieldKey);
  if (fieldElement && fieldElement.focus) fieldElement.focus();
};

const openSeoFieldFromAudit = (editor, fieldKey) => {
  if (!editor.Commands || !editor.Commands.has('db:open-seo-settings')) return false;
  editor.getModel().set('dbSeoActiveTab', siteFieldKeys.includes(fieldKey) ? 'site' : 'page');
  editor.runCommand('db:open-seo-settings');
  setTimeout(() => focusSeoField(editor, fieldKey), 30);
  return true;
};

export default openSeoFieldFromAudit;
