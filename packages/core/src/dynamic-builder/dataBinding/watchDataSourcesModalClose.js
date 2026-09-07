import setDataSourcesDraft from './setDataSourcesDraft.js';
import showToastNotice from '../support/showToastNotice.js';

const watchDataSourcesModalClose = (editor, editorState) => {
  const handleClose = () => {
    editor.off('modal:close', handleClose);
    if (editorState.finished) return;
    editorState.finished = true;
    if (editorState.previewTimer) clearTimeout(editorState.previewTimer);
    setDataSourcesDraft(editor, null);
    if (editorState.dirty) {
      showToastNotice(editor, 'Changes to data sources were not saved.', { kind: 'warning', duration: 4500 });
    }
  };
  editor.on('modal:close', handleClose);
};

export default watchDataSourcesModalClose;
