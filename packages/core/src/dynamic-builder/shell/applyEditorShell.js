import getShellLayoutCss from './getShellLayoutCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import refineDefaultPanels from './refineDefaultPanels.js';
import registerShellCommands from './registerShellCommands.js';
import registerShellKeymaps from './registerShellKeymaps.js';
import renderShellTopBar from './renderShellTopBar.js';

const applyEditorShell = (editor, pluginOptions) => {
  const shellOptions = (pluginOptions && pluginOptions.shell) || {};
  registerShellCommands(editor);
  if (!editor.onReady) return;
  editor.onReady(() => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement || !containerElement.ownerDocument) return;
    injectEditorStylesOnce(editor, 'db-css-shell-layout', getShellLayoutCss());
    refineDefaultPanels(editor);
    renderShellTopBar(editor, shellOptions);
    registerShellKeymaps(editor);
  });
};

export default applyEditorShell;
