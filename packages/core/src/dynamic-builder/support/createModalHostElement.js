import openThemedModal from './openThemedModal.js';

const createModalHostElement = (editor, modalTitle, options = {}) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const hostElement = containerElement.ownerDocument.createElement('div');
  hostElement.className = 'gjs-db-modal-host';
  const renderHostContent = (contentElement) => {
    hostElement.textContent = '';
    if (contentElement) hostElement.appendChild(contentElement);
  };
  openThemedModal(editor, modalTitle, hostElement, options);
  return { hostElement, render: renderHostContent };
};

export default createModalHostElement;
