import getTemplateManagerEditorCss from './getTemplateManagerEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import registerTemplateManagerCommands from './registerTemplateManagerCommands.js';

const applyTemplateManager = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.templateManager) || {};
  registerTemplateManagerCommands(editor, moduleOptions);
  const injectStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-template-manager', getTemplateManagerEditorCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(() => injectStyles());
};

export default applyTemplateManager;
