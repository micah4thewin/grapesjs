import isPlainRecord from '../support/isPlainRecord.js';

const readProviderApiKey = (moduleOptions, providerId) => {
  const keyRecord = isPlainRecord(moduleOptions.keys) ? moduleOptions.keys : {};
  const namedProvider = String(moduleOptions.provider || '')
    .trim()
    .toLowerCase();
  const sharedKey = namedProvider === providerId ? moduleOptions.apiKey : '';
  return String(keyRecord[providerId] || sharedKey || '').trim();
};

export default readProviderApiKey;
