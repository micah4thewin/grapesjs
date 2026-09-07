import getTourEditorCss from './getTourEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isEditorLive from '../support/isEditorLive.js';
import readShellPreference from '../shell/readShellPreference.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolveTourSettings from './resolveTourSettings.js';
import startGuidedTour from './startGuidedTour.js';
import wireTourHelpControl from './wireTourHelpControl.js';
import writeShellPreference from '../shell/writeShellPreference.js';

const preferenceName = 'guided-tour';

const applyGuidedTour = (editor, pluginOptions) => {
  const tourSettings = resolveTourSettings(pluginOptions);
  if (!tourSettings.enabled) return;
  registerCommandSet(editor, {
    'db:open-tour': (commandEditor) => {
      writeShellPreference(commandEditor, pluginOptions, preferenceName, 'seen');
      startGuidedTour(commandEditor, tourSettings, true);
    },
  });
  const injectTourStyles = () =>
    isEditorLive(editor) && injectEditorStylesOnce(editor, 'db-css-tour', getTourEditorCss());
  injectTourStyles();
  if (!editor.onReady) return;
  editor.onReady(() => {
    if (!isEditorLive(editor)) return;
    injectTourStyles();
    if (tourSettings.showHelpControl) wireTourHelpControl(editor);
    if (!tourSettings.autoStart) return;
    if (readShellPreference(editor, pluginOptions, preferenceName) !== '') return;
    setTimeout(() => {
      if (!isEditorLive(editor)) return;
      writeShellPreference(editor, pluginOptions, preferenceName, 'seen');
      startGuidedTour(editor, tourSettings, false);
    }, tourSettings.startDelay);
  });
};

export default applyGuidedTour;
