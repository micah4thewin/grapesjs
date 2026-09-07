import attachDataSourcesModalHandlers from './attachDataSourcesModalHandlers.js';
import buildDataSourcesModalMarkup from './buildDataSourcesModalMarkup.js';
import createDataSourcesEditorState from './createDataSourcesEditorState.js';
import getDataSourcesEditorCss from './getDataSourcesEditorCss.js';
import watchDataSourcesModalClose from './watchDataSourcesModalClose.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';

const openDataSourcesModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  injectEditorStylesOnce(editor, 'db-css-databinding-editor', getDataSourcesEditorCss());
  const editorState = createDataSourcesEditorState(editor);
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, buildDataSourcesModalMarkup(editorState));
  if (!formElement) return null;
  attachDataSourcesModalHandlers(editor, formElement, editorState);
  openThemedModal(editor, 'Data sources', formElement, { className: 'gjs-db-data-sources-modal' });
  watchDataSourcesModalClose(editor, editorState);
  return editorState;
};

export default openDataSourcesModal;
