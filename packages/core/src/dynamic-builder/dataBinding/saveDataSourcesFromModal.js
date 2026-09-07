import collectDataSourcesFromState from './collectDataSourcesFromState.js';
import updateDataSourceRegistry from './updateDataSourceRegistry.js';
import showToastNotice from '../support/showToastNotice.js';

const saveDataSourcesFromModal = (editor, formElement, editorState) => {
  const collectedRecord = collectDataSourcesFromState(editorState, formElement);
  if (!collectedRecord) {
    showToastNotice(editor, 'Fix the highlighted JSON before saving.', { kind: 'error' });
    return false;
  }
  editorState.finished = true;
  if (editorState.previewTimer) clearTimeout(editorState.previewTimer);
  updateDataSourceRegistry(editor, collectedRecord);
  editor.Modal.close();
  showToastNotice(editor, 'Data sources saved. Repeaters and tokens updated.', { kind: 'success' });
  return true;
};

export default saveDataSourcesFromModal;
