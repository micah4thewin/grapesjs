import getShellLayoutCss from './getShellLayoutCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import keepComponentTypeViewStatics from '../support/keepComponentTypeViewStatics.js';
import refineDefaultPanels from './refineDefaultPanels.js';
import registerShellCommands from './registerShellCommands.js';
import registerShellKeymaps from './registerShellKeymaps.js';
import mountShellInputChrome from './mountShellInputChrome.js';
import renderShellTopBar from './renderShellTopBar.js';
import wireToastNotifications from './wireToastNotifications.js';
import restoreCanvasAfterPageUndo from './restoreCanvasAfterPageUndo.js';
import syncCanvasThemeAttribute from './syncCanvasThemeAttribute.js';
import wireFirstRunGuidance from './wireFirstRunGuidance.js';
import wireFirstSaveHint from './wireFirstSaveHint.js';
import wireShellPageLifecycle from './wireShellPageLifecycle.js';

const applyEditorShell = (editor, pluginOptions) => {
  keepComponentTypeViewStatics(editor);
  restoreCanvasAfterPageUndo(editor);
  const shellOptions = (pluginOptions && pluginOptions.shell) || {};
  const themeOptions = (pluginOptions && pluginOptions.theme) || {};
  const editorConfig = editor.getConfig && editor.getConfig();
  if (editorConfig) editorConfig.showDevices = false;
  registerShellCommands(editor, pluginOptions);
  if (!editor.onReady) return;
  editor.onReady(() => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement || !containerElement.ownerDocument) return;
    injectEditorStylesOnce(editor, 'db-css-shell-layout', getShellLayoutCss());
    refineDefaultPanels(editor);
    wireShellPageLifecycle(editor);
    renderShellTopBar(editor, shellOptions, themeOptions, pluginOptions);
    registerShellKeymaps(editor);
    mountShellInputChrome(editor);
    wireToastNotifications(editor);
    wireFirstSaveHint(editor, pluginOptions);
    syncCanvasThemeAttribute(editor);
    wireFirstRunGuidance(editor, pluginOptions);
  });
};

export default applyEditorShell;
