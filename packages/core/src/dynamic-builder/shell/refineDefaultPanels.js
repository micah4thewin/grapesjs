import getIconMarkup from '../support/getIconMarkup.js';

const refineDefaultPanels = (editor) => {
  const panelManager = editor.Panels;
  if (!panelManager || !panelManager.getPanel) return;
  const removeRedundantPanels = () =>
    ['commands', 'options', 'devices-c'].forEach((redundantPanelId) => {
      if (panelManager.getPanel(redundantPanelId)) panelManager.removePanel(redundantPanelId);
    });
  removeRedundantPanels();
  editor.on('command:run:core:open-styles', () => setTimeout(removeRedundantPanels, 30));
  const viewButtonPresentation = {
    'open-sm': { iconName: 'styles', readableLabel: 'Style manager' },
    'open-tm': { iconName: 'traits', readableLabel: 'Settings' },
    'open-layers': { iconName: 'layers', readableLabel: 'Layers' },
    'open-blocks': { iconName: 'blocks', readableLabel: 'Blocks' },
  };
  const viewsPanel = panelManager.getPanel('views');
  if (!viewsPanel) return;
  const viewButtons = viewsPanel.get('buttons');
  viewButtons &&
    viewButtons.forEach((viewButton) => {
      const presentation = viewButtonPresentation[viewButton.get('id')];
      if (!presentation) return;
      viewButton.set({
        className: 'gjs-db-view-button',
        label: getIconMarkup(presentation.iconName, { size: 18, label: presentation.readableLabel }),
        attributes: { title: presentation.readableLabel },
      });
    });
};

export default refineDefaultPanels;
