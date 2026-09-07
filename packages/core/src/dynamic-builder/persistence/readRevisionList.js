import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';

const readRevisionList = (editor, moduleOptions) => {
  const storedList = readStoredJsonRecord(buildRevisionsStorageKey(editor, moduleOptions));
  if (!Array.isArray(storedList)) return [];
  return storedList
    .filter(
      (revisionRecord) => isPlainRecord(revisionRecord) && typeof revisionRecord.id === 'string' && revisionRecord.id,
    )
    .map((revisionRecord) => ({
      ...revisionRecord,
      isRestorable: isPlainRecord(revisionRecord.payload) && isPlainRecord(revisionRecord.payload.projectData),
    }));
};

export default readRevisionList;
