import buildDataBindingBaseCss from './buildDataBindingBaseCss.js';
import buildRepeaterItemTypeDefinition from './buildRepeaterItemTypeDefinition.js';
import buildRepeaterTypeDefinition from './buildRepeaterTypeDefinition.js';
import initializeDataSourceRegistry from './initializeDataSourceRegistry.js';
import openDataSourcesModal from './openDataSourcesModal.js';
import watchRepeaterComponents from './watchRepeaterComponents.js';
import watchSiteMetaForDataSources from './watchSiteMetaForDataSources.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';

const applyDataBinding = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.dataBinding) || {};
  initializeDataSourceRegistry(editor, moduleOptions);
  watchSiteMetaForDataSources(editor);
  registerComponentTypeSet(editor, [buildRepeaterItemTypeDefinition(), buildRepeaterTypeDefinition()]);
  registerCanvasStyles(editor, 'db-css-databinding-base', buildDataBindingBaseCss());
  watchRepeaterComponents(editor);
  registerCommandSet(editor, {
    'db:open-data-sources': { run: (editorInstance) => openDataSourcesModal(editorInstance) },
  });
};

export default applyDataBinding;
