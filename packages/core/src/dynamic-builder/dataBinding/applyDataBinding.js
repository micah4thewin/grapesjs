import buildDataBindingBaseCss from './buildDataBindingBaseCss.js';
import buildDataBindingEditorOnlyCss from './buildDataBindingEditorOnlyCss.js';
import buildRepeaterItemTypeDefinition from './buildRepeaterItemTypeDefinition.js';
import buildRepeaterTypeDefinition from './buildRepeaterTypeDefinition.js';
import initializeDataSourceRegistry from './initializeDataSourceRegistry.js';
import openDataCheckModal from './openDataCheckModal.js';
import openDataSourcesModal from './openDataSourcesModal.js';
import registerInsertFieldRteAction from './registerInsertFieldRteAction.js';
import runInsertDataFieldCommand from './runInsertDataFieldCommand.js';
import watchBindingPreviews from './watchBindingPreviews.js';
import watchExportForDataIssues from './watchExportForDataIssues.js';
import watchRepeaterComponents from './watchRepeaterComponents.js';
import watchSiteMetaForDataSources from './watchSiteMetaForDataSources.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';

const applyDataBinding = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.dataBinding) || {};
  initializeDataSourceRegistry(editor, moduleOptions);
  watchSiteMetaForDataSources(editor);
  registerComponentTypeSet(editor, [buildRepeaterItemTypeDefinition(), buildRepeaterTypeDefinition()]);
  registerCanvasStyles(editor, 'db-css-databinding-base', buildDataBindingBaseCss());
  registerEditorOnlyCanvasStyles(editor, 'db-css-databinding-editor-only', buildDataBindingEditorOnlyCss());
  watchRepeaterComponents(editor);
  watchBindingPreviews(editor);
  registerInsertFieldRteAction(editor);
  watchExportForDataIssues(editor);
  registerCommandSet(editor, {
    'db:open-data-sources': { run: (editorInstance) => openDataSourcesModal(editorInstance) },
    'db:insert-data-field': { run: (editorInstance) => runInsertDataFieldCommand(editorInstance) },
    'db:check-data-bindings': { run: (editorInstance) => openDataCheckModal(editorInstance) },
  });
};

export default applyDataBinding;
