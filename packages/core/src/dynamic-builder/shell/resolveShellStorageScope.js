const resolveShellStorageScope = (editor, pluginOptions) => {
  const persistenceOptions = (pluginOptions && pluginOptions.persistence) || {};
  const storageKey = typeof persistenceOptions.storageKey === 'string' ? persistenceOptions.storageKey.trim() : '';
  if (storageKey) return storageKey;
  const containerElement = editor.getContainer && editor.getContainer();
  return (containerElement && containerElement.id) || 'default';
};

export default resolveShellStorageScope;
