import resolveContainerWindow from './resolveContainerWindow.js';

const wireAutosaveFlushListeners = (editor, flushPendingSave) => {
  const containerWindow = resolveContainerWindow(editor);
  if (!containerWindow || typeof containerWindow.addEventListener !== 'function') return;
  const containerDocument = containerWindow.document;
  const handlePageHide = () => flushPendingSave();
  const handleVisibilityChange = () => {
    if (containerDocument && containerDocument.visibilityState === 'hidden') flushPendingSave();
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
