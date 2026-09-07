import getViewButtonContextRecords from './getViewButtonContextRecords.js';

const prepareManagerPanels = (editor) => {
  const panelManager = editor.Panels;
  const viewsPanel = panelManager && panelManager.getPanel ? panelManager.getPanel('views') : null;
  if (!viewsPanel) return;
  const contextRecords = getViewButtonContextRecords();
  const viewButtons = viewsPanel.get('buttons');
  if (!viewButtons) return;
  viewButtons.forEach((viewButton) => {
    const nextContext = contextRecords[viewButton.get('id')];
    if (nextContext) viewButton.set('context', nextContext);
  });
};

export default prepareManagerPanels;
