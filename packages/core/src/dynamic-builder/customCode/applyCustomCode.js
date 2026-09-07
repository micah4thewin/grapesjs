import buildCustomCodeSiteCss from './buildCustomCodeSiteCss.js';
import createCustomCssTypeDefinition from './createCustomCssTypeDefinition.js';
import createCustomHtmlTypeDefinition from './createCustomHtmlTypeDefinition.js';
import createCustomScriptTypeDefinition from './createCustomScriptTypeDefinition.js';
import getCustomCodeEditorCss from './getCustomCodeEditorCss.js';
import injectCanvasEditorOnlyStyles from './injectCanvasEditorOnlyStyles.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openCustomCodeModal from './openCustomCodeModal.js';
import openCustomHtmlEditor from './openCustomHtmlEditor.js';
import warnAboutBlockedScripts from './warnAboutBlockedScripts.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import seedCustomCodeSiteMeta from './seedCustomCodeSiteMeta.js';
import watchCustomCodeComponents from './watchCustomCodeComponents.js';
import wireCustomHtmlEditing from './wireCustomHtmlEditing.js';

const applyCustomCode = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.customCode) || {};
  registerComponentTypeSet(editor, [
    createCustomHtmlTypeDefinition(),
    createCustomCssTypeDefinition(),
    createCustomScriptTypeDefinition(),
  ]);
  registerCanvasStyles(editor, 'db-css-customcode-base', buildCustomCodeSiteCss());
  watchCustomCodeComponents(editor);
  wireCustomHtmlEditing(editor);
  seedCustomCodeSiteMeta(editor, moduleOptions);
  warnAboutBlockedScripts(editor);
  registerCommandSet(editor, {
    'db:open-custom-code': (commandEditor) => openCustomCodeModal(commandEditor, moduleOptions),
    'db:edit-custom-html': (commandEditor) => openCustomHtmlEditor(commandEditor, commandEditor.getSelected()),
  });
  const injectEditorSideStyles = () => {
    injectEditorStylesOnce(editor, 'db-css-customcode-editor', getCustomCodeEditorCss());
    injectCanvasEditorOnlyStyles(editor);
  };
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applyCustomCode;
