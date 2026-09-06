import removeStaleModalShells from './removeStaleModalShells.js';

const openThemedModal = (editor, modalTitle, modalContent, options = {}) => {
  const modalClassName = ['gjs-db-modal', options.className || ''].join(' ').trim();
  let safeContent = modalContent;
  if (modalContent && modalContent.nodeType === 1 && modalContent.ownerDocument) {
    const wrapperElement = modalContent.ownerDocument.createElement('div');
    wrapperElement.className = 'gjs-db-modal-shell';
    wrapperElement.appendChild(modalContent);
    safeContent = wrapperElement;
  }
  editor.Modal.open({
    title: modalTitle,
    content: safeContent,
    attributes: { class: modalClassName },
  });
  removeStaleModalShells(editor, safeContent);
  return editor.Modal;
};

export default openThemedModal;
