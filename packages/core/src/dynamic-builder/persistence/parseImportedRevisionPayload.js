import isPlainRecord from '../support/isPlainRecord.js';

const parseImportedRevisionPayload = (jsonText) => {
  let parsedValue = null;
  try {
    parsedValue = JSON.parse(String(jsonText || ''));
  } catch (parseError) {
    return null;
  }
  if (!isPlainRecord(parsedValue)) return null;
  const candidateRecord = isPlainRecord(parsedValue.payload) ? parsedValue.payload : parsedValue;
  if (isPlainRecord(candidateRecord.projectData)) {
    return {
      projectData: candidateRecord.projectData,
      siteMeta: isPlainRecord(candidateRecord.siteMeta) ? candidateRecord.siteMeta : {},
      savedAt: String(candidateRecord.savedAt || parsedValue.savedAt || ''),
    };
  }
  if (Array.isArray(candidateRecord.pages)) {
    return { projectData: candidateRecord, siteMeta: {}, savedAt: '' };
  }
  return null;
};

export default parseImportedRevisionPayload;
