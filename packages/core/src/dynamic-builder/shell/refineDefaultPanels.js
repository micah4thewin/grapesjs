import getIconMarkup from '../support/getIconMarkup.js';
import getViewsPanelButtonTitles from './getViewsPanelButtonTitles.js';
import isEditorLive from '../support/isEditorLive.js';

const refineDefaultPanels = (editor) => {
  const panelManager = editor.Panels;
  if (!panelManager || !panelManager.getPanel) return;
  const removeRedundantPanels = () => {
    if (!isEditorLive(editor)) return;
    ['commands', 'options', 'devices-c'].forEach((redundantPanelId) => {
      if (panelManager.getPanel(redundantPanelId)) panelManager.removePanel(redundantPanelId);
    });
  };
  removeRedundantPanels();
  editor.on('command:run:core:open-styles', () => setTimeout(removeRedundantPanels, 30));
  const viewButtonPresentation = getViewsPanelButtonTitles();
  const titleMessages = {};
  Object.keys(viewButtonPresentation).forEach((buttonId) => {
    titleMessages[buttonId] = viewButtonPresentation[buttonId].readableLabel;
  });
  if (editor.I18n && editor.I18n.addMessages) {
    const currentLocale = editor.I18n.getLocale ? editor.I18n.getLocale() : 'en';
    editor.I18n.addMessages({ [currentLocale]: { panels: { buttons: { titles: titleMessages } } } });
  }
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
        attributes: { title: presentation.readableLabel, 'aria-label': presentation.readableLabel },
      });
    });
};

export default refineDefaultPanels;
