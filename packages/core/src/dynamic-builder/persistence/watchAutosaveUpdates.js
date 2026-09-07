import readSnapshotOwnerRecord from './readSnapshotOwnerRecord.js';
import saveProjectSnapshot from './saveProjectSnapshot.js';
import wireAutosaveFlushListeners from './wireAutosaveFlushListeners.js';
import wireForeignSnapshotWatch from './wireForeignSnapshotWatch.js';

const watchAutosaveUpdates = (editor, moduleOptions) => {
  let pendingSaveTimer = null;
  const knownOwner = readSnapshotOwnerRecord(moduleOptions);
  editor.getModel().set('dbLastKnownSavedAt', knownOwner ? knownOwner.savedAt : '');
  const cancelPendingSave = () => {
    if (!pendingSaveTimer) return;
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  };
  const scheduleSnapshotSave = () => {
    cancelPendingSave();
    pendingSaveTimer = setTimeout(() => {
      pendingSaveTimer = null;
      saveProjectSnapshot(editor, moduleOptions);
    }, moduleOptions.autosaveDelay);
  };
  const flushPendingSave = () => {
    if (!pendingSaveTimer) return false;
    cancelPendingSave();
    return saveProjectSnapshot(editor, moduleOptions);
  };
  editor.on('update', scheduleSnapshotSave);
  editor.on('destroy', cancelPendingSave);
  editor.getModel().set('dbFlushPendingSave', flushPendingSave);
  wireAutosaveFlushListeners(editor, flushPendingSave);
  wireForeignSnapshotWatch(editor, moduleOptions, cancelPendingSave);
};

export default watchAutosaveUpdates;
