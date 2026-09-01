const activateViewsPanelButton = (editor, commandId) => {
  const viewsPanel = editor.Panels && editor.Panels.getPanel && editor.Panels.getPanel('views');
  if (!viewsPanel) return false;
  const viewButtons = viewsPanel.get('buttons');
  if (!viewButtons) return false;
  const targetButton = viewButtons.filter(
    (viewButton) => `core:${viewButton.get('command')}` === commandId || viewButton.get('command') === commandId,
  )[0];
  if (!targetButton) return false;
  targetButton.set('active', true);
  return true;
};

export default activateViewsPanelButton;
