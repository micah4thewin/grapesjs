import composeWorkspaceCss from './composeWorkspaceCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isEditorLive from '../support/isEditorLive.js';
import mountWorkspaceShell from './mountWorkspaceShell.js';
import wireWorkspaceShell from './wireWorkspaceShell.js';

const applyWorkspaceLayout = (editor, pluginOptions) => {
  const workspaceOptions = (pluginOptions && pluginOptions.workspace) || {};
  if (workspaceOptions.enabled === false) return;
  if (!editor.onReady) return;
  editor.onReady(() => {
    if (!isEditorLive(editor)) return;
    injectEditorStylesOnce(editor, 'db-css-workspace-layout', composeWorkspaceCss());
    const workspaceElement = mountWorkspaceShell(editor);
    if (!workspaceElement) return;
    wireWorkspaceShell(editor, workspaceElement, pluginOptions || {}, workspaceOptions);
    setTimeout(() => isEditorLive(editor) && editor.refresh && editor.refresh(), 120);
  });
};

export default applyWorkspaceLayout;
