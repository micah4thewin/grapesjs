import attachDataSourcesModalHandlers from './attachDataSourcesModalHandlers.js';
import buildDataSourcesModalMarkup from './buildDataSourcesModalMarkup.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import openThemedModal from '../support/openThemedModal.js';

const openDataSourcesModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const modalMarkup = buildDataSourcesModalMarkup(getDataSourceRegistry(editor));
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, modalMarkup);
  if (!formElement) return;
  attachDataSourcesModalHandlers(editor, formElement);
  openThemedModal(editor, 'Data sources', formElement, { className: 'gjs-db-data-sources-modal' });
};

export default openDataSourcesModal;
