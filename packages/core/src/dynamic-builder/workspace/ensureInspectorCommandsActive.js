const ensureInspectorCommandsActive = (editor) => {
  const panelManager = editor.Panels;
  const viewsPanel = panelManager && panelManager.getPanel ? panelManager.getPanel('views') : null;
  const viewButtons = viewsPanel ? viewsPanel.get('buttons') : null;
  if (!viewButtons) return;
  ['open-sm', 'open-tm'].forEach((buttonId) => {
    const viewButton = viewButtons.filter((candidate) => candidate.get('id') === buttonId)[0];
    if (viewButton && !viewButton.get('active')) viewButton.set('active', true);
  });
};

export default ensureInspectorCommandsActive;
