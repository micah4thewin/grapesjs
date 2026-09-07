const isPrimaryShellInstance = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return false;
  const activeContainer = ownerDocument.querySelector('[data-db-shell-active="true"]');
  if (activeContainer) return activeContainer === containerElement;
  const firstContainer = ownerDocument.querySelector('[data-db-shell-instance]');
  return !firstContainer || firstContainer === containerElement;
};

export default isPrimaryShellInstance;
