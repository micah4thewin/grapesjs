import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import openThemedModal from '../support/openThemedModal.js';
import addTemplateAsNewPage from './addTemplateAsNewPage.js';
import applyTemplateToPage from './applyTemplateToPage.js';
import buildTemplateChooserMarkup from './buildTemplateChooserMarkup.js';
import buildTemplatePreviewDocument from './buildTemplatePreviewDocument.js';
import cloneBlockContent from './cloneBlockContent.js';
import fitTemplatePreviewScale from './fitTemplatePreviewScale.js';
import getBlockHintRecords from './getBlockHintRecords.js';
import listTemplateContentNames from './listTemplateContentNames.js';

const openTemplateChooserModal = (editor, blockModel) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const blockId = String(blockModel.get('id') || blockModel.id);
  const templateLabel = String(blockModel.get('label') || 'Page template');
  const contentRecords = cloneBlockContent(blockModel);
  const pageHasContent = editor.getWrapper().components().length > 0;
  const chooserMarkup = buildTemplateChooserMarkup(
    templateLabel,
    getBlockHintRecords()[blockId] || 'A complete page, ready to edit.',
    listTemplateContentNames(contentRecords),
    pageHasContent,
  );
  const chooserElement = buildElementFromMarkup(containerElement.ownerDocument, chooserMarkup);
  if (!chooserElement) return null;
  const previewFrame = chooserElement.querySelector('[data-db-template-preview]');
  previewFrame && (previewFrame.srcdoc = buildTemplatePreviewDocument(editor, contentRecords));
  const runTemplateAction = (actionName) => {
    editor.Modal.close();
    actionName === 'new-page'
      ? addTemplateAsNewPage(editor, blockModel)
      : applyTemplateToPage(editor, blockModel, actionName);
  };
  chooserElement.querySelectorAll('[data-db-template-action]').forEach((actionButton) => {
    actionButton.addEventListener('click', () =>
      runTemplateAction(actionButton.getAttribute('data-db-template-action')),
    );
  });
  openThemedModal(editor, templateLabel, chooserElement, { className: 'gjs-db-template-modal' });
  setTimeout(() => fitTemplatePreviewScale(chooserElement.querySelector('[data-db-template-preview-frame]')), 30);
  focusFirstModalControl(chooserElement);
  return chooserElement;
};

export default openTemplateChooserModal;
