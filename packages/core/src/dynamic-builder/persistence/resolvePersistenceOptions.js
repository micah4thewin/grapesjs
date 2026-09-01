import isPlainRecord from '../support/isPlainRecord.js';

const resolvePersistenceOptions = (pluginOptions) => {
  const rawOptions = pluginOptions && pluginOptions.persistence;
  const moduleOptions = isPlainRecord(rawOptions) ? rawOptions : {};
  const storageKeyText =
    typeof moduleOptions.storageKey === 'string' && moduleOptions.storageKey.trim()
      ? moduleOptions.storageKey.trim()
      : 'db-project';
  return {
    storageKey: storageKeyText,
    autosaveDelay: Number.isFinite(moduleOptions.autosaveDelay) ? moduleOptions.autosaveDelay : 2000,
    maxRevisions: Number.isFinite(moduleOptions.maxRevisions) ? moduleOptions.maxRevisions : 25,
    autoload: moduleOptions.autoload !== false,
  };
};

export default resolvePersistenceOptions;
