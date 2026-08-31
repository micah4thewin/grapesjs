import refreshDataSourceRegistry from './refreshDataSourceRegistry.js';

const initializeDataSourceRegistry = (editor, moduleOptions) => {
  editor.getModel().set('dbDataBindingOptions', moduleOptions || {});
  return refreshDataSourceRegistry(editor);
};

export default initializeDataSourceRegistry;
