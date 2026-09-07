import activateWorkspaceTool from './activateWorkspaceTool.js';
import isEditorLive from '../support/isEditorLive.js';

const wireRailTools = (editor, workspaceElement) => {
  const closeDock = () => {
    workspaceElement.setAttribute('data-db-dock-open', '0');
    workspaceElement.querySelectorAll('[data-db-tool-kind="pane"]').forEach((railButton) => {
      railButton.setAttribute('aria-pressed', 'false');
    });
  };
  workspaceElement.addEventListener('click', (clickEvent) => {
    const railButton = clickEvent.target.closest && clickEvent.target.closest('[data-db-tool]');
    if (railButton && workspaceElement.contains(railButton)) {
      const toolId = railButton.getAttribute('data-db-tool');
      const toolCommand = railButton.getAttribute('data-db-tool-command');
      if (railButton.getAttribute('data-db-tool-kind') === 'command') {
        if (toolCommand) editor.runCommand(toolCommand);
        return;
      }
      const isOpen = workspaceElement.getAttribute('data-db-dock-open') === '1';
      const isCurrent = workspaceElement.getAttribute('data-db-active-tool') === toolId;
      if (isOpen && isCurrent) closeDock();
      else activateWorkspaceTool(editor, workspaceElement, toolId);
      return;
    }
    const closeButton = clickEvent.target.closest && clickEvent.target.closest('[data-db-dock-close]');
    if (closeButton && workspaceElement.contains(closeButton)) closeDock();
  });
  const followCommand = (toolId) => (commandData) => {
    if (!isEditorLive(editor) || !workspaceElement.isConnected) return;
    if (!commandData || !commandData.options || !commandData.options.sender) return;
    if (workspaceElement.getAttribute('data-db-active-tool') === toolId) return;
    activateWorkspaceTool(editor, workspaceElement, toolId);
  };
  editor.on('command:run:open-blocks command:run:core:open-blocks', followCommand('blocks'));
  editor.on('command:run:open-layers command:run:core:open-layers', followCommand('layers'));
};

export default wireRailTools;
