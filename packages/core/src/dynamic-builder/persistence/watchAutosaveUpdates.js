import saveProjectSnapshot from './saveProjectSnapshot.js';
import syncLastKnownSavedAt from './syncLastKnownSavedAt.js';
import wireAutosaveFlushListeners from './wireAutosaveFlushListeners.js';
import wireForeignSnapshotWatch from './wireForeignSnapshotWatch.js';

const watchAutosaveUpdates = (editor, moduleOptions) => {
  let pendingSaveTimer = null;
  syncLastKnownSavedAt(editor, moduleOptions);
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
  const persistNow = () => {
    cancelPendingSave();
    return saveProjectSnapshot(editor, moduleOptions);
  };
  editor.on('update', scheduleSnapshotSave);
  editor.on('destroy', cancelPendingSave);
  editor.getModel().set('dbFlushPendingSave', flushPendingSave);
  editor.getModel().set('dbPersistNow', persistNow);
  wireAutosaveFlushListeners(editor, flushPendingSave);
  wireForeignSnapshotWatch(editor, moduleOptions, cancelPendingSave);
};

export default watchAutosaveUpdates;
