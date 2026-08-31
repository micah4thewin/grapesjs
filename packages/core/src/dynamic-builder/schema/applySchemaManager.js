import getSchemaEditorCss from './getSchemaEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openSchemaManagerModal from './openSchemaManagerModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import seedSiteSchemaDefaults from './seedSiteSchemaDefaults.js';

const applySchemaManager = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.schema) || {};
  seedSiteSchemaDefaults(editor, moduleOptions);
  registerCommandSet(editor, {
    'db:open-schema-manager': (commandEditor) => openSchemaManagerModal(commandEditor),
  });
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-schema-editor', getSchemaEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applySchemaManager;
