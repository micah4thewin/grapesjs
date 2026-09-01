const ensureAudioContext = (editor) => {
  const editorModel = editor.getModel();
  const existingContext = editorModel.get('dbAudioContext');
  if (existingContext) {
    existingContext.state === 'suspended' && existingContext.resume();
    return existingContext;
  }
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  const audioContext = new AudioContextConstructor();
  editorModel.set('dbAudioContext', audioContext);
  return audioContext;
};

export default ensureAudioContext;
