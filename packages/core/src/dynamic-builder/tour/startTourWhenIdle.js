import isEditorLive from '../support/isEditorLive.js';
import startGuidedTour from './startGuidedTour.js';

const settleDelay = 600;

const startTourWhenIdle = (editor, tourSettings) => {
  if (!isEditorLive(editor)) return false;
  const modalManager = editor.Modal;
  const hasOpenModal = Boolean(modalManager && modalManager.isOpen && modalManager.isOpen());
  if (!hasOpenModal) return startGuidedTour(editor, tourSettings, false);
  editor.once('modal:close', () =>
    setTimeout(() => {
      if (!isEditorLive(editor)) return;
      startTourWhenIdle(editor, tourSettings);
    }, settleDelay),
  );
  return false;
};

export default startTourWhenIdle;
