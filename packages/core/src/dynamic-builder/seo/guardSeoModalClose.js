import isSeoModalDirty from './isSeoModalDirty.js';

const guardSeoModalClose = (editor, rootElement, reopenModal, promptUnsavedChanges) => {
  if (!editor.Modal || !editor.Modal.onceClose) return;
  editor.Modal.onceClose(() => {
    if (rootElement.dataset.dbSeoPicking === 'true') {
      setTimeout(reopenModal, 0);
      return;
    }
    if (rootElement.dataset.dbSeoResolved === 'true') return;
    if (!isSeoModalDirty(rootElement)) return;
    setTimeout(promptUnsavedChanges, 0);
  });
};

export default guardSeoModalClose;
