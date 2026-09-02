import saveProjectSnapshot from './saveProjectSnapshot.js';

const watchAutosaveUpdates = (editor, moduleOptions) => {
  let pendingSaveTimer = null;
  const scheduleSnapshotSave = () => {
    if (pendingSaveTimer) clearTimeout(pendingSaveTimer);
    pendingSaveTimer = setTimeout(() => {
      pendingSaveTimer = null;
      saveProjectSnapshot(editor, moduleOptions);
    }, moduleOptions.autosaveDelay);
  };
  const cancelPendingSave = () => {
    if (!pendingSaveTimer) return;
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  };
  editor.on('update', scheduleSnapshotSave);
  editor.on('destroy', cancelPendingSave);
};

export default watchAutosaveUpdates;
