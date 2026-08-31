import computeMergedDataSources from './computeMergedDataSources.js';

const refreshDataSourceRegistry = (editor) => {
  const editorModel = editor.getModel();
  const moduleOptions = editorModel.get('dbDataBindingOptions') || {};
  const mergedSources = computeMergedDataSources(editor, moduleOptions);
  const currentSources = editorModel.get('dbDataSources') || null;
  if (JSON.stringify(mergedSources) !== JSON.stringify(currentSources)) {
    editorModel.set('dbDataSources', mergedSources);
    editor.trigger('db:data-sources:update', mergedSources);
  }
  return mergedSources;
};

export default refreshDataSourceRegistry;
