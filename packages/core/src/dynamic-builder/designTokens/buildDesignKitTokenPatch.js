import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildDesignKitTokenPatch = (moduleOptions, kitTokens) => {
  const baselineRecord = buildBaselineTokenRecord(moduleOptions);
  const safeKitTokens = isPlainRecord(kitTokens) ? kitTokens : {};
  const tokenPatch = {};
  Object.keys(safeKitTokens).forEach((groupKey) => {
    if (!isPlainRecord(safeKitTokens[groupKey])) return;
    const baselineGroup = isPlainRecord(baselineRecord[groupKey]) ? baselineRecord[groupKey] : {};
    tokenPatch[groupKey] = { ...baselineGroup, ...safeKitTokens[groupKey] };
  });
  return tokenPatch;
};

export default buildDesignKitTokenPatch;
