import applyDropSettleAnimation from './applyDropSettleAnimation.js';
import applyTouchTranslation from './applyTouchTranslation.js';
import autoOpenBlocksPanel from './autoOpenBlocksPanel.js';
import getExperienceCanvasCss from './getExperienceCanvasCss.js';
import getExperienceEditorCss from './getExperienceEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import mountBlockSearchInput from './mountBlockSearchInput.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';
import wireAudioUnlockGesture from './wireAudioUnlockGesture.js';
import wireEditorEventSounds from './wireEditorEventSounds.js';
import wireSoundToggle from './wireSoundToggle.js';

const applyExperienceUpgrades = (editor, pluginOptions) => {
  const moduleOptions = {
    sound: true,
    haptics: true,
    touch: true,
    dropAnimations: true,
    blockSearch: true,
    autoOpenBlocks: true,
    ...((pluginOptions && pluginOptions.experience) || {}),
  };
  moduleOptions.sound && wireEditorEventSounds(editor, moduleOptions.haptics);
  moduleOptions.dropAnimations && applyDropSettleAnimation(editor);
  registerEditorOnlyCanvasStyles(editor, 'db-css-experience-canvas', getExperienceCanvasCss());
  if (!editor.onReady) return;
  editor.onReady(() => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement) return;
    injectEditorStylesOnce(editor, 'db-css-experience-editor', getExperienceEditorCss());
    if (moduleOptions.sound) {
      wireSoundToggle(editor);
      wireAudioUnlockGesture(editor);
    }
    moduleOptions.touch && applyTouchTranslation(editor, moduleOptions.haptics);
    moduleOptions.blockSearch && mountBlockSearchInput(editor);
    moduleOptions.autoOpenBlocks && autoOpenBlocksPanel(editor);
  });
};

export default applyExperienceUpgrades;
