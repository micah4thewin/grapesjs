const collectWorkspaceZoneElements = (workspaceElement) => ({
  blocks: workspaceElement.querySelector('[data-db-dock-pane="blocks"]'),
  layers: workspaceElement.querySelector('[data-db-dock-pane="layers"]'),
  pages: workspaceElement.querySelector('[data-db-dock-pane="pages"]'),
  settings: workspaceElement.querySelector('[data-db-inspector-slot="settings"]'),
  style: workspaceElement.querySelector('[data-db-inspector-slot="style"]'),
});

export default collectWorkspaceZoneElements;
