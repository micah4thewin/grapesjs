const getThemedModalSession = (editor) => {
  const editorModel = editor && editor.getModel && editor.getModel();
  const sessionRecord = editorModel && editorModel.get('dbThemedModalSession');
  return sessionRecord && typeof sessionRecord === 'object' ? sessionRecord : null;
};

export default getThemedModalSession;
