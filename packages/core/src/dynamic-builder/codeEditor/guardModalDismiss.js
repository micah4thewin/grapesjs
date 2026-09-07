const guardModalDismiss = (editor, isDirty, onBlocked) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return () => undefined;
  let released = false;
  const handleCapturedClick = (clickEvent) => {
    const targetElement = clickEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const isCloseControl = !!targetElement.closest('[data-close-modal]');
    const isBackdrop = !!targetElement.classList && targetElement.classList.contains('gjs-mdl-container');
    if ((!isCloseControl && !isBackdrop) || !isDirty()) return;
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    onBlocked();
  };
  const release = () => {
    if (released) return;
    released = true;
    ownerDocument.removeEventListener('click', handleCapturedClick, true);
    editor.off('modal:close', release);
  };
  ownerDocument.addEventListener('click', handleCapturedClick, true);
  editor.on('modal:close', release);
  return release;
};

export default guardModalDismiss;
