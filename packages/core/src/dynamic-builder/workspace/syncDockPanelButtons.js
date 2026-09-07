const syncDockPanelButtons = (editor, toolId) => {
  const panelManager = editor.Panels;
  const viewsPanel = panelManager && panelManager.getPanel ? panelManager.getPanel('views') : null;
  const viewButtons = viewsPanel ? viewsPanel.get('buttons') : null;
  if (!viewButtons) return;
  const buttonIdByTool = { blocks: 'open-blocks', layers: 'open-layers' };
  const wantedButtonId = buttonIdByTool[toolId] || '';
  ['open-blocks', 'open-layers'].forEach((buttonId) => {
    const viewButton = viewButtons.filter((candidate) => candidate.get('id') === buttonId)[0];
    if (!viewButton) return;
    const shouldBeActive = buttonId === wantedButtonId;
    if (Boolean(viewButton.get('active')) !== shouldBeActive) viewButton.set('active', shouldBeActive);
  });
};

export default syncDockPanelButtons;
