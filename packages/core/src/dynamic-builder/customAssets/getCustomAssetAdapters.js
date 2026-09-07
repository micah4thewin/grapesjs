import resolveCustomAssetAdapters from './resolveCustomAssetAdapters.js';

const getCustomAssetAdapters = (editor) => {
  const editorModel = editor && typeof editor.getModel === 'function' ? editor.getModel() : null;
  const storedAdapters = editorModel && editorModel.get('dbCustomAssetAdapters');
  if (storedAdapters) return storedAdapters;
  const createdAdapters = resolveCustomAssetAdapters({});
  if (editorModel) editorModel.set('dbCustomAssetAdapters', createdAdapters);
  return createdAdapters;
};

export default getCustomAssetAdapters;
