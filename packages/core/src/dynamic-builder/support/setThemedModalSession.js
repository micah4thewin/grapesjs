const setThemedModalSession = (editor, sessionRecord) => {
  const editorModel = editor && editor.getModel && editor.getModel();
  if (!editorModel) return;
  editorModel.set('dbThemedModalSession', sessionRecord || null, { silent: true });
};

export default setThemedModalSession;
