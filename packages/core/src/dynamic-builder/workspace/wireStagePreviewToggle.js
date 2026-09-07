const wireStagePreviewToggle = (editor, workspaceElement) => {
  const previewButton = workspaceElement.querySelector('[data-db-stage-preview]');
  const setPreviewState = (isPreviewing) => {
    workspaceElement.setAttribute('data-db-preview', isPreviewing ? '1' : '0');
    if (previewButton) previewButton.setAttribute('aria-pressed', isPreviewing ? 'true' : 'false');
  };
  workspaceElement.addEventListener('click', (clickEvent) => {
    const toggleButton = clickEvent.target.closest && clickEvent.target.closest('[data-db-stage-preview]');
    if (!toggleButton || !workspaceElement.contains(toggleButton)) return;
    if (editor.Commands.isActive('core:preview')) editor.stopCommand('core:preview');
    else editor.runCommand('core:preview');
  });
  editor.on('command:run:core:preview command:run:preview', () => setPreviewState(true));
  editor.on('command:stop:core:preview command:stop:preview', () => setPreviewState(false));
  setPreviewState(editor.Commands.isActive('core:preview'));
};

export default wireStagePreviewToggle;
