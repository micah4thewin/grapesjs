const getHiddenToolbarStore = (editor) => {
  const editorModel = editor.getModel();
  const existingStore = editorModel.get('dbSymbolHiddenToolbars');
  if (existingStore) return existingStore;
  const hiddenStore = new WeakMap();
  editorModel.set('dbSymbolHiddenToolbars', hiddenStore);
  return hiddenStore;
};

export default getHiddenToolbarStore;
