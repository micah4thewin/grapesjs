const applyModalDialogSemantics = (dialogElement) => {
  if (!dialogElement || !dialogElement.setAttribute) return;
  dialogElement.setAttribute('role', 'dialog');
  dialogElement.setAttribute('aria-modal', 'true');
  if (!dialogElement.hasAttribute('tabindex')) dialogElement.setAttribute('tabindex', '-1');
  const titleElement = dialogElement.querySelector('.gjs-mdl-title');
  if (!titleElement) return;
  if (!titleElement.id) {
    const ownerDocument = dialogElement.ownerDocument;
    const titledCount = ownerDocument ? ownerDocument.querySelectorAll('.gjs-mdl-title[id]').length : 0;
    titleElement.id = 'db-modal-title' + (titledCount ? '-' + (titledCount + 1) : '');
  }
  dialogElement.setAttribute('aria-labelledby', titleElement.id);
};

export default applyModalDialogSemantics;
