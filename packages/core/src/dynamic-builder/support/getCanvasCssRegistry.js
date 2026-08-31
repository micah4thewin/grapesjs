const getCanvasCssRegistry = (editor) => {
  const editorModel = editor.getModel();
  const existingRegistry = editorModel.get('dbCanvasCssRegistry');
  if (existingRegistry) return existingRegistry;
  const cssRegistry = new Map();
  editorModel.set('dbCanvasCssRegistry', cssRegistry);
  return cssRegistry;
};

export default getCanvasCssRegistry;
