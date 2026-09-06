const ensureAudioContext = (editor, options = {}) => {
  const editorModel = editor.getModel();
  const existingContext = editorModel.get('dbAudioContext');
  if (existingContext) {
    if (existingContext.state === 'suspended' && typeof existingContext.resume === 'function') {
      const resumeResult = existingContext.resume();
      if (resumeResult && typeof resumeResult.catch === 'function') resumeResult.catch(() => undefined);
    }
    return existingContext;
  }
  if (!options.allowCreate) return null;
  const audioWindow = typeof window === 'undefined' ? null : window;
  const AudioContextConstructor = audioWindow && (audioWindow.AudioContext || audioWindow.webkitAudioContext);
  if (!AudioContextConstructor) return null;
  const audioContext = new AudioContextConstructor();
  editorModel.set('dbAudioContext', audioContext);
  editor.on('destroy', () => {
    if (typeof audioContext.close === 'function') {
      const closeResult = audioContext.close();
      if (closeResult && typeof closeResult.catch === 'function') closeResult.catch(() => undefined);
    }
  });
  return audioContext;
};

export default ensureAudioContext;
