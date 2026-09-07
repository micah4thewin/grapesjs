import buildCustomAssetsModalMarkup from './buildCustomAssetsModalMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import getCustomAssetsEditorCss from './getCustomAssetsEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import refreshCustomAssetsPanels from './refreshCustomAssetsPanels.js';
import wireCustomAssetsModalEvents from './wireCustomAssetsModalEvents.js';

const openCustomAssetsModal = (editor, activeTabId) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  injectEditorStylesOnce(editor, 'db-css-custom-assets', getCustomAssetsEditorCss());
  const modalElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildCustomAssetsModalMarkup(activeTabId),
  );
  if (!modalElement) return null;
  wireCustomAssetsModalEvents(editor, modalElement);
  openThemedModal(editor, 'Your fonts and icons', modalElement, { className: 'gjs-db-custom-assets-modal' });
  refreshCustomAssetsPanels(editor, modalElement);
  return modalElement;
};

export default openCustomAssetsModal;
