import getShellLayoutCss from './getShellLayoutCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import refineDefaultPanels from './refineDefaultPanels.js';
import registerShellCommands from './registerShellCommands.js';
import registerShellKeymaps from './registerShellKeymaps.js';
import renderShellTopBar from './renderShellTopBar.js';
import wireToastNotifications from './wireToastNotifications.js';
import restoreCanvasAfterPageUndo from './restoreCanvasAfterPageUndo.js';

const applyEditorShell = (editor, pluginOptions) => {
  restoreCanvasAfterPageUndo(editor);
  const shellOptions = (pluginOptions && pluginOptions.shell) || {};
  const themeOptions = (pluginOptions && pluginOptions.theme) || {};
  const editorConfig = editor.getConfig && editor.getConfig();
  if (editorConfig) editorConfig.showDevices = false;
  registerShellCommands(editor);
  if (!editor.onReady) return;
  editor.onReady(() => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement || !containerElement.ownerDocument) return;
    injectEditorStylesOnce(editor, 'db-css-shell-layout', getShellLayoutCss());
    refineDefaultPanels(editor);
    renderShellTopBar(editor, shellOptions, themeOptions);
    registerShellKeymaps(editor);
    wireToastNotifications(editor);
  });
};

export default applyEditorShell;
