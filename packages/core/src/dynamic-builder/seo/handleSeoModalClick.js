import activateSeoModalTab from './activateSeoModalTab.js';
import activateSharePreviewPlatform from './activateSharePreviewPlatform.js';
import applySeoSuggestions from './applySeoSuggestions.js';
import pickSeoImageFromAssets from './pickSeoImageFromAssets.js';
import saveSeoModalValues from './saveSeoModalValues.js';

const handleSeoModalClick = (editor, rootElement, clickEvent, refreshLiveFeedback) => {
  const clickedElement = clickEvent.target;
  if (!clickedElement || !clickedElement.closest) return;
  const tabButton = clickedElement.closest('[data-db-seo-tab]');
  if (tabButton) {
    activateSeoModalTab(rootElement, tabButton.dataset.dbSeoTab);
    editor.getModel().set('dbSeoActiveTab', tabButton.dataset.dbSeoTab);
    return;
  }
  const pickButton = clickedElement.closest('[data-db-seo-pick-image]');
  if (pickButton) {
    pickSeoImageFromAssets(editor, rootElement, pickButton.dataset.dbSeoPickImage);
    return;
  }
  const platformButton = clickedElement.closest('[data-db-seo-platform]');
  if (platformButton) {
    activateSharePreviewPlatform(rootElement, platformButton.dataset.dbSeoPlatform);
    refreshLiveFeedback();
    return;
  }
  if (clickedElement.closest('[data-db-seo-suggest]')) {
    applySeoSuggestions(editor, rootElement);
    refreshLiveFeedback();
    return;
  }
  if (clickedElement.closest('[data-db-seo-cancel]')) {
    rootElement.dataset.dbSeoResolved = 'true';
    editor.Modal.close();
    return;
  }
  if (clickedElement.closest('[data-db-seo-save]')) saveSeoModalValues(editor, rootElement, refreshLiveFeedback);
};

export default handleSeoModalClick;
