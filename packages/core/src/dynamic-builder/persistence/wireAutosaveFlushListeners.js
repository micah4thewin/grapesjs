import resolveContainerWindow from './resolveContainerWindow.js';
import { flushAssetWrites } from './storage/getAssetPoolStore.js';
import { flushRecordStorage } from './storage/getRecordStorageArea.js';

// The snapshot reaches the in-memory mirror synchronously, so the page can go
// away mid-flight without losing it. Asking both stores to settle now gives the
// browser the best chance of committing before it does.
const flushStoredWrites = () => {
  flushRecordStorage().catch(() => false);
  flushAssetWrites().catch(() => false);
};

const wireAutosaveFlushListeners = (editor, flushPendingSave) => {
  const containerWindow = resolveContainerWindow(editor);
  if (!containerWindow || typeof containerWindow.addEventListener !== 'function') return;
  const containerDocument = containerWindow.document;
  const handlePageHide = () => {
    flushPendingSave();
    flushStoredWrites();
  };
  const handleVisibilityChange = () => {
    if (containerDocument && containerDocument.visibilityState === 'hidden') handlePageHide();
  };
  containerWindow.addEventListener('pagehide', handlePageHide);
  containerWindow.addEventListener('beforeunload', handlePageHide);
  containerDocument && containerDocument.addEventListener('visibilitychange', handleVisibilityChange);
  editor.on('destroy', () => {
    containerWindow.removeEventListener('pagehide', handlePageHide);
    containerWindow.removeEventListener('beforeunload', handlePageHide);
    containerDocument && containerDocument.removeEventListener('visibilitychange', handleVisibilityChange);
  });
};

export default wireAutosaveFlushListeners;
