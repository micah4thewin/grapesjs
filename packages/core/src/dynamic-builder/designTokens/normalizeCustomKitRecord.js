import isPlainRecord from '../support/isPlainRecord.js';

const normalizeCustomKitRecord = (rawKit) => {
  if (!isPlainRecord(rawKit) || !isPlainRecord(rawKit.tokens)) return null;
  const kitId = typeof rawKit.kitId === 'string' ? rawKit.kitId.trim() : '';
  const kitName = typeof rawKit.kitName === 'string' ? rawKit.kitName.trim() : '';
  if (!kitId || !kitName) return null;
  const tokens = {};
  ['color', 'font'].forEach((groupKey) => {
    if (isPlainRecord(rawKit.tokens[groupKey])) tokens[groupKey] = { ...rawKit.tokens[groupKey] };
  });
  return {
    kitId,
    kitName,
    kitHint: typeof rawKit.kitHint === 'string' && rawKit.kitHint.trim() ? rawKit.kitHint.trim() : 'Saved kit',
    fontFamilies: Array.isArray(rawKit.fontFamilies)
      ? rawKit.fontFamilies.filter((familyName) => typeof familyName === 'string' && familyName.trim())
      : [],
    tokens,
    isCustom: true,
  };
};

export default normalizeCustomKitRecord;
