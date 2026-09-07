import createLocalStorageSiteAdapter from './createLocalStorageSiteAdapter.js';
import isPlainRecord from '../support/isPlainRecord.js';

const defaultOwnerRecord = { id: 'local-owner', name: 'Site owner', email: '' };

const resolveOwnerRecord = (ownerValues) => {
  const ownerRecord = isPlainRecord(ownerValues) ? ownerValues : {};
  return {
    id: String(ownerRecord.id || defaultOwnerRecord.id),
    name: String(ownerRecord.name || defaultOwnerRecord.name),
    email: String(ownerRecord.email || ''),
  };
};

const resolveSiteManagerOptions = (pluginOptions) => {
  const moduleOptions =
    isPlainRecord(pluginOptions) && isPlainRecord(pluginOptions.siteManager) ? pluginOptions.siteManager : {};
  return {
    storageAdapter: isPlainRecord(moduleOptions.storageAdapter)
      ? moduleOptions.storageAdapter
      : createLocalStorageSiteAdapter(),
    user: resolveOwnerRecord(moduleOptions.user),
    openOnStart: moduleOptions.openOnStart !== false,
    enabled: moduleOptions.enabled !== false,
  };
};

export default resolveSiteManagerOptions;
