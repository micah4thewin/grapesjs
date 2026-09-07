import getWorkspaceToolRecords from './getWorkspaceToolRecords.js';
import moveBlockSearchIntoDock from './moveBlockSearchIntoDock.js';
import syncDockPanelButtons from './syncDockPanelButtons.js';

const activateWorkspaceTool = (editor, workspaceElement, toolId) => {
  const toolRecord = getWorkspaceToolRecords().filter(
    (candidate) => candidate.id === toolId && candidate.kind === 'pane',
  )[0];
  if (!toolRecord) return;
  workspaceElement.setAttribute('data-db-active-tool', toolId);
  workspaceElement.setAttribute('data-db-dock-open', '1');
  workspaceElement.querySelectorAll('[data-db-tool-kind="pane"]').forEach((railButton) => {
    railButton.setAttribute('aria-pressed', railButton.getAttribute('data-db-tool') === toolId ? 'true' : 'false');
  });
  workspaceElement.querySelectorAll('[data-db-dock-pane]').forEach((paneElement) => {
    const isActive = paneElement.getAttribute('data-db-dock-pane') === toolId;
    paneElement.setAttribute('data-db-pane-active', isActive ? '1' : '0');
  });
  const titleElement = workspaceElement.querySelector('[data-db-dock-title]');
  if (titleElement) titleElement.textContent = toolRecord.label;
  const hintElement = workspaceElement.querySelector('[data-db-dock-hint]');
  if (hintElement) hintElement.textContent = toolRecord.hint;
  moveBlockSearchIntoDock(editor, workspaceElement, toolId === 'blocks');
  syncDockPanelButtons(editor, toolId);
};

export default activateWorkspaceTool;
