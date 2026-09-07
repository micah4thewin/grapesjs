import ensureManagerPanelsPlaced from './ensureManagerPanelsPlaced.js';
import isEditorLive from '../support/isEditorLive.js';

const retryManagerPanelPlacement = (editor, workspaceElement) => {
  const placeWhenLive = () => {
    if (!isEditorLive(editor) || !workspaceElement.isConnected) return;
    ensureManagerPanelsPlaced(editor, workspaceElement);
  };
  [0, 200, 600, 1500, 3000].forEach((attemptDelay) => setTimeout(placeWhenLive, attemptDelay));
  editor.on('canvas:frame:load page:select component:selected', () => setTimeout(placeWhenLive, 60));
};

export default retryManagerPanelPlacement;
