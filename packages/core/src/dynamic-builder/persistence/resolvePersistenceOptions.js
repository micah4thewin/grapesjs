import isPlainRecord from '../support/isPlainRecord.js';

const resolveDefaultStorageKey = (editor) => {
  const containerElement = editor && editor.getContainer && editor.getContainer();
  const containerId = containerElement && containerElement.id ? String(containerElement.id) : '';
  const locationPath = typeof window !== 'undefined' && window.location ? String(window.location.pathname || '') : '';
  const scopeText = [locationPath, containerId].filter(Boolean).join('#');
  return scopeText ? 'db-project:' + scopeText : 'db-project';
};

const resolvePersistenceOptions = (pluginOptions, editor) => {
  const rawOptions = pluginOptions && pluginOptions.persistence;
  const moduleOptions = isPlainRecord(rawOptions) ? rawOptions : {};
  const storageKeyText =
    typeof moduleOptions.storageKey === 'string' && moduleOptions.storageKey.trim()
      ? moduleOptions.storageKey.trim()
      : resolveDefaultStorageKey(editor);
  return {
    storageKey: storageKeyText,
    autosaveDelay: Number.isFinite(moduleOptions.autosaveDelay) ? moduleOptions.autosaveDelay : 2000,
    maxRevisions: Number.isFinite(moduleOptions.maxRevisions) ? moduleOptions.maxRevisions : 25,
    autoload: moduleOptions.autoload !== false,
  };
};

export default resolvePersistenceOptions;
