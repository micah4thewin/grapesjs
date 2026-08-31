import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildExportModalMarkup from './buildExportModalMarkup.js';
import getExporterEditorCss from './getExporterEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import wireExportModalEvents from './wireExportModalEvents.js';

const openExportModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectEditorStylesOnce(editor, 'db-css-exporter-editor', getExporterEditorCss());
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, buildExportModalMarkup(editor));
  if (!rootElement) return;
  wireExportModalEvents(editor, rootElement);
  openThemedModal(editor, 'Export site', rootElement, { className: 'gjs-db-export-modal' });
};

export default openExportModal;
