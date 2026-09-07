import isPlainRecord from '../support/isPlainRecord.js';
import normalizeCustomKitRecord from './normalizeCustomKitRecord.js';

const parseCustomKitList = (jsonText) => {
  let parsedValue = null;
  try {
    parsedValue = JSON.parse(String(jsonText || ''));
  } catch (parseError) {
    return [];
  }
  const rawList = Array.isArray(parsedValue) ? parsedValue : isPlainRecord(parsedValue) ? parsedValue.kits : null;
  if (!Array.isArray(rawList)) return [];
  const seenIds = [];
  return rawList
    .map(normalizeCustomKitRecord)
    .filter((kitRecord) => {
      if (!kitRecord || seenIds.indexOf(kitRecord.kitId) >= 0) return false;
      seenIds.push(kitRecord.kitId);
      return true;
    })
    .slice(0, 40);
};

export default parseCustomKitList;
