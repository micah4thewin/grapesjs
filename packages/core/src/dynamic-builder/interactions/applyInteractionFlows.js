import buildAlertButtonTypeDefinition from './buildAlertButtonTypeDefinition.js';
import buildDialogSiteCss from './buildDialogSiteCss.js';
import createFlowSummaryTraitDefinition from './createFlowSummaryTraitDefinition.js';
import getDialogRuntimeSource from './getDialogRuntimeSource.js';
import getFlowRuntimeSource from './getFlowRuntimeSource.js';
import getInteractionEditorCss from './getInteractionEditorCss.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import hasDialogActions from './hasDialogActions.js';
import hasInteractionFlows from './hasInteractionFlows.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isPlainRecord from '../support/isPlainRecord.js';
import openFlowBuilderModal from './openFlowBuilderModal.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import registerRuntimeScript from '../support/registerRuntimeScript.js';
import registerTraitTypeSet from '../support/registerTraitTypeSet.js';
import resolveInteractionSettings from './resolveInteractionSettings.js';
import watchAlertButtonComponents from './watchAlertButtonComponents.js';

const resolveAllowScripts = (editor) => {
  const customCodeRecord = getSiteMetaRecord(editor).customCode;
  return isPlainRecord(customCodeRecord) && customCodeRecord.allowScripts === true;
};

const applyInteractionFlows = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.interactions) || {};
  const dialogSettings = resolveInteractionSettings(moduleOptions);
  registerTraitTypeSet(editor, { 'db-flow-summary': createFlowSummaryTraitDefinition() });
  registerComponentTypeSet(editor, [buildAlertButtonTypeDefinition()]);
  registerCanvasStyles(editor, 'db-css-interactions-base', buildDialogSiteCss());
  watchAlertButtonComponents(editor);
  registerRuntimeScript(editor, 'db-dialog', {
    detect: (runtimeEditor, page) => hasDialogActions(runtimeEditor, page),
    source: () => getDialogRuntimeSource(dialogSettings),
  });
  registerRuntimeScript(editor, 'db-flows', {
    detect: (runtimeEditor, page) => hasInteractionFlows(runtimeEditor, page),
    source: () => getFlowRuntimeSource(resolveAllowScripts(editor)),
  });
  registerCommandSet(editor, {
    'db:open-flow-builder': (commandEditor) => openFlowBuilderModal(commandEditor),
  });
  const injectInteractionEditorStyles = () =>
    injectEditorStylesOnce(editor, 'db-css-interactions-editor', getInteractionEditorCss());
  injectInteractionEditorStyles();
  if (editor.onReady) editor.onReady(injectInteractionEditorStyles);
};

export default applyInteractionFlows;
