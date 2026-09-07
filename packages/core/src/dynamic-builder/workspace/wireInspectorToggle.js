const wireInspectorToggle = (editor, workspaceElement) => {
  const toggleButton = workspaceElement.querySelector('[data-db-inspector-toggle]');
  const setInspectorState = (isOpen) => {
    workspaceElement.setAttribute('data-db-inspector-open', isOpen ? '1' : '0');
    if (toggleButton) toggleButton.setAttribute('aria-pressed', isOpen ? 'true' : 'false');
  };
  workspaceElement.addEventListener('click', (clickEvent) => {
    const pressedButton = clickEvent.target.closest && clickEvent.target.closest('[data-db-inspector-toggle]');
    if (!pressedButton || !workspaceElement.contains(pressedButton)) return;
    setInspectorState(workspaceElement.getAttribute('data-db-inspector-open') !== '1');
  });
  editor.on('destroy', () => setInspectorState(false));
  setInspectorState(workspaceElement.getAttribute('data-db-inspector-open') === '1');
};

export default wireInspectorToggle;
