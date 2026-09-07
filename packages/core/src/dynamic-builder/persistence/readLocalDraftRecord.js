import buildRevisionMetaRecord from './buildRevisionMetaRecord.js';
import isDraftRecoveryMode from './isDraftRecoveryMode.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';

const readLocalDraftRecord = (editor, moduleOptions) => {
  if (!isDraftRecoveryMode(editor, moduleOptions)) return null;
  const storedSnapshot = readStoredJsonRecord(moduleOptions.storageKey);
  if (!isPlainRecord(storedSnapshot) || !isPlainRecord(storedSnapshot.projectData)) return null;
  return {
    id: 'autosave-draft',
    label: 'Local autosave draft',
    savedAt: String(storedSnapshot.savedAt || ''),
    kind: 'draft',
    meta: buildRevisionMetaRecord(storedSnapshot),
    payload: storedSnapshot,
    isRestorable: true,
  };
};

export default readLocalDraftRecord;
