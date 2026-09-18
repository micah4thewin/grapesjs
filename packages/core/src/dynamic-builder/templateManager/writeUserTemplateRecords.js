import getUserTemplateStorageKey from './getUserTemplateStorageKey.js';
import writeStoredJsonRecord from '../persistence/writeStoredJsonRecord.js';

// Saved templates carry whole sections, pictures included, so they share the
// project store rather than sitting in the small localStorage budget.
const writeUserTemplateRecords = (templateRecords) =>
  !writeStoredJsonRecord(getUserTemplateStorageKey(), Array.isArray(templateRecords) ? templateRecords : []);

export default writeUserTemplateRecords;
