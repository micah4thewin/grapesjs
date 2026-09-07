import refreshCanvasBindingPreview from './refreshCanvasBindingPreview.js';

const scheduleBindingPreviewRefresh = (editor) => {
  const editorModel = editor.getModel();
  const pendingTimer = editorModel.get('dbBindingPreviewTimer');
  if (pendingTimer) clearTimeout(pendingTimer);
  editorModel.set(
    'dbBindingPreviewTimer',
    setTimeout(() => {
      editorModel.set('dbBindingPreviewTimer', null);
      refreshCanvasBindingPreview(editor);
    }, 120),
  );
};

export default scheduleBindingPreviewRefresh;
