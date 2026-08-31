import saveProjectSnapshot from './saveProjectSnapshot.js';

const watchAutosaveUpdates = (editor, moduleOptions) => {
  let pendingSaveTimer = null;
  editor.on('update', () => {
    if (pendingSaveTimer) clearTimeout(pendingSaveTimer);
    pendingSaveTimer = setTimeout(() => {
      pendingSaveTimer = null;
      saveProjectSnapshot(editor, moduleOptions);
    }, moduleOptions.autosaveDelay);
  });
};

export default watchAutosaveUpdates;
