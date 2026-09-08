import saveProjectSnapshot from './saveProjectSnapshot.js';
import syncLastKnownSavedAt from './syncLastKnownSavedAt.js';
import wireAutosaveFlushListeners from './wireAutosaveFlushListeners.js';
import wireForeignSnapshotWatch from './wireForeignSnapshotWatch.js';

// Building a project snapshot makes GrapesJS sync the text that is being edited
// back into its model, which rebuilds the text node under the caret and throws
// the caret to the start of the line. So the autosave waits until inline editing
// ends before it takes the snapshot.
const isEditingText = (editor) => Boolean(editor && typeof editor.getEditing === 'function' && editor.getEditing());

const watchAutosaveUpdates = (editor, moduleOptions) => {
  let pendingSaveTimer = null;
  let saveWhenEditingEnds = false;
  syncLastKnownSavedAt(editor, moduleOptions);
  const cancelPendingSave = () => {
    saveWhenEditingEnds = false;
    if (!pendingSaveTimer) return;
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  };
  const scheduleSnapshotSave = () => {
    cancelPendingSave();
    pendingSaveTimer = setTimeout(() => {
      pendingSaveTimer = null;
      if (isEditingText(editor)) {
        saveWhenEditingEnds = true;
        return;
      }
      saveProjectSnapshot(editor, moduleOptions);
    }, moduleOptions.autosaveDelay);
  };
  const flushPendingSave = () => {
    if (!pendingSaveTimer && !saveWhenEditingEnds) return false;
    cancelPendingSave();
    return saveProjectSnapshot(editor, moduleOptions);
  };
  const persistNow = () => {
    cancelPendingSave();
    return saveProjectSnapshot(editor, moduleOptions);
  };
  editor.on('update', scheduleSnapshotSave);
  editor.on('rte:disable', () => {
    if (saveWhenEditingEnds) scheduleSnapshotSave();
  });
  editor.on('destroy', cancelPendingSave);
  editor.getModel().set('dbFlushPendingSave', flushPendingSave);
  editor.getModel().set('dbPersistNow', persistNow);
  wireAutosaveFlushListeners(editor, flushPendingSave);
  wireForeignSnapshotWatch(editor, moduleOptions, cancelPendingSave);
};

export default watchAutosaveUpdates;
