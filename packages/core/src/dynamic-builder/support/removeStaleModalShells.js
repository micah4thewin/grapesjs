const removeStaleModalShells = (editor, activeShellElement) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument) return;
  Array.from(ownerDocument.querySelectorAll('.gjs-db-modal-shell'))
    .filter((shellElement) => shellElement !== activeShellElement)
    .forEach((shellElement) => shellElement.remove());
};

export default removeStaleModalShells;
