import buildRevisionMetaRecord from './buildRevisionMetaRecord.js';
import isDraftRecoveryMode from './isDraftRecoveryMode.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';
import resolveStorageKey from './resolveStorageKey.js';

// The payload keeps its tokens here: the list only needs the page names and the
// size, and a restore fetches the pictures when one is actually chosen.
const readLocalDraftRecord = (editor, moduleOptions) => {
  if (!isDraftRecoveryMode(editor, moduleOptions)) return null;
  const storedSnapshot = readStoredJsonRecord(resolveStorageKey(editor, moduleOptions));
  if (!isPlainRecord(storedSnapshot) || !isPlainRecord(storedSnapshot.projectData)) return null;
  const draftMeta = buildRevisionMetaRecord(storedSnapshot);
  return {
    id: 'autosave-draft',
    label: 'Local autosave draft',
    savedAt: String(storedSnapshot.savedAt || ''),
    kind: 'draft',
    meta: Number.isFinite(storedSnapshot.byteLength)
      ? { ...draftMeta, byteLength: storedSnapshot.byteLength }
      : draftMeta,
    payload: storedSnapshot,
    isRestorable: true,
  };
};

export default readLocalDraftRecord;
