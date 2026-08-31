const getIconMarkupCache = (editor) => {
  const editorModel = editor.getModel();
  const existingCache = editorModel.get('dbIconMarkupCache');
  if (existingCache) return existingCache;
  const createdCache = new WeakMap();
  editorModel.set('dbIconMarkupCache', createdCache);
  return createdCache;
};

export default getIconMarkupCache;
