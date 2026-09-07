import collectDataSourcesDraft from './collectDataSourcesDraft.js';
import setDataSourcesDraft from './setDataSourcesDraft.js';

const noteDataSourcesChange = (editor, editorState) => {
  editorState.dirty = true;
  if (editorState.previewTimer) clearTimeout(editorState.previewTimer);
  editorState.previewTimer = setTimeout(() => {
    editorState.previewTimer = null;
    if (!editorState.finished) setDataSourcesDraft(editor, collectDataSourcesDraft(editorState));
  }, 200);
};

export default noteDataSourcesChange;
