import getUserTemplateStorageKey from './getUserTemplateStorageKey.js';
import normalizeUserTemplateRecord from './normalizeUserTemplateRecord.js';
import readStoredJsonRecord from '../persistence/readStoredJsonRecord.js';

const readUserTemplateRecords = () => {
  const storedList = readStoredJsonRecord(getUserTemplateStorageKey());
  if (!Array.isArray(storedList)) return [];
  return storedList.map((storedRecord) => normalizeUserTemplateRecord(storedRecord)).filter(Boolean);
};

export default readUserTemplateRecords;
