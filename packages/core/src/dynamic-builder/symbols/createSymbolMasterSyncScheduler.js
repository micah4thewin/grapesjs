import captureSymbolFromInstance from './captureSymbolFromInstance.js';
import isEditorLive from '../support/isEditorLive.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import runSymbolUndoStep from './runSymbolUndoStep.js';

const createSymbolMasterSyncScheduler = (editor) => {
  let syncTimer = null;
  let isSyncing = false;
  const runMasterSync = (instanceComponent) => {
    syncTimer = null;
    if (!isEditorLive(editor)) return;
    isSyncing = true;
    try {
      runSymbolUndoStep(editor, () => {
        captureSymbolFromInstance(editor, instanceComponent);
        renderAllSymbolInstances(editor, resolveSymbolIdOfComponent(instanceComponent), instanceComponent);
      });
    } finally {
      isSyncing = false;
    }
  };
  const cancelPendingSync = () => {
    syncTimer && clearTimeout(syncTimer);
    syncTimer = null;
  };
  return {
    isSyncing: () => isSyncing,
    cancel: cancelPendingSync,
    schedule: (instanceComponent) => {
      if (isSyncing) return;
      cancelPendingSync();
      syncTimer = setTimeout(() => runMasterSync(instanceComponent), 350);
    },
  };
};

export default createSymbolMasterSyncScheduler;
