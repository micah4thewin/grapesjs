import renderAllRepeaterPreviews from './renderAllRepeaterPreviews.js';
import renderRepeaterPreview from './renderRepeaterPreview.js';

const scheduleRepeaterPreviewRender = (editor, repeaterComponent) => {
  const editorModel = editor.getModel();
  let timerMap = editorModel.get('dbRepeaterRenderTimers');
  if (!timerMap) {
    timerMap = new Map();
    editorModel.set('dbRepeaterRenderTimers', timerMap);
  }
  const timerKey = repeaterComponent ? repeaterComponent.cid : 'all';
  if (timerMap.has(timerKey)) clearTimeout(timerMap.get(timerKey));
  timerMap.set(
    timerKey,
    setTimeout(() => {
      timerMap.delete(timerKey);
      if (repeaterComponent) renderRepeaterPreview(editor, repeaterComponent);
      else renderAllRepeaterPreviews(editor);
    }, 150),
  );
};

export default scheduleRepeaterPreviewRender;
