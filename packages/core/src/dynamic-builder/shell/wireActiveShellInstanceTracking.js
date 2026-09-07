const wireActiveShellInstanceTracking = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument || containerElement.getAttribute('data-db-shell-tracked') === 'true') return;
  containerElement.setAttribute('data-db-shell-tracked', 'true');
  const markActiveInstance = () => {
    if (containerElement.getAttribute('data-db-shell-active') === 'true') return;
    ownerDocument.querySelectorAll('[data-db-shell-active]').forEach((otherContainer) => {
      otherContainer.removeAttribute('data-db-shell-active');
    });
    containerElement.setAttribute('data-db-shell-active', 'true');
  };
  containerElement.addEventListener('focusin', markActiveInstance);
  containerElement.addEventListener('pointerdown', markActiveInstance, true);
  editor.on('destroy', () => {
    containerElement.removeAttribute('data-db-shell-active');
    containerElement.removeAttribute('data-db-shell-tracked');
  });
};

export default wireActiveShellInstanceTracking;
