const wirePreviewModeChrome = (editor, stripElement) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = stripElement.ownerDocument;
  const setPreviewState = (isPreviewing) => {
    if (isPreviewing) stripElement.setAttribute('data-db-preview', 'true');
    else stripElement.removeAttribute('data-db-preview');
    containerElement && containerElement.classList.toggle('gjs-db-previewing', isPreviewing);
    if (!isPreviewing) return;
    const exitButton = stripElement.querySelector('.gjs-db-preview-exit-button');
    exitButton && exitButton.focus && exitButton.focus();
  };
  const handleEscapeKey = (keyEvent) => {
    if (keyEvent.key !== 'Escape' || !editor.Commands.isActive('core:preview')) return;
    if (editor.Modal && editor.Modal.isOpen && editor.Modal.isOpen()) return;
    keyEvent.preventDefault();
    editor.Commands.stop('core:preview');
  };
  editor.on('command:run:core:preview', () => setPreviewState(true));
  editor.on('command:stop:core:preview', () => setPreviewState(false));
  ownerDocument.addEventListener('keydown', handleEscapeKey);
  editor.on('destroy', () => ownerDocument.removeEventListener('keydown', handleEscapeKey));
  setPreviewState(editor.Commands.isActive('core:preview'));
};

export default wirePreviewModeChrome;
