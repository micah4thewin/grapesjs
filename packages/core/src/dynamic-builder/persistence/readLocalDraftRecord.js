import buildRevisionMetaRecord from './buildRevisionMetaRecord.js';
import isDraftRecoveryMode from './isDraftRecoveryMode.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';
import resolveStorageKey from './resolveStorageKey.js';
import restorePayloadAssets from './restorePayloadAssets.js';

const readLocalDraftRecord = (editor, moduleOptions) => {
  if (!isDraftRecoveryMode(editor, moduleOptions)) return null;
  const readSnapshot = readStoredJsonRecord(resolveStorageKey(editor, moduleOptions));
  if (!isPlainRecord(readSnapshot) || !isPlainRecord(readSnapshot.projectData)) return null;
  const storedSnapshot = restorePayloadAssets(editor, moduleOptions, readSnapshot);
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
