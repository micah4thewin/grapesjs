import getViewsPanelButtonIds from './getViewsPanelButtonIds.js';

const activateViewsPanelButton = (editor, commandId) => {
  const viewsPanel = editor.Panels && editor.Panels.getPanel && editor.Panels.getPanel('views');
  if (!viewsPanel) return false;
  const viewButtons = viewsPanel.get('buttons');
  if (!viewButtons) return false;
  const buttonIdByCommand = getViewsPanelButtonIds();
  const targetButtonId = buttonIdByCommand[commandId];
  const targetButton = viewButtons.filter((viewButton) => {
    const buttonId = viewButton.get('id');
    const buttonCommand = viewButton.get('command');
    return (
      (targetButtonId && buttonId === targetButtonId) ||
      buttonCommand === commandId ||
      `core:${buttonCommand}` === commandId
    );
  })[0];
  if (!targetButton) return false;
  targetButton.set('active', true);
  return true;
};

export default activateViewsPanelButton;
