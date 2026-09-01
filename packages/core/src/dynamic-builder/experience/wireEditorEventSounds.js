import createDebouncedAction from './createDebouncedAction.js';
import playFeedbackTone from './playFeedbackTone.js';
import triggerHapticPulse from './triggerHapticPulse.js';

const wireEditorEventSounds = (editor, hapticsEnabled) => {
  const playDropFeedback = createDebouncedAction(() => {
    playFeedbackTone(editor, 'drop');
    hapticsEnabled && triggerHapticPulse(12);
  }, 120);
  const playSelectFeedback = createDebouncedAction(() => playFeedbackTone(editor, 'select'), 160);
  const playRemoveFeedback = createDebouncedAction(() => {
    playFeedbackTone(editor, 'remove');
    hapticsEnabled && triggerHapticPulse(8);
  }, 160);
  const playSaveFeedback = createDebouncedAction(() => playFeedbackTone(editor, 'save'), 1500);
  const playSuccessFeedback = createDebouncedAction(() => playFeedbackTone(editor, 'success'), 800);
  const playErrorFeedback = createDebouncedAction(() => playFeedbackTone(editor, 'error'), 800);
  const playPageFeedback = createDebouncedAction(() => playFeedbackTone(editor, 'page'), 250);
  editor.on('block:drag:stop', (droppedComponent) => droppedComponent && playDropFeedback());
  editor.on('component:selected', playSelectFeedback);
  editor.on('component:remove', playRemoveFeedback);
  editor.on('db:revision:saved', playSaveFeedback);
  editor.on('db:save-status', (statusPayload) => {
    const statusState = (statusPayload || {}).state;
    if (statusState === 'error') playErrorFeedback();
  });
  editor.on('db:export:complete', playSuccessFeedback);
  editor.on('page:select', playPageFeedback);
};

export default wireEditorEventSounds;
