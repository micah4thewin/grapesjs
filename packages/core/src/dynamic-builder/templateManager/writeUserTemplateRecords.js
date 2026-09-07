import getUserTemplateStorageKey from './getUserTemplateStorageKey.js';

const writeUserTemplateRecords = (templateRecords) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(getUserTemplateStorageKey(), JSON.stringify(templateRecords));
    return true;
  } catch (storageError) {
    return false;
  }
};

export default writeUserTemplateRecords;
