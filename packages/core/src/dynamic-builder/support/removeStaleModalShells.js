const removeStaleModalShells = (editor, activeShellElement) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || typeof containerElement.querySelectorAll !== 'function') return;
  Array.from(containerElement.querySelectorAll('.gjs-db-modal-shell'))
    .filter((shellElement) => shellElement !== activeShellElement)
    .forEach((shellElement) => shellElement.remove());
};

export default removeStaleModalShells;
