const resolveStorageKey = (editor, moduleOptions) => {
  const editorModel = editor && typeof editor.getModel === 'function' ? editor.getModel() : null;
  const overrideKey = editorModel && typeof editorModel.get === 'function' ? editorModel.get('dbStorageKey') : '';
  const trimmedOverride = typeof overrideKey === 'string' ? overrideKey.trim() : '';
  return trimmedOverride || moduleOptions.storageKey;
};

export default resolveStorageKey;
