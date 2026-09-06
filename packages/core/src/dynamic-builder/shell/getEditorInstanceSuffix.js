let instanceCounter = 0;

const getEditorInstanceSuffix = (editor) => {
  const editorModel = editor.getModel();
  const existingSuffix = editorModel.get('dbShellInstanceSuffix');
  if (existingSuffix) return existingSuffix;
  instanceCounter += 1;
  const nextSuffix = instanceCounter === 1 ? '' : '-' + instanceCounter;
  editorModel.set('dbShellInstanceSuffix', nextSuffix);
  return nextSuffix;
};

export default getEditorInstanceSuffix;
