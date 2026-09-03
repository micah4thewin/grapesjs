const getRuntimeScriptRegistry = (editor) => {
  const editorModel = editor.getModel();
  let runtimeRegistry = editorModel.get('dbRuntimeScripts');
  if (!runtimeRegistry) {
    runtimeRegistry = new Map();
    editorModel.set('dbRuntimeScripts', runtimeRegistry);
  }
  return runtimeRegistry;
};

export default getRuntimeScriptRegistry;
