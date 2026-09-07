import getUserTemplateStorageKey from './getUserTemplateStorageKey.js';
import normalizeUserTemplateRecord from './normalizeUserTemplateRecord.js';

const readUserTemplateRecords = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const storedText = window.localStorage.getItem(getUserTemplateStorageKey());
    const storedList = storedText ? JSON.parse(storedText) : [];
    if (!Array.isArray(storedList)) return [];
    return storedList.map((storedRecord) => normalizeUserTemplateRecord(storedRecord)).filter(Boolean);
  } catch (storageError) {
    return [];
  }
};

export default readUserTemplateRecords;
