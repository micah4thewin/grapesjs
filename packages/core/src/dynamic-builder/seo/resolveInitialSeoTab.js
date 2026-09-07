const resolveInitialSeoTab = (editor, siteSeoRecord, options = {}) => {
  if (options.tabName === 'site' || options.tabName === 'page') return options.tabName;
  const storedTabName = editor.getModel().get('dbSeoActiveTab');
  if (storedTabName === 'site' || storedTabName === 'page') return storedTabName;
  const hasSiteBasics = Boolean(
    String(siteSeoRecord.siteName || '').trim() && String(siteSeoRecord.canonicalBase || '').trim(),
  );
  return hasSiteBasics ? 'page' : 'site';
};

export default resolveInitialSeoTab;
